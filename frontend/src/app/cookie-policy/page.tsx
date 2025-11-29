'use client';

import Navbar from '@/components/Navbar';
import { Cookie, Settings, Eye, Info } from 'lucide-react';
import Link from 'next/link';

export default function CookiePolicyPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-20">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-block p-4 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl mb-6">
                            <Cookie className="w-16 h-16 text-amber-400" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                            Cookie Policy
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Last updated: November 23, 2025
                        </p>
                    </div>

                    {/* Content */}
                    <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-white/10 rounded-3xl p-10 backdrop-blur-sm space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-3">
                                <Info className="w-6 h-6 text-amber-400" />
                                What Are Cookies?
                            </h2>
                            <p className="text-gray-300 leading-relaxed">
                                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">Types of Cookies We Use</h2>
                            <div className="space-y-6">
                                <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/20 rounded-2xl p-6">
                                    <h3 className="font-bold text-white mb-3 text-lg">Essential Cookies</h3>
                                    <p className="text-gray-300 leading-relaxed mb-3">
                                        These cookies are necessary for the website to function properly. They enable core functionality such as security, authentication, and session management.
                                    </p>
                                    <p className="text-sm text-gray-400">Examples: Session tokens, security cookies</p>
                                </div>

                                <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-2xl p-6">
                                    <h3 className="font-bold text-white mb-3 text-lg">Performance Cookies</h3>
                                    <p className="text-gray-300 leading-relaxed mb-3">
                                        These cookies help us understand how visitors interact with our website by collecting and reporting anonymized information.
                                    </p>
                                    <p className="text-sm text-gray-400">Examples: Google Analytics, page load times</p>
                                </div>

                                <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/20 rounded-2xl p-6">
                                    <h3 className="font-bold text-white mb-3 text-lg">Functional Cookies</h3>
                                    <p className="text-gray-300 leading-relaxed mb-3">
                                        These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.
                                    </p>
                                    <p className="text-sm text-gray-400">Examples: Language preference, theme selection</p>
                                </div>

                                <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-500/20 rounded-2xl p-6">
                                    <h3 className="font-bold text-white mb-3 text-lg">Targeting Cookies</h3>
                                    <p className="text-gray-300 leading-relaxed mb-3">
                                        These cookies may be set through our site by advertising partners to build a profile of your interests and show you relevant ads.
                                    </p>
                                    <p className="text-sm text-gray-400">Examples: Ad tracking, retargeting pixels</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">Cookie Duration</h2>
                            <div className="text-gray-300 space-y-3">
                                <div>
                                    <h3 className="font-semibold text-white mb-2">Session Cookies</h3>
                                    <p className="leading-relaxed">
                                        These are temporary cookies that expire when you close your browser.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-2">Persistent Cookies</h3>
                                    <p className="leading-relaxed">
                                        These cookies remain on your device for a set period or until you delete them. They help us remember you when you return to our site.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-3">
                                <Settings className="w-6 h-6 text-amber-400" />
                                Managing Cookies
                            </h2>
                            <div className="text-gray-300 space-y-4">
                                <p className="leading-relaxed">
                                    You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences through:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Our cookie consent banner when you first visit our site</li>
                                    <li>Your browser settings (most browsers allow you to refuse or delete cookies)</li>
                                    <li>Your account settings for functional cookies</li>
                                </ul>
                                <div className="bg-amber-900/20 border border-amber-500/20 rounded-xl p-6 mt-6">
                                    <p className="text-amber-200 leading-relaxed">
                                        <strong>Note:</strong> If you choose to reject essential cookies, some parts of our website may not function properly.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">How to Control Cookies in Your Browser</h2>
                            <div className="text-gray-300 space-y-3">
                                <p>Most browsers allow you to:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>See what cookies are stored and delete them individually</li>
                                    <li>Block third-party cookies</li>
                                    <li>Block cookies from specific sites</li>
                                    <li>Block all cookies</li>
                                    <li>Delete all cookies when you close your browser</li>
                                </ul>
                                <p className="mt-4">
                                    For instructions on managing cookies in specific browsers, visit:
                                </p>
                                <ul className="list-disc list-inside space-y-1 ml-4 text-purple-400">
                                    <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">Chrome</a></li>
                                    <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">Firefox</a></li>
                                    <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">Safari</a></li>
                                    <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">Edge</a></li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">Third-Party Cookies</h2>
                            <p className="text-gray-300 leading-relaxed">
                                We use services from trusted third parties that may also set cookies. These include analytics providers (Google Analytics), payment processors, and customer support tools. These third parties have their own privacy policies.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">Changes to This Policy</h2>
                            <p className="text-gray-300 leading-relaxed">
                                We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-white">Contact Us</h2>
                            <p className="text-gray-300 leading-relaxed">
                                If you have questions about our use of cookies, please contact us at:
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
