'use client';

import Navbar from '@/components/Navbar';
import { Users, Target, Lightbulb, Award, Heart, Zap, Shield } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-20">
                {/* Hero Section */}
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                        About DJ RAG
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        We're on a mission to transform how people interact with documents through the power of AI.
                    </p>
                </div>

                {/* Mission & Vision */}
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-20">
                    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
                            <Target className="w-6 h-6 text-purple-400" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4 text-white">Our Mission</h2>
                        <p className="text-gray-400 leading-relaxed">
                            To democratize access to information by making document analysis intelligent, intuitive, and accessible to everyone. We believe that knowledge should be easy to extract, understand, and act upon.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
                        <div className="w-12 h-12 rounded-2xl bg-pink-500/20 flex items-center justify-center mb-6">
                            <Lightbulb className="w-6 h-6 text-pink-400" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4 text-white">Our Vision</h2>
                        <p className="text-gray-400 leading-relaxed">
                            A world where every document becomes an interactive knowledge base, where insights are instantly accessible, and where AI empowers humans to make better, faster decisions.
                        </p>
                    </div>
                </div>

                {/* Story Section */}
                <div className="max-w-4xl mx-auto mb-20">
                    <h2 className="text-4xl font-bold mb-8 text-center text-white">Our Story</h2>
                    <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-white/10 rounded-3xl p-10 backdrop-blur-sm">
                        <p className="text-gray-300 leading-relaxed mb-6">
                            DJ RAG was born from a simple frustration: spending hours searching through hundreds of pages to find a single piece of information. Our founders, a team of AI researchers and software engineers, knew there had to be a better way.
                        </p>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            In 2024, we set out to build the most advanced, user-friendly document analysis platform. We combined cutting-edge retrieval-augmented generation (RAG) technology with natural language processing to create a system that doesn't just search—it understands.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            Today, DJ RAG serves thousands of professionals across research, legal, business intelligence, and education. We're just getting started on our journey to transform how the world works with documents.
                        </p>
                    </div>
                </div>

                {/* Values */}
                <div className="max-w-6xl mx-auto mb-20">
                    <h2 className="text-4xl font-bold mb-12 text-center text-white">Our Values</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Heart,
                                title: 'User First',
                                description: 'Every decision we make starts with understanding our users\' needs and delivering exceptional experiences.',
                                color: 'text-red-400'
                            },
                            {
                                icon: Zap,
                                title: 'Innovation',
                                description: 'We push boundaries and embrace new technologies to stay at the forefront of AI-powered document analysis.',
                                color: 'text-yellow-400'
                            },
                            {
                                icon: Shield,
                                title: 'Privacy & Security',
                                description: 'Your data is sacred. We build with privacy and security as foundational principles, not afterthoughts.',
                                color: 'text-blue-400'
                            },
                            {
                                icon: Users,
                                title: 'Collaboration',
                                description: 'We believe great things happen when diverse minds work together toward a common goal.',
                                color: 'text-green-400'
                            },
                            {
                                icon: Award,
                                title: 'Excellence',
                                description: 'We set high standards and continuously improve to deliver the best product possible.',
                                color: 'text-purple-400'
                            },
                            {
                                icon: Lightbulb,
                                title: 'Transparency',
                                description: 'We operate with honesty and openness, building trust through clear communication.',
                                color: 'text-cyan-400'
                            }
                        ].map((value, i) => (
                            <div key={i} className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-white/20 transition-all">
                                <value.icon className={`w-10 h-10 ${value.color} mb-4`} />
                                <h3 className="text-xl font-bold mb-3 text-white">{value.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-sm">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <div className="max-w-6xl mx-auto mb-20">
                    <h2 className="text-4xl font-bold mb-12 text-center text-white">Meet Our Team</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Dr. Sarah Johnson',
                                role: 'Co-Founder & CEO',
                                bio: 'Former AI researcher at Stanford. PhD in Machine Learning.',
                                image: '👩‍💼'
                            },
                            {
                                name: 'Michael Chen',
                                role: 'Co-Founder & CTO',
                                bio: 'Ex-Google engineer with 15 years in distributed systems.',
                                image: '👨‍💻'
                            },
                            {
                                name: 'Emily Rodriguez',
                                role: 'Head of Product',
                                bio: 'Previously led product teams at Microsoft and Dropbox.',
                                image: '👩‍🔬'
                            }
                        ].map((member, i) => (
                            <div key={i} className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-white/10 rounded-3xl p-8 backdrop-blur-sm text-center hover:border-purple-500/30 transition-all">
                                <div className="text-6xl mb-4">{member.image}</div>
                                <h3 className="text-xl font-bold mb-2 text-white">{member.name}</h3>
                                <p className="text-purple-400 text-sm mb-4">{member.role}</p>
                                <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-3xl p-12 border border-white/10 backdrop-blur-sm">
                        <h2 className="text-3xl font-bold mb-4 text-white">Join Us on Our Journey</h2>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            We're always looking for talented individuals who share our passion for AI and innovation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/careers" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-full transition-all shadow-lg shadow-purple-500/30">
                                View Open Positions
                            </Link>
                            <Link href="/" className="px-8 py-4 rounded-full font-semibold text-white border border-white/20 hover:bg-white/5 transition-all">
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
