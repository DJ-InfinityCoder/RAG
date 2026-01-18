import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-[#131314] text-[#e3e3e3] font-sans selection:bg-[#4285f4] selection:text-white">
            <nav className="sticky top-0 z-50 bg-[#131314]/80 backdrop-blur-md border-b border-[#444746]">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center">
                    <Link href="/" className="flex items-center gap-2 text-[#c4c7c5] hover:text-[#e3e3e3] transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Home</span>
                    </Link>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold mb-8 text-[#e3e3e3]">Privacy Policy</h1>
                <div className="prose prose-invert max-w-none text-[#c4c7c5]">
                    <p className="lead text-lg mb-8">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-[#e3e3e3] mb-4">1. Introduction</h2>
                        <p>
                            Welcome to DJ Rag ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our website and in using our products and services (collectively, "Services"). This Privacy Policy explains how we handle your information.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-[#e3e3e3] mb-4">2. Information We Collect</h2>
                        <p>
                            We collect information you provide directly to us when you use our Services, such as when you upload documents or send chat messages.
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li><strong>Uploaded Documents:</strong> Files you upload for RAG processing.</li>
                            <li><strong>Chat Data:</strong> Queries and interactions with the AI assistant.</li>
                            <li><strong>Usage Data:</strong> Information about how you interact with our Services.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-[#e3e3e3] mb-4">3. How We Use Your Information</h2>
                        <p>
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>Provide, maintain, and improve our Services.</li>
                            <li>Process your documents and generate AI responses.</li>
                            <li>Respond to your comments, questions, and requests.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-[#e3e3e3] mb-4">4. Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure, and we cannot guarantee the security of your data.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-[#e3e3e3] mb-4">5. Third-Party Services</h2>
                        <p>
                            Our Services rely on third-party providers for AI processing (e.g., Google Gemini) and data storage (e.g., Pinecone, Neon). Your data may be processed by these providers in accordance with their respective privacy policies.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-[#e3e3e3] mb-4">6. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:contact@dilip.live" className="text-[#a8c7fa] hover:underline">contact@dilip.live</a>.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}
