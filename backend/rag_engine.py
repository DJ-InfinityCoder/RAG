import os
from typing import List, TypedDict
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone
from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage
from langgraph.graph import StateGraph, START
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader, Docx2txtLoader
from langchain_core.embeddings import Embeddings
import tempfile
import pandas as pd


class PineconeInferenceEmbeddings(Embeddings):
    def __init__(self, api_key: str, model: str = "llama-text-embed-v2"):
        self.pc = Pinecone(api_key=api_key)
        self.model = model

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        try:
            batch_size = 90
            all_embeddings = []
            for i in range(0, len(texts), batch_size):
                batch = texts[i:i + batch_size]
                response = self.pc.inference.embed(
                    model=self.model,
                    inputs=batch,
                    parameters={"input_type": "passage", "truncate": "END"}
                )
                all_embeddings.extend([r['values'] for r in response])
            return all_embeddings
        except Exception as e:
            print(f"Error embedding documents: {e}")
            raise e

    def embed_query(self, text: str) -> List[float]:
        try:
            response = self.pc.inference.embed(
                model=self.model,
                inputs=[text],
                parameters={"input_type": "query", "truncate": "END"}
            )
            return response[0]['values']
        except Exception as e:
            print(f"Error embedding query: {e}")
            raise e

class State(TypedDict):
    question: str
    context: List[Document]
    answer: str
    session_id: str
    chat_history: List

class RAGEngine:
    def __init__(self):
        GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
        PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
        PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME", "djrag")

        # Use Pinecone Inference for embeddings (1024 dimensions)
        self.embeddings = PineconeInferenceEmbeddings(api_key=PINECONE_API_KEY, model="llama-text-embed-v2")
        
        # Use Gemini for Chat
        self.llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", google_api_key=GOOGLE_API_KEY)
        
        # Initialize Pinecone
        self.pc = Pinecone(api_key=PINECONE_API_KEY)
        
        # Connect to existing index
        self.index = self.pc.Index(PINECONE_INDEX_NAME)
        self.vectorstore = PineconeVectorStore(embedding=self.embeddings, index=self.index)
        
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", "Use the following context to answer the question:\n\n{context}"),
            MessagesPlaceholder(variable_name="chat_history"),
            ("user", "{question}"),
        ])
        
        self.graph = self._build_graph()

    def _build_graph(self):
        builder = StateGraph(State)
        builder.add_node("retrieve", self.retrieve)
        builder.add_node("generate", self.generate)
        builder.add_edge(START, "retrieve")
        builder.add_edge("retrieve", "generate")
        return builder.compile()

    def retrieve(self, state: State):
        # Extract session_id from state if available (need to pass it in state)
        # For now, we might need to modify State or pass it differently.
        # But wait, State is TypedDict. We can add session_id to it.
        question = state["question"]
        session_id = state.get("session_id")
        
        filter_dict = {}
        if session_id:
            filter_dict = {"session_id": session_id}
            
        docs = self.vectorstore.similarity_search(question, filter=filter_dict)
        return {"context": docs}

    def generate(self, state: State):
        content = "\n\n".join(doc.page_content for doc in state["context"])
        messages = self.prompt.invoke({
            "question": state["question"], 
            "context": content,
            "chat_history": state.get("chat_history", [])
        })
        response = self.llm.invoke(messages)
        return {"answer": response.content}

    def chat(self, question: str, session_id: str = None, chat_history: List = []):
        # Pass session_id and chat_history to the graph
        response = self.graph.invoke({
            "question": question, 
            "session_id": session_id,
            "chat_history": chat_history
        })
        return response["answer"]

    async def process_file(self, file_content: bytes, filename: str, session_id: str = None):
        # Create a temp file to save the uploaded content
        suffix = os.path.splitext(filename)[1]
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            tmp.write(file_content)
            tmp_path = tmp.name

        try:
            documents = []
            filename_lower = filename.lower()
            if filename_lower.endswith(".pdf"):
                loader = PyPDFLoader(tmp_path)
                documents = loader.load()
            elif filename_lower.endswith(".docx"):
                loader = Docx2txtLoader(tmp_path)
                documents = loader.load()
            elif filename_lower.endswith(".xlsx"):
                df = pd.read_excel(tmp_path)
                # Convert each row to a text document
                for _, row in df.iterrows():
                    content = "\n".join([f"{col}: {val}" for col, val in row.items() if pd.notna(val)])
                    documents.append(Document(page_content=content, metadata={"source": filename, "row": _}))
            elif filename_lower.endswith(".csv"):
                df = pd.read_csv(tmp_path)
                # Convert each row to a text document
                for _, row in df.iterrows():
                    content = "\n".join([f"{col}: {val}" for col, val in row.items() if pd.notna(val)])
                    documents.append(Document(page_content=content, metadata={"source": filename, "row": _}))
            
            if documents:
                splitter = RecursiveCharacterTextSplitter(chunk_size=2000, chunk_overlap=200)
                docs = splitter.split_documents(documents)
                
                # Add session_id to metadata
                if session_id:
                    for doc in docs:
                        doc.metadata["session_id"] = session_id
                        
                self.vectorstore.add_documents(documents=docs)
                return len(docs)
            return 0
        finally:
            os.remove(tmp_path)

    def delete_vectors(self, session_id: str):
        try:
            # Delete vectors by metadata filter
            self.index.delete(filter={"session_id": session_id})
            return True
        except Exception as e:
            print(f"Error deleting vectors: {e}")
            return False
