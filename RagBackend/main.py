import os
import uuid
import json
from typing import List
from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from langchain_core.messages import HumanMessage, AIMessage
from rag_engine import RAGEngine
from database import engine, Base, get_db
from models import ChatSession, ChatMessage

load_dotenv()

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="DJ RAG API")

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize RAGEngine lazily
_rag_engine = None

def get_rag_engine():
    global _rag_engine
    if _rag_engine is None:
        try:
            _rag_engine = RAGEngine()
        except Exception as e:
            print(f"Failed to initialize RAGEngine: {e}")
            raise HTTPException(status_code=500, detail=f"RAG Engine initialization failed: {str(e)}")
    return _rag_engine

class CreateSessionRequest(BaseModel):
    title: str = "New Chat"

class SessionResponse(BaseModel):
    id: str
    title: str
    file_name: str | None = None
    created_at: str

class MessageResponse(BaseModel):
    id: int
    role: str
    content: str
    sources: List[dict] | None = None
    created_at: str

class ChatRequest(BaseModel):
    question: str


@app.get("/")
async def root():
    return {"message": "DJ RAG Backend is running!"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.post("/sessions", response_model=SessionResponse)
async def create_session(request: CreateSessionRequest, db: Session = Depends(get_db)):
    session_id = str(uuid.uuid4())
    db_session = ChatSession(id=session_id, title=request.title)
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return SessionResponse(
        id=db_session.id,
        title=db_session.title,
        file_name=db_session.file_name,
        created_at=db_session.created_at.isoformat()
    )

@app.get("/sessions", response_model=List[SessionResponse])
async def list_sessions(db: Session = Depends(get_db)):
    sessions = db.query(ChatSession).order_by(ChatSession.created_at.desc()).all()
    return [
        SessionResponse(
            id=s.id,
            title=s.title,
            file_name=s.file_name,
            created_at=s.created_at.isoformat()
        ) for s in sessions
    ]

@app.get("/sessions/{session_id}/messages", response_model=List[MessageResponse])
async def get_messages(session_id: str, db: Session = Depends(get_db)):
    messages = db.query(ChatMessage).filter(ChatMessage.session_id == session_id).order_by(ChatMessage.created_at.asc()).all()
    return [
        MessageResponse(
            id=m.id,
            role=m.role,
            content=m.content,
            sources=json.loads(m.sources) if m.sources else None,
            created_at=m.created_at.isoformat()
        ) for m in messages
    ]

@app.post("/sessions/{session_id}/chat")
async def chat(session_id: str, request: ChatRequest, db: Session = Depends(get_db)):
    # Verify session exists
    session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    # Save user message
    user_msg = ChatMessage(session_id=session_id, role="user", content=request.question)
    db.add(user_msg)
    db.commit()

    # Fetch recent chat history (e.g., last 50 messages)
    recent_messages = db.query(ChatMessage).filter(ChatMessage.session_id == session_id).order_by(ChatMessage.created_at.desc()).limit(50).all()
    recent_messages.reverse() # Order by time ascending
    
    chat_history = []
    for msg in recent_messages:
        if msg.role == "user":
            chat_history.append(HumanMessage(content=msg.content))
        elif msg.role == "assistant":
            chat_history.append(AIMessage(content=msg.content))

    try:
        # Generate answer with session context and history
        rag = get_rag_engine()
        response = rag.chat(request.question, session_id, chat_history)
        answer = response["answer"]
        sources = response.get("sources", [])
        metrics = response.get("metrics", {})
        
        # Save assistant message
        bot_msg = ChatMessage(
            session_id=session_id, 
            role="assistant", 
            content=answer,
            sources=json.dumps(sources) if sources else None
        )
        
        db.add(bot_msg)
        db.commit()
        
        return {"answer": answer, "sources": sources, "metrics": metrics}
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

class IngestTextRequest(BaseModel):
    text: str
    title: str = "Pasted Text"

@app.post("/sessions/{session_id}/ingest_text")
async def ingest_text(session_id: str, request: IngestTextRequest, db: Session = Depends(get_db)):
    # Verify session exists
    session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
        
    try:
        rag = get_rag_engine()
        num_chunks = rag.ingest_text(request.text, request.title, session_id)
        
        # Update session title if it's "New Chat"
        if session.title == "New Chat":
            session.title = request.title
            db.commit()
            db.refresh(session)
            
        return {
            "message": f"Successfully ingested text: {request.title}",
            "chunks": num_chunks
        }
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/sessions/{session_id}/upload")
async def upload_document(session_id: str, file: UploadFile = File(...), db: Session = Depends(get_db)):
    # Verify session exists
    session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    if not file.filename.lower().endswith(('.pdf', '.docx', '.xlsx', '.csv', '.pptx', '.txt')):
        raise HTTPException(status_code=400, detail="Only PDF, DOCX, PPTX, Excel, CSV, and TXT files are supported")
    
    try:
        content = await file.read()
        # Pass session_id to process_file
        rag = get_rag_engine()
        num_chunks = await rag.process_file(content, file.filename, session_id)
        
        # Update session title and file_name
        session.title = file.filename
        session.file_name = file.filename
        db.commit()
        db.refresh(session)
        
        return {
            "message": f"Successfully processed {file.filename}", 
            "chunks": num_chunks,
            "title": session.title,
            "file_name": session.file_name
        }
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/sessions/{session_id}")
async def delete_session(session_id: str, db: Session = Depends(get_db)):
    # Verify session exists
    session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    try:
        # Delete from Pinecone
        rag = get_rag_engine()
        rag.delete_vectors(session_id)
        
        # Delete from Database (cascade will handle messages)
        db.delete(session)
        db.commit()
        
        return {"message": "Session deleted successfully"}
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/sessions")
async def delete_all_sessions(db: Session = Depends(get_db)):
    try:
        # Delete all from Pinecone
        # Note: Pinecone doesn't have a "delete all" filter easily without metadata, 
        # but we can iterate sessions or just delete the index content if we want a full wipe.
        # For now, let's iterate over all sessions in DB and delete their vectors.
        # A more efficient way for "Clear All" might be to delete by metadata if possible, 
        # or just accept that we clear the DB and vectors might be orphaned if not careful.
        # Better approach: Get all session IDs first.
        
        sessions = db.query(ChatSession).all()
        rag = get_rag_engine()
        
        for session in sessions:
            try:
                rag.delete_vectors(session.id)
            except Exception as e:
                print(f"Error deleting vectors for session {session.id}: {e}")

        # Delete all from Database
        db.query(ChatSession).delete()
        db.commit()
        
        return {"message": "All sessions deleted successfully"}
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))




if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

