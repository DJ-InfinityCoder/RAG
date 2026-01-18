import React from "react";
import Link from "next/link";
import { ArrowLeft, Server, Database, Code, Cloud, Terminal, Settings } from "lucide-react";

export default function Documentation() {
    return (
        <div className="min-h-screen bg-[#131314] text-[#e3e3e3] font-sans selection:bg-[#4285f4] selection:text-white">
            <nav className="sticky top-0 z-50 bg-[#131314]/80 backdrop-blur-md border-b border-[#444746]">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-[#c4c7c5] hover:text-[#e3e3e3] transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Home</span>
                    </Link>
                    <div className="font-semibold text-[#e3e3e3]">Documentation</div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Sidebar Navigation */}
                <aside className="hidden md:block col-span-1 sticky top-24 h-fit space-y-4">
                    <div className="font-semibold text-[#a8c7fa] mb-2">Contents</div>
                    <ul className="space-y-2 text-sm text-[#c4c7c5]">
                        <li><a href="#getting-started" className="hover:text-[#e3e3e3] transition-colors">Getting Started</a></li>
                        <li><a href="#architecture" className="hover:text-[#e3e3e3] transition-colors">Architecture</a></li>
                        <li><a href="#configuration" className="hover:text-[#e3e3e3] transition-colors">Configuration</a></li>
                        <li><a href="#deployment" className="hover:text-[#e3e3e3] transition-colors">Deployment</a></li>
                        <li><a href="#remarks" className="hover:text-[#e3e3e3] transition-colors">Remarks & Limits</a></li>
                    </ul>
                </aside>

                {/* Main Content */}
                <div className="col-span-1 md:col-span-3 space-y-16">

                    {/* Getting Started */}
                    <section id="getting-started" className="scroll-mt-24">
                        <h1 className="text-4xl font-bold mb-6 text-[#e3e3e3]">Getting Started</h1>
                        <p className="text-lg text-[#c4c7c5] mb-6">
                            DJ Rag is a powerful RAG (Retrieval-Augmented Generation) platform that allows you to chat with your documents.
                            It uses advanced vector search and LLMs to provide accurate, citation-backed answers.
                        </p>
                        <div className="bg-[#1e1f20] border border-[#444746] rounded-xl p-6">
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><Terminal className="w-5 h-5 text-[#a8c7fa]" /> Quick Start</h3>
                            <pre className="bg-[#131314] p-4 rounded-lg overflow-x-auto text-sm text-[#e3e3e3] font-mono">
                                {`# Clone the repository
git clone https://github.com/DJ-InfinityCoder/RAG.git

# Install Backend Dependencies
cd RagBackend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Install Frontend Dependencies
cd ../RagFrontend
npm install

# Run the Application
# Terminal 1: Backend
./run.sh
# Terminal 2: Frontend
npm run dev`}
                            </pre>
                        </div>
                    </section>

                    {/* Architecture */}
                    <section id="architecture" className="scroll-mt-24">
                        <h2 className="text-3xl font-bold mb-6 text-[#e3e3e3] flex items-center gap-3">
                            <Server className="w-8 h-8 text-[#d96570]" /> Architecture
                        </h2>
                        <p className="text-[#c4c7c5] mb-6">
                            The system is built on a modern stack designed for performance and scalability.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-[#1e1f20] p-6 rounded-xl border border-[#444746]">
                                <h3 className="font-semibold text-[#a8c7fa] mb-2">Frontend (Next.js 16)</h3>
                                <ul className="list-disc pl-5 text-[#c4c7c5] space-y-1">
                                    <li>App Router & Server Components</li>
                                    <li>Tailwind CSS for Styling</li>
                                    <li>SWR for Data Fetching & Caching</li>
                                    <li>Framer Motion for Animations</li>
                                </ul>
                            </div>
                            <div className="bg-[#1e1f20] p-6 rounded-xl border border-[#444746]">
                                <h3 className="font-semibold text-[#d96570] mb-2">Backend (FastAPI)</h3>
                                <ul className="list-disc pl-5 text-[#c4c7c5] space-y-1">
                                    <li>Async API Endpoints</li>
                                    <li>LangChain for RAG Pipeline</li>
                                    <li>Flashrank for Reranking</li>
                                    <li>LRU Caching for Performance</li>
                                </ul>
                            </div>
                            <div className="bg-[#1e1f20] p-6 rounded-xl border border-[#444746]">
                                <h3 className="font-semibold text-[#81c995] mb-2">Database & Vector Store</h3>
                                <ul className="list-disc pl-5 text-[#c4c7c5] space-y-1">
                                    <li>Pinecone for Vector Embeddings</li>
                                    <li>Neon (PostgreSQL) for Chat History</li>
                                    <li>Google Gemini Pro for Embeddings & Generation</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Configuration */}
                    <section id="configuration" className="scroll-mt-24">
                        <h2 className="text-3xl font-bold mb-6 text-[#e3e3e3] flex items-center gap-3">
                            <Settings className="w-8 h-8 text-[#fdd663]" /> Configuration
                        </h2>
                        <p className="text-[#c4c7c5] mb-6">
                            Configure the application using environment variables. Create a <code>.env</code> file in both backend and frontend directories.
                        </p>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-[#e3e3e3]">Backend (.env)</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-[#c4c7c5]">
                                        <thead className="bg-[#1e1f20] text-[#e3e3e3]">
                                            <tr>
                                                <th className="p-3 rounded-tl-lg">Variable</th>
                                                <th className="p-3 rounded-tr-lg">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#444746]">
                                            <tr><td className="p-3 font-mono">GOOGLE_API_KEY</td><td className="p-3">API Key for Gemini Pro & Embeddings</td></tr>
                                            <tr><td className="p-3 font-mono">PINECONE_API_KEY</td><td className="p-3">API Key for Pinecone Vector DB</td></tr>
                                            <tr><td className="p-3 font-mono">PINECONE_ENV</td><td className="p-3">Pinecone Environment Region</td></tr>
                                            <tr><td className="p-3 font-mono">DATABASE_URL</td><td className="p-3">PostgreSQL Connection String (Neon)</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-[#e3e3e3]">Frontend (.env.local)</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-[#c4c7c5]">
                                        <thead className="bg-[#1e1f20] text-[#e3e3e3]">
                                            <tr>
                                                <th className="p-3 rounded-tl-lg">Variable</th>
                                                <th className="p-3 rounded-tr-lg">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#444746]">
                                            <tr><td className="p-3 font-mono">NEXT_PUBLIC_API_BASE_URL</td><td className="p-3">URL of the deployed Backend API</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Deployment */}
                    <section id="deployment" className="scroll-mt-24">
                        <h2 className="text-3xl font-bold mb-6 text-[#e3e3e3] flex items-center gap-3">
                            <Cloud className="w-8 h-8 text-[#a8c7fa]" /> Deployment
                        </h2>
                        <div className="space-y-6 text-[#c4c7c5]">
                            <p>
                                You can deploy this project for free using popular hosting providers.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-[#1e1f20] p-6 rounded-xl border border-[#444746]">
                                    <h3 className="font-semibold text-[#e3e3e3] mb-2">Frontend (Vercel)</h3>
                                    <ol className="list-decimal pl-5 space-y-2">
                                        <li>Push your code to GitHub.</li>
                                        <li>Import the repo in Vercel.</li>
                                        <li>Set the Root Directory to <code>RagFrontend</code>.</li>
                                        <li>Add <code>NEXT_PUBLIC_API_BASE_URL</code> env var.</li>
                                        <li>Deploy!</li>
                                    </ol>
                                </div>
                                <div className="bg-[#1e1f20] p-6 rounded-xl border border-[#444746]">
                                    <h3 className="font-semibold text-[#e3e3e3] mb-2">Backend (Render)</h3>
                                    <ol className="list-decimal pl-5 space-y-2">
                                        <li>Create a new Web Service.</li>
                                        <li>Connect your GitHub repo.</li>
                                        <li>Set Root Directory to <code>RagBackend</code>.</li>
                                        <li>Set Build Command: <code>pip install -r requirements.txt</code>.</li>
                                        <li>Set Start Command: <code>uvicorn main:app --host 0.0.0.0 --port 8000</code>.</li>
                                        <li>Add all backend env vars.</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Remarks */}
                    <section id="remarks" className="scroll-mt-24">
                        <h2 className="text-3xl font-bold mb-6 text-[#e3e3e3]">Remarks & Limits</h2>
                        <div className="bg-[#1e1f20]/50 border border-[#d96570]/30 p-6 rounded-xl">
                            <ul className="list-disc pl-5 text-[#c4c7c5] space-y-2">
                                <li>
                                    <strong className="text-[#e3e3e3]">Provider Limits:</strong> Free tier accounts for Pinecone and Gemini have rate limits. If you encounter errors, wait a moment and try again.
                                </li>
                                <li>
                                    <strong className="text-[#e3e3e3]">Cold Starts:</strong> On free hosting like Render, the backend may spin down after inactivity. The first request might take 30-60 seconds to wake it up.
                                </li>
                                <li>
                                    <strong className="text-[#e3e3e3]">File Size:</strong> Currently optimized for documents under 10MB to ensure fast processing within serverless timeout limits.
                                </li>
                            </ul>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
}
