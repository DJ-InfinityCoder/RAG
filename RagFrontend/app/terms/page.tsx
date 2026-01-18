import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
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
                <h1 className="text-4xl font-bold mb-8 text-[#e3e3e3]">Terms of Service</h1>
                <div className="prose prose-invert max-w-none text-[#c4c7c5]">
                    <p className="lead text-lg mb-8">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-[#e3e3e3] mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using DJ Rag, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-[#e3e3e3] mb-4">2. Use License</h2>
                        <p>
                            Permission is granted to temporarily download one copy of the materials (information or software) on DJ Rag's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>Modify or copy the materials;</li>
                            <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                            <li>Attempt to decompile or reverse engineer any software contained on DJ Rag's website;</li>
                            <li>Remove any copyright or other proprietary notations from the materials; or</li>
                            <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-[#e3e3e3] mb-4">3. Disclaimer</h2>
                        <p>
                            The materials on DJ Rag's website are provided on an 'as is' basis. DJ Rag makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-[#e3e3e3] mb-4">4. Limitations</h2>
                        <p>
                            In no event shall DJ Rag or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on DJ Rag's website, even if DJ Rag or a DJ Rag authorized representative has been notified orally or in writing of the possibility of such damage.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-[#e3e3e3] mb-4">5. Accuracy of Materials</h2>
                        <p>
                            The materials appearing on DJ Rag's website could include technical, typographical, or photographic errors. DJ Rag does not warrant that any of the materials on its website are accurate, complete or current. DJ Rag may make changes to the materials contained on its website at any time without notice. However, DJ Rag does not make any commitment to update the materials.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-[#e3e3e3] mb-4">6. Governing Law</h2>
                        <p>
                            These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}
