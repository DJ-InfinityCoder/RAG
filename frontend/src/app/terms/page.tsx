'use client';

import Navbar from '@/components/Navbar';
import { FileText, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-20">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Terms of Service
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Last updated: November 23, 2025
                        </p>
                    </div>

                    {/* Quick Summary */}
                    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-2xl p-8 mb-12 backdrop-blur-sm">
                        <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                            <FileText className="w-6 h-6 text-purple-400" />
                            Quick Summary
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            By using DJ RAG, you agree to use our service responsibly, respect intellectual property rights, and comply with applicable laws. We provide the service "as is" and aren't liable for how you use it. You can cancel anytime.
                        </p>
                    </div>

                    {/* Content */}
                    <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-white/10 rounded-3xl p-10 backdrop-blur-sm space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">1. Acceptance of Terms</h2>
                            <p className="text-gray-300 leading-relaxed">
                                By accessing and using DJ RAG ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms of Service, please do not use the Service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">2. Description of Service</h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                DJ RAG provides an AI-powered document analysis platform that allows users to upload documents and interact with them through natural language queries. The Service uses retrieval-augmented generation (RAG) technology to provide contextual responses.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">3. User Accounts</h2>
                            <div className="text-gray-300 space-y-4">
                                <p>To use certain features of the Service, you must register for an account. You agree to:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Provide accurate, current, and complete information</li>
                                    <li>Maintain and update your information to keep it accurate</li>
                                    <li>Maintain the security of your password</li>
                                    <li>Accept responsibility for all activities under your account</li>
                                    <li>Notify us immediately of any unauthorized use</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">4. Acceptable Use</h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-white mb-2">You May:</h3>
                                        <ul className="text-gray-300 space-y-1 ml-4 list-disc list-inside">
                                            <li>Upload documents you own or have rights to use</li>
                                            <li>Use the Service for personal or commercial purposes</li>
                                            <li>Export your data at any time</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-white mb-2">You May Not:</h3>
                                        <ul className="text-gray-300 space-y-1 ml-4 list-disc list-inside">
                                            <li>Upload illegal, harmful, or infringing content</li>
                                            <li>Attempt to reverse engineer or hack the Service</li>
                                            <li>Use the Service to violate any laws or regulations</li>
                                            <li>Resell or redistribute the Service without permission</li>
                                            <li>Use automated systems to access the Service excessively</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">5. Intellectual Property</h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                The Service and its original content, features, and functionality are owned by DJ RAG and are protected by international copyright, trademark, and other intellectual property laws.
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                You retain all rights to the documents you upload. By uploading content, you grant us a license to process, store, and display it solely to provide the Service to you.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">6. Payment Terms</h2>
                            <div className="text-gray-300 space-y-4">
                                <p>For paid subscriptions:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Fees are billed in advance on a monthly or annual basis</li>
                                    <li>All fees are non-refundable except as required by law</li>
                                    <li>We may change pricing with 30 days notice</li>
                                    <li>You can cancel your subscription at any time</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-3">
                                <AlertTriangle className="w-6 h-6 text-yellow-400" />
                                7. Disclaimer of Warranties
                            </h2>
                            <p className="text-gray-300 leading-relaxed">
                                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">8. Limitation of Liability</h2>
                            <p className="text-gray-300 leading-relaxed">
                                TO THE MAXIMUM EXTENT PERMITTED BY LAW, DJ RAG SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">9. Termination</h2>
                            <p className="text-gray-300 leading-relaxed">
                                We may terminate or suspend your account and access to the Service immediately, without prior notice, for any reason, including breach of these Terms. Upon termination, your right to use the Service will immediately cease.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">10. Changes to Terms</h2>
                            <p className="text-gray-300 leading-relaxed">
                                We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the Service. Your continued use after changes constitutes acceptance of the new terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">11. Governing Law</h2>
                            <p className="text-gray-300 leading-relaxed">
                                These Terms shall be governed by the laws of the State of California, United States, without regard to its conflict of law provisions.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">12. Contact Information</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Questions about the Terms of Service should be sent to:
                                <br />
                                <a href="mailto:legal@djrag.com" className="text-purple-400 hover:text-purple-300">legal@djrag.com</a>
                            </p>
                        </section>
                    </div>

                    {/* Footer CTA */}
                    <div className="mt-12 text-center">
                        <Link href="/" className="inline-block px-8 py-4 rounded-full font-semibold text-white border border-white/20 hover:bg-white/5 transition-all">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
