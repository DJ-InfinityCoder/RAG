'use client';

import Navbar from '@/components/Navbar';
import { Shield, Lock, Eye, Database, UserCheck, FileText } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-20">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Privacy Policy
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Last updated: November 23, 2025
                        </p>
                    </div>

                    {/* Key Points */}
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        {[
                            { icon: Lock, title: 'Your Data is Secure', text: 'End-to-end encryption' },
                            { icon: Eye, title: 'Full Transparency', text: 'Clear data usage policies' },
                            { icon: UserCheck, title: 'Your Control', text: 'Manage your data anytime' }
                        ].map((item, i) => (
                            <div key={i} className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-white/10 rounded-2xl p-6 backdrop-blur-sm text-center">
                                <item.icon className="w-10 h-10 text-purple-400 mx-auto mb-4" />
                                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-400">{item.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-white/10 rounded-3xl p-10 backdrop-blur-sm space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-3">
                                <FileText className="w-6 h-6 text-purple-400" />
                                Introduction
                            </h2>
                            <p className="text-gray-300 leading-relaxed">
                                At DJ RAG, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our document analysis service. Please read this privacy policy carefully.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-3">
                                <Database className="w-6 h-6 text-purple-400" />
                                Information We Collect
                            </h2>
                            <div className="space-y-4 text-gray-300">
                                <div>
                                    <h3 className="font-semibold text-white mb-2">Personal Information</h3>
                                    <p className="leading-relaxed">
                                        We may collect personal information that you voluntarily provide to us when you register for an account, such as your name, email address, and payment information.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-2">Document Data</h3>
                                    <p className="leading-relaxed">
                                        When you upload documents to our service, we process and store them to provide you with our RAG capabilities. Your documents are encrypted and stored securely.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-2">Usage Data</h3>
                                    <p className="leading-relaxed">
                                        We automatically collect certain information about your device and how you interact with our service, including IP address, browser type, pages visited, and time spent on pages.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-3">
                                <Shield className="w-6 h-6 text-purple-400" />
                                How We Use Your Information
                            </h2>
                            <div className="text-gray-300 space-y-2">
                                <p>We use the information we collect to:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Provide, maintain, and improve our services</li>
                                    <li>Process your documents and generate AI responses</li>
                                    <li>Send you technical notices and support messages</li>
                                    <li>Respond to your comments and questions</li>
                                    <li>Monitor and analyze usage patterns and trends</li>
                                    <li>Detect, prevent, and address technical issues and fraud</li>
                                    <li>Comply with legal obligations</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-3">
                                <Lock className="w-6 h-6 text-purple-400" />
                                Data Security
                            </h2>
                            <p className="text-gray-300 leading-relaxed">
                                We implement appropriate technical and organizational security measures to protect your personal information. This includes encryption of data in transit and at rest, regular security assessments, and strict access controls. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">Data Retention</h2>
                            <p className="text-gray-300 leading-relaxed">
                                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. You can request deletion of your data at any time through your account settings.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">Your Rights</h2>
                            <div className="text-gray-300 space-y-2">
                                <p>You have the right to:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Access your personal information</li>
                                    <li>Correct inaccurate or incomplete data</li>
                                    <li>Request deletion of your data</li>
                                    <li>Object to processing of your data</li>
                                    <li>Export your data in a portable format</li>
                                    <li>Withdraw consent at any time</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">Third-Party Services</h2>
                            <p className="text-gray-300 leading-relaxed">
                                We may use third-party service providers to help us operate our service. These providers have access to your information only to perform specific tasks on our behalf and are obligated to maintain confidentiality.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">Children's Privacy</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">Changes to This Policy</h2>
                            <p className="text-gray-300 leading-relaxed">
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">Contact Us</h2>
                            <p className="text-gray-300 leading-relaxed">
                                If you have questions about this Privacy Policy, please contact us at:
                                <br />
                                <a href="mailto:privacy@djrag.com" className="text-purple-400 hover:text-purple-300">privacy@djrag.com</a>
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
