import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function EvaluationPage() {
    return (
        <div className="min-h-screen bg-[#131314] text-[#e3e3e3] font-sans selection:bg-[#4285f4] selection:text-white">
            <nav className="sticky top-0 z-50 bg-[#131314]/80 backdrop-blur-md border-b border-[#444746]">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-[#c4c7c5] hover:text-[#e3e3e3] transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Home</span>
                    </Link>
                    <div className="font-semibold text-[#e3e3e3]">Evaluation Report</div>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">

                {/* Header */}
                <section>
                    <h1 className="text-4xl font-bold mb-4 text-[#e3e3e3]">RAG System Evaluation</h1>
                    <p className="text-lg text-[#c4c7c5]">
                        This report details the methodology and results of evaluating the DJ Rag system against acceptance criteria.
                    </p>
                </section>

                {/* Methodology */}
                <section className="bg-[#1e1f20] p-8 rounded-2xl border border-[#444746]">
                    <h2 className="text-2xl font-bold mb-4 text-[#e3e3e3]">Methodology</h2>
                    <p className="text-[#c4c7c5] mb-4">
                        We evaluated the system using a "Gold Set" of 5 diverse queries designed to test different capabilities:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <div className="p-2 bg-[#4285f4]/10 rounded-lg text-[#4285f4]"><CheckCircle className="w-5 h-5" /></div>
                            <div>
                                <strong className="block text-[#e3e3e3]">Fact Retrieval</strong>
                                <span className="text-sm text-[#c4c7c5]">Extracting specific facts from documents.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="p-2 bg-[#9b72cb]/10 rounded-lg text-[#9b72cb]"><CheckCircle className="w-5 h-5" /></div>
                            <div>
                                <strong className="block text-[#e3e3e3]">Summarization</strong>
                                <span className="text-sm text-[#c4c7c5]">Synthesizing information across sections.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="p-2 bg-[#d96570]/10 rounded-lg text-[#d96570]"><CheckCircle className="w-5 h-5" /></div>
                            <div>
                                <strong className="block text-[#e3e3e3]">Context Awareness</strong>
                                <span className="text-sm text-[#c4c7c5]">Understanding implied context.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="p-2 bg-[#81c995]/10 rounded-lg text-[#81c995]"><CheckCircle className="w-5 h-5" /></div>
                            <div>
                                <strong className="block text-[#e3e3e3]">Citation Accuracy</strong>
                                <span className="text-sm text-[#c4c7c5]">Verifying source mapping.</span>
                            </div>
                        </li>
                    </ul>
                </section>

                {/* Metrics */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 text-[#e3e3e3]">Metrics Definition</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { title: "Precision", desc: "Relevance of retrieved chunks." },
                            { title: "Recall", desc: "Completeness of the answer." },
                            { title: "Citation Quality", desc: "Accuracy of source links." },
                            { title: "Success Rate", desc: "% of queries passing all checks." },
                        ].map((metric, idx) => (
                            <div key={idx} className="bg-[#1e1f20] p-6 rounded-xl border border-[#444746]">
                                <h3 className="font-semibold text-[#a8c7fa] mb-2">{metric.title}</h3>
                                <p className="text-sm text-[#c4c7c5]">{metric.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Gold Set Table */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 text-[#e3e3e3]">Gold Set Evaluation</h2>
                    <div className="overflow-x-auto rounded-xl border border-[#444746]">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#1e1f20] text-[#e3e3e3]">
                                <tr>
                                    <th className="p-4 font-semibold">ID</th>
                                    <th className="p-4 font-semibold">Query</th>
                                    <th className="p-4 font-semibold">Expected Key Info</th>
                                    <th className="p-4 font-semibold">Actual Result</th>
                                    <th className="p-4 font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#444746] bg-[#131314]">
                                {/* Example Row 1 */}
                                <tr className="hover:bg-[#1e1f20]/50 transition-colors">
                                    <td className="p-4 text-[#c4c7c5]">1</td>
                                    <td className="p-4 text-[#e3e3e3] font-medium">"What are the exam rules?"</td>
                                    <td className="p-4 text-[#c4c7c5]">Mandatory feedback, 75% attendance.</td>
                                    <td className="p-4 text-[#c4c7c5]">Pending Auto-Eval</td>
                                    <td className="p-4"><span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#333537] text-[#c4c7c5] text-xs">Pending</span></td>
                                </tr>
                                {/* Example Row 2 */}
                                <tr className="hover:bg-[#1e1f20]/50 transition-colors">
                                    <td className="p-4 text-[#c4c7c5]">2</td>
                                    <td className="p-4 text-[#e3e3e3] font-medium">"Explain the architecture."</td>
                                    <td className="p-4 text-[#c4c7c5]">Next.js, FastAPI, Pinecone.</td>
                                    <td className="p-4 text-[#c4c7c5]">Pending Auto-Eval</td>
                                    <td className="p-4"><span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#333537] text-[#c4c7c5] text-xs">Pending</span></td>
                                </tr>
                                {/* Example Row 3 */}
                                <tr className="hover:bg-[#1e1f20]/50 transition-colors">
                                    <td className="p-4 text-[#c4c7c5]">3</td>
                                    <td className="p-4 text-[#e3e3e3] font-medium">"How to deploy?"</td>
                                    <td className="p-4 text-[#c4c7c5]">Vercel, Render/Railway.</td>
                                    <td className="p-4 text-[#c4c7c5]">Pending Auto-Eval</td>
                                    <td className="p-4"><span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#333537] text-[#c4c7c5] text-xs">Pending</span></td>
                                </tr>
                                {/* Example Row 4 */}
                                <tr className="hover:bg-[#1e1f20]/50 transition-colors">
                                    <td className="p-4 text-[#c4c7c5]">4</td>
                                    <td className="p-4 text-[#e3e3e3] font-medium">"Summarize the document."</td>
                                    <td className="p-4 text-[#c4c7c5]">Key points summary.</td>
                                    <td className="p-4 text-[#c4c7c5]">Pending Auto-Eval</td>
                                    <td className="p-4"><span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#333537] text-[#c4c7c5] text-xs">Pending</span></td>
                                </tr>
                                {/* Example Row 5 */}
                                <tr className="hover:bg-[#1e1f20]/50 transition-colors">
                                    <td className="p-4 text-[#c4c7c5]">5</td>
                                    <td className="p-4 text-[#e3e3e3] font-medium">"What are the limitations?"</td>
                                    <td className="p-4 text-[#c4c7c5]">Rate limits, file size.</td>
                                    <td className="p-4 text-[#c4c7c5]">Pending Auto-Eval</td>
                                    <td className="p-4"><span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#333537] text-[#c4c7c5] text-xs">Pending</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Notes */}
                <section className="bg-[#1e1f20]/50 border border-[#fdd663]/30 p-6 rounded-xl flex gap-4">
                    <AlertCircle className="w-6 h-6 text-[#fdd663] shrink-0" />
                    <div>
                        <h3 className="font-semibold text-[#e3e3e3] mb-1">Evaluation Note</h3>
                        <p className="text-[#c4c7c5] text-sm">
                            The "Actual Result" column is populated automatically when you upload a document in the chat interface.
                            The system generates 5 Q/A pairs to demonstrate its understanding of the specific content you uploaded.
                        </p>
                    </div>
                </section>

            </main>
        </div>
    );
}
