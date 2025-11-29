'use client';

import Navbar from '@/components/Navbar';
import { Shield, Lock, Key, AlertTriangle, CheckCircle, FileCheck, Eye, Server } from 'lucide-react';
import Link from 'next/link';

export default function SecurityPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-20">
                <div className="max-w-6xl mx-auto">
                    {/* Hero */}
                    <div className="text-center mb-20">
                        <div className="inline-block p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl mb-6">
                            <Shield className="w-16 h-16 text-blue-400" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            Security at DJ RAG
                        </h1>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            Your data security is our top priority. We implement industry-leading security measures to protect your documents and information.
                        </p>
                    </div>

                    {/* Security Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                        {[
                            { icon: Lock, title: 'End-to-End Encryption', text: 'AES-256 encryption' },
                            { icon: Key, title: 'Secure Authentication', text: 'Multi-factor auth available' },
                            { icon: Server, title: 'SOC 2 Compliant', text: 'Certified infrastructure' },
                            { icon: Eye, title: 'Regular Audits', text: 'Third-party security reviews' }
                        ].map((item, i) => (
                            <div key={i} className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-sm text-center hover:border-blue-500/40 transition-all">
                                <item.icon className="w-10 h-10 text-blue-400 mx-auto mb-4" />
                                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-400">{item.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="space-y-12">
                        {/* Data Encryption */}
                        <section className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-white/10 rounded-3xl p-10 backdrop-blur-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center">
                                    <Lock className="w-6 h-6 text-purple-400" />
                                </div>
                                <h2 className="text-3xl font-bold text-white">Data Encryption</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6 text-gray-300">
                                <div>
                                    <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-400" />
                                        In Transit
                                    </h3>
                                    <p className="leading-relaxed">
                                        All data transmitted between your device and our servers is encrypted using TLS 1.3, the latest and most secure protocol. This ensures that your documents and queries cannot be intercepted.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-400" />
                                        At Rest
                                    </h3>
                                    <p className="leading-relaxed">
                                        Your documents are encrypted using AES-256 encryption before being stored. Each file is encrypted with a unique key, adding an extra layer of security.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Infrastructure Security */}
                        <section className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-white/10 rounded-3xl p-10 backdrop-blur-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                                    <Server className="w-6 h-6 text-blue-400" />
                                </div>
                                <h2 className="text-3xl font-bold text-white">Infrastructure Security</h2>
                            </div>
                            <div className="text-gray-300 space-y-4">
                                <p className="leading-relaxed">
                                    Our infrastructure is built on industry-leading cloud platforms with multiple layers of security:
                                </p>
                                <ul className="grid md:grid-cols-2 gap-3">
                                    {[
                                        'Isolated network architecture',
                                        'DDoS protection',
                                        'Automated security patches',
                                        'Intrusion detection systems',
                                        'Regular vulnerability scanning',
                                        'Database encryption',
                                        'Secure backup systems',
                                        '99.9% uptime SLA'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* Access Control */}
                        <section className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-white/10 rounded-3xl p-10 backdrop-blur-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center">
                                    <Key className="w-6 h-6 text-green-400" />
                                </div>
                                <h2 className="text-3xl font-bold text-white">Access Control</h2>
                            </div>
                            <div className="text-gray-300 space-y-4">
                                <p className="leading-relaxed">
                                    We implement strict access controls to ensure only authorized personnel can access systems:
                                </p>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/20 rounded-xl p-6">
                                        <h3 className="font-semibold text-white mb-3">User Authentication</h3>
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-400" />
                                                Multi-factor authentication (MFA)
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-400" />
                                                SSO integration
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-400" />
                                                Session management
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/20 rounded-xl p-6">
                                        <h3 className="font-semibold text-white mb-3">Internal Access</h3>
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-400" />
                                                Principle of least privilege
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-400" />
                                                Regular access reviews
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-400" />
                                                Comprehensive audit logs
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Compliance */}
                        <section className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-white/10 rounded-3xl p-10 backdrop-blur-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                                    <FileCheck className="w-6 h-6 text-cyan-400" />
                                </div>
                                <h2 className="text-3xl font-bold text-white">Compliance & Certifications</h2>
                            </div>
                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    { name: 'SOC 2 Type II', status: 'Certified' },
                                    { name: 'GDPR', status: 'Compliant' },
                                    { name: 'CCPA', status: 'Compliant' },
                                    { name: 'ISO 27001', status: 'In Progress' },
                                    { name: 'HIPAA', status: 'Available' },
                                    { name: 'PCI DSS', status: 'Compliant' }
                                ].map((cert, i) => (
                                    <div key={i} className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-xl p-6 text-center">
                                        <h3 className="font-bold text-white mb-2">{cert.name}</h3>
                                        <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                                            {cert.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Incident Response */}
                        <section className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-white/10 rounded-3xl p-10 backdrop-blur-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center">
                                    <AlertTriangle className="w-6 h-6 text-orange-400" />
                                </div>
                                <h2 className="text-3xl font-bold text-white">Incident Response</h2>
                            </div>
                            <div className="text-gray-300 space-y-4">
                                <p className="leading-relaxed">
                                    We maintain a comprehensive incident response plan to quickly address any security concerns:
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="font-bold text-orange-400">1</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white mb-1">24/7 Monitoring</h3>
                                            <p className="text-sm">Continuous monitoring of systems and alerts</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="font-bold text-orange-400">2</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white mb-1">Rapid Response</h3>
                                            <p className="text-sm">Dedicated security team ready to act</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="font-bold text-orange-400">3</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white mb-1">User Notification</h3>
                                            <p className="text-sm">Prompt communication if incidents affect you</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="font-bold text-orange-400">4</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white mb-1">Post-Incident Review</h3>
                                            <p className="text-sm">Thorough analysis and preventive measures</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Report Vulnerability */}
                        <section className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-3xl p-10 backdrop-blur-sm">
                            <h2 className="text-3xl font-bold mb-4 text-white">Report a Security Vulnerability</h2>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                We appreciate the security research community's efforts to keep DJ RAG secure. If you discover a security vulnerability, please report it responsibly to:
                            </p>
                            <a href="mailto:security@djrag.com" className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-full transition-all shadow-lg shadow-purple-500/30">
                                security@djrag.com
                            </a>
                            <p className="text-gray-400 text-sm mt-4">
                                We'll acknowledge your report within 24 hours and keep you updated on our progress.
                            </p>
                        </section>
                    </div>

                    {/* Footer CTA */}
                    <div className="mt-16 text-center">
                        <Link href="/" className="inline-block px-8 py-4 rounded-full font-semibold text-white border border-white/20 hover:bg-white/5 transition-all">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
