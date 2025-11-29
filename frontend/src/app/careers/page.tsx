'use client';

import Navbar from '@/components/Navbar';
import { Briefcase, MapPin, Clock, DollarSign, Heart, Coffee, Zap, Users, TrendingUp, Globe } from 'lucide-react';
import Link from 'next/link';

export default function CareersPage() {
    const jobs = [
        {
            title: 'Senior Machine Learning Engineer',
            department: 'Engineering',
            location: 'Remote / San Francisco',
            type: 'Full-time',
            salary: '$150k - $200k'
        },
        {
            title: 'Product Designer',
            department: 'Design',
            location: 'Remote',
            type: 'Full-time',
            salary: '$120k - $160k'
        },
        {
            title: 'Developer Advocate',
            department: 'Marketing',
            location: 'Remote / New York',
            type: 'Full-time',
            salary: '$100k - $140k'
        },
        {
            title: 'Customer Success Manager',
            department: 'Customer Success',
            location: 'Remote',
            type: 'Full-time',
            salary: '$90k - $120k'
        }
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-20">
                {/* Hero */}
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                        Join Our Team
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        Help us build the future of document intelligence. We're looking for passionate, talented people who want to make an impact.
                    </p>
                </div>

                {/* Benefits */}
                <div className="max-w-6xl mx-auto mb-20">
                    <h2 className="text-4xl font-bold mb-12 text-center text-white">Why Work With Us?</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Heart,
                                title: 'Health & Wellness',
                                description: 'Comprehensive health, dental, and vision insurance for you and your family.',
                                color: 'from-red-500/20 to-pink-500/20'
                            },
                            {
                                icon: Coffee,
                                title: 'Flexible Work',
                                description: 'Work from anywhere with flexible hours. We trust you to do your best work.',
                                color: 'from-amber-500/20 to-orange-500/20'
                            },
                            {
                                icon: DollarSign,
                                title: 'Competitive Pay',
                                description: 'Top-tier compensation with equity options and performance bonuses.',
                                color: 'from-green-500/20 to-emerald-500/20'
                            },
                            {
                                icon: TrendingUp,
                                title: 'Career Growth',
                                description: 'Clear career paths, mentorship programs, and learning opportunities.',
                                color: 'from-blue-500/20 to-cyan-500/20'
                            },
                            {
                                icon: Users,
                                title: 'Great Team',
                                description: 'Work with talented, passionate people who care about what they build.',
                                color: 'from-purple-500/20 to-violet-500/20'
                            },
                            {
                                icon: Globe,
                                title: 'Impact',
                                description: 'Your work will directly impact thousands of users around the world.',
                                color: 'from-pink-500/20 to-rose-500/20'
                            }
                        ].map((benefit, i) => (
                            <div key={i} className={`bg-gradient-to-br ${benefit.color} border border-white/10 rounded-2xl p-6 backdrop-blur-sm`}>
                                <benefit.icon className="w-10 h-10 text-white/80 mb-4" />
                                <h3 className="text-xl font-bold mb-3 text-white">{benefit.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-sm">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Perks */}
                <div className="max-w-6xl mx-auto mb-20">
                    <h2 className="text-3xl font-bold mb-8 text-center text-white">Additional Perks</h2>
                    <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-white/10 rounded-3xl p-10 backdrop-blur-sm">
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                '🏖️ Unlimited PTO',
                                '💻 Latest tech equipment',
                                '📚 Learning & development budget',
                                '🎉 Team events & offsites',
                                '🍕 Lunch stipend',
                                '🏋️ Gym membership',
                                '👶 Parental leave',
                                '🌍 Annual retreat'
                            ].map((perk, i) => (
                                <div key={i} className="flex items-center gap-3 text-gray-300">
                                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                    {perk}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Open Positions */}
                <div className="max-w-6xl mx-auto mb-20">
                    <h2 className="text-4xl font-bold mb-12 text-center text-white">Open Positions</h2>
                    <div className="space-y-6">
                        {jobs.map((job, i) => (
                            <div key={i} className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:border-purple-500/30 transition-all group">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">{job.title}</h3>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                            <span className="flex items-center gap-2">
                                                <Briefcase className="w-4 h-4" />
                                                {job.department}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                {job.location}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                {job.type}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <DollarSign className="w-4 h-4" />
                                                {job.salary}
                                            </span>
                                        </div>
                                    </div>
                                    <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-full transition-all shadow-lg shadow-purple-500/30 whitespace-nowrap">
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-3xl p-12 border border-white/10 backdrop-blur-sm">
                        <h2 className="text-3xl font-bold mb-4 text-white">Don't See the Right Role?</h2>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            We're always on the lookout for exceptional talent. Send us your resume and we'll keep you in mind for future opportunities.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="mailto:careers@djrag.com" className="px-8 py-4 bg-white text-purple-600 hover:bg-gray-100 font-semibold rounded-full transition-all shadow-lg">
                                Send Your Resume
                            </a>
                            <Link href="/about" className="px-8 py-4 rounded-full font-semibold text-white border border-white/20 hover:bg-white/5 transition-all">
                                Learn About Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
