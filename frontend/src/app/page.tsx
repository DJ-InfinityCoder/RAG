'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FileText, Zap, MessageSquare, Sparkles, ArrowRight, Upload, Shield, Cpu, CheckCircle, Mail, Github, Twitter, Linkedin, ChevronDown, Star } from 'lucide-react';
import FloatingLines from '@/components/FloatingLines';

import Navbar from '@/components/Navbar';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function Home() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState('');

  const handleStartChat = async () => {
    setIsCreating(true);
    try {
      // First, check if there's an existing empty session (session without a file uploaded)
      const listRes = await fetch(`${API_URL}/sessions`);
      const sessions = await listRes.json();

      // Find the first session that doesn't have a file uploaded
      const emptySession = sessions.find((session: any) => !session.file_name);

      if (emptySession) {
        // Reuse the existing empty session
        router.push(`/chat/${emptySession.id}`);
      } else {
        // Create a new session only if no empty session exists
        const res = await fetch(`${API_URL}/sessions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: 'New Chat' }),
        });
        const newSession = await res.json();
        router.push(`/chat/${newSession.id}`);
      }
    } catch (error) {
      console.error('Failed to create session:', error);
      setIsCreating(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden selection:bg-purple-500/30">
      <Navbar />

      {/* Background Animation - Landing Screen Only */}
      <div className="absolute top-0 left-0 right-0 h-screen z-0 opacity-60 overflow-hidden">
        <FloatingLines
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={6}
          lineDistance={5}
          bendRadius={5.0}
          mouseDamping={0.05}
          bendStrength={0.5}
          interactive={true}
          parallax={true}
          parallaxStrength={0.2}
          mixBlendMode="screen"
          linesGradient={['#A855F7', '#EC4899', '#3B82F6']}
        />
      </div>


      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-40 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-gray-300">RAG Engine v2.0 Live</span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
            Intelligent Document
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Analysis & Chat
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform your static documents into interactive knowledge bases.
            Upload PDFs or DOCX files and engage in natural, context-aware conversations powered by advanced AI.
          </p>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button
              onClick={handleStartChat}
              disabled={isCreating}
              className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold text-lg shadow-xl shadow-white/10 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed min-w-[200px]"
            >
              <span className="flex items-center justify-center gap-2">
                {isCreating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                    Initializing...
                  </>
                ) : (
                  <>
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>

            <a href="#features" className="px-8 py-4 rounded-full font-semibold text-lg text-white border border-white/20 hover:bg-white/5 transition-all duration-300">
              Learn More
            </a>
          </div>

          {/* Stats/Trust */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-white/10 py-8 mb-24 bg-white/5 backdrop-blur-sm rounded-2xl">
            <div>
              <div className="text-3xl font-bold text-white mb-1">99%</div>
              <div className="text-sm text-gray-400">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">&lt;1s</div>
              <div className="text-sm text-gray-400">Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">Secure</div>
              <div className="text-sm text-gray-400">Local Processing</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-gray-400">Availability</div>
            </div>
          </div>
        </div>


        {/* Enhanced Features Section */}
        <div id="features" className="max-w-6xl mx-auto mt-64 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to transform your documents into intelligent, searchable knowledge bases
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-8 rounded-3xl bg-gradient-to-b from-purple-900/10 to-transparent border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Universal Document Support</h3>
              <p className="text-gray-400 leading-relaxed">
                Upload PDFs, DOCX, Excel, CSV, and more. Our intelligent parser handles complex layouts, tables, and multi-column documents.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-b from-pink-900/10 to-transparent border border-pink-500/10 hover:border-pink-500/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 flex items-center justify-center mb-6 text-pink-400 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Advanced AI Search</h3>
              <p className="text-gray-400 leading-relaxed">
                Hybrid semantic + keyword search powered by cutting-edge vector embeddings for unmatched retrieval accuracy.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-b from-blue-900/10 to-transparent border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Privacy First</h3>
              <p className="text-gray-400 leading-relaxed">
                Your documents never leave your control. All processing happens locally with enterprise-grade encryption.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-b from-cyan-900/10 to-transparent border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Contextual Conversations</h3>
              <p className="text-gray-400 leading-relaxed">
                Multi-turn conversations with full context awareness. Ask follow-up questions naturally.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-b from-emerald-900/10 to-transparent border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Lightning Fast</h3>
              <p className="text-gray-400 leading-relaxed">
                Sub-second response times even with large document libraries. Optimized vector indexing at scale.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-b from-amber-900/10 to-transparent border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center mb-6 text-amber-400 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Smart Summaries</h3>
              <p className="text-gray-400 leading-relaxed">
                Automatic extraction of key insights, main points, and actionable takeaways from any document.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div id="how-it-works" className="max-w-6xl mx-auto mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 z-1 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/50">
                1
              </div>
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-2xl p-8 h-full backdrop-blur-sm">
                <FileText className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-white">Upload Document</h3>
                <p className="text-gray-400 leading-relaxed">
                  Simply drag and drop your PDF, DOCX, Excel, or CSV file. Our system automatically processes and chunks your content for optimal retrieval.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 z-1 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/50">
                2
              </div>
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-2xl p-8 h-full backdrop-blur-sm">
                <Sparkles className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-white">AI Processing</h3>
                <p className="text-gray-400 leading-relaxed">
                  Advanced AI creates semantic embeddings and indexes your content. This enables intelligent search and context-aware responses.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 z-1 rounded-full bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-pink-500/50">
                3
              </div>
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-2xl p-8 h-full backdrop-blur-sm">
                <MessageSquare className="w-12 h-12 text-pink-400 mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-white">Ask Questions</h3>
                <p className="text-gray-400 leading-relaxed">
                  Start chatting! Ask questions, request summaries, extract insights, or explore your document through natural conversation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="max-w-6xl mx-auto mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-3xl p-8 backdrop-blur-sm">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
                <p className="text-gray-400">Perfect for trying out</p>
              </div>
              <div className="mb-6">
                <span className="text-5xl font-bold text-white">$0</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  '5 documents per month',
                  '10 MB max file size',
                  'Basic AI responses',
                  'Community support',
                  '7-day chat history'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full px-6 py-3 rounded-xl bg-gray-700/50 hover:bg-gray-700 text-white font-semibold transition-colors">
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-2 border-purple-500/50 rounded-3xl p-8 backdrop-blur-sm relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-sm font-semibold text-white">
                Most Popular
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <p className="text-gray-400">For professionals</p>
              </div>
              <div className="mb-6">
                <span className="text-5xl font-bold text-white">$29</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Unlimited documents',
                  '100 MB max file size',
                  'Advanced AI models',
                  'Priority support',
                  'Unlimited history',
                  'API access',
                  'Custom branding'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold transition-all shadow-lg shadow-purple-500/30">
                Start Free Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-3xl p-8 backdrop-blur-sm">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                <p className="text-gray-400">For large teams</p>
              </div>
              <div className="mb-6">
                <span className="text-5xl font-bold text-white">Custom</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Everything in Pro',
                  'Unlimited file size',
                  'Dedicated infrastructure',
                  'SSO & advanced security',
                  '24/7 phone support',
                  'Custom integrations',
                  'SLA guarantee'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full px-6 py-3 rounded-xl bg-blue-600/50 hover:bg-blue-600 text-white font-semibold transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="max-w-6xl mx-auto mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Trusted by Teams Worldwide
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              See how organizations use DJ RAG to unlock insights from their documents
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4 text-white">📚 Research & Academia</h3>
              <p className="text-gray-400 leading-relaxed">
                Researchers use DJ RAG to quickly find relevant information across hundreds of academic papers, accelerating literature reviews and hypothesis generation.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4 text-white">⚖️ Legal & Compliance</h3>
              <p className="text-gray-400 leading-relaxed">
                Law firms leverage DJ RAG for contract analysis, case research, and compliance document review, saving hours of manual work.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4 text-white">💼 Business Intelligence</h3>
              <p className="text-gray-400 leading-relaxed">
                Executives extract insights from financial reports, market research, and strategic documents to make data-driven decisions faster.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-900/20 to-emerald-900/20 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4 text-white">🎓 Education</h3>
              <p className="text-gray-400 leading-relaxed">
                Students and educators use DJ RAG to interact with textbooks, study materials, and course documents for enhanced learning.
              </p>
            </div>
          </div>
        </div>

        {/* Demo Section */}
        <div className="max-w-6xl mx-auto mb-32">
          <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-3xl p-12 border border-white/10 backdrop-blur-sm">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-white">See DJ RAG in Action</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Watch how easily you can transform any document into an interactive knowledge base. Upload, ask, and get instant insights.
                </p>
                <ul className="space-y-4">
                  {[
                    'Natural language queries',
                    'Context-aware responses',
                    'Instant document understanding',
                    'Multi-format support'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 blur-3xl opacity-20 rounded-full"></div>
                <div className="relative bg-black/40 p-8 rounded-2xl border border-white/10">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">U</div>
                    <div className="bg-white/10 p-4 rounded-2xl rounded-tl-none text-sm text-gray-300">
                      What are the main conclusions from this research paper?
                    </div>
                  </div>
                  <div className="flex items-start gap-4 justify-end">
                    <div className="bg-purple-600/20 p-4 rounded-2xl rounded-tr-none text-sm text-gray-200 border border-purple-500/30">
                      The research concludes that AI-powered document analysis can reduce information retrieval time by 87% compared to manual methods...
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="max-w-6xl mx-auto mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Loved by Professionals
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              See what our users have to say about DJ RAG
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Chen',
                role: 'Research Scientist',
                company: 'Stanford University',
                content: 'DJ RAG has transformed how I conduct literature reviews. What used to take days now takes hours. The accuracy is remarkable!',
                rating: 5
              },
              {
                name: 'Michael Rodriguez',
                role: 'Legal Partner',
                company: 'Rodriguez & Associates',
                content: 'The ability to quickly search through thousands of legal documents with natural language is a game-changer for our firm.',
                rating: 5
              },
              {
                name: 'Emily Watson',
                role: 'Product Manager',
                company: 'TechCorp',
                content: 'Our team uses DJ RAG daily for market research analysis. It\'s like having an AI analyst on demand. Absolutely essential!',
                rating: 5
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:border-white/20 transition-all">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">"{testimonial.content}"</p>
                <div className="border-t border-white/10 pt-4">
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                  <p className="text-sm text-purple-400">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-6xl mx-auto mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need to know about DJ RAG
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: 'What file formats does DJ RAG support?',
                answer: 'DJ RAG supports a wide range of formats including PDF, DOCX, Excel (.xlsx, .xls), CSV, and plain text files. We\'re continuously adding support for more formats.'
              },
              {
                question: 'How secure is my data?',
                answer: 'Your data security is our top priority. All documents are processed locally with enterprise-grade encryption. We never store or share your documents with third parties. You have full control over your data.'
              },
              {
                question: 'Can I use DJ RAG for multiple documents at once?',
                answer: 'Currently, each chat session is associated with a single document to ensure the highest quality responses. However, you can create multiple chat sessions for different documents and switch between them easily.'
              },
              {
                question: 'What AI models power DJ RAG?',
                answer: 'DJ RAG uses state-of-the-art language models combined with advanced vector embeddings for semantic search. We employ hybrid retrieval techniques that combine semantic understanding with traditional keyword search for optimal results.'
              },
              {
                question: 'Is there a limit to document size?',
                answer: 'Document size limits vary by plan. Free users can upload files up to 10MB, Pro users up to 100MB, and Enterprise users have no file size restrictions. See our pricing section for more details.'
              },
              {
                question: 'Can I integrate DJ RAG into my existing workflow?',
                answer: 'Yes! Pro and Enterprise plans include API access, allowing you to integrate DJ RAG into your existing applications and workflows. Check our documentation for integration guides.'
              }
            ].map((faq, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg font-semibold text-white pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 py-6 text-gray-400 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="max-w-6xl mx-auto mb-32">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-90"></div>
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }}></div>
            <div className="relative px-12 py-20 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Transform Your Documents?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who are already using DJ RAG to unlock insights from their documents.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleStartChat}
                  disabled={isCreating}
                  className="group px-10 py-5 bg-white text-purple-600 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/30 transition-all duration-300 hover:-translate-y-1 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed min-w-[220px]"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isCreating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                        Initializing...
                      </>
                    ) : (
                      <>
                        Start Free Trial
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>
                <a href="#pricing" className="px-10 py-5 rounded-full font-bold text-lg text-white border-2 border-white hover:bg-white/10 transition-all duration-300">
                  View Pricing
                </a>
              </div>
              <p className="text-white/70 text-sm mt-6">No credit card required • 14-day free trial • Cancel anytime</p>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <footer className="relative mt-32 overflow-hidden">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-purple-900/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>

          <div className="relative border-t border-white/10 pt-20 pb-10">
            <div className="container mx-auto px-6">
              {/* Enhanced Newsletter Section */}
              <div className="max-w-4xl mx-auto text-center mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm mb-6">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-purple-300">Newsletter</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Stay in the Loop
                </h3>
                <p className="text-gray-400 mb-8 text-lg">
                  Get the latest updates on new features, AI advancements, and exclusive insights delivered to your inbox
                </p>
                <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                  <div className="relative flex-1">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all hover:bg-white/15"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-full transition-all shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 whitespace-nowrap flex items-center justify-center gap-2 group"
                  >
                    Subscribe
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
                <p className="text-gray-500 text-xs mt-4">
                  Join 10,000+ professionals. Unsubscribe anytime. No spam, we promise! 🔒
                </p>
              </div>

              {/* Main Footer Content with Better Layout */}
              <div className="grid md:grid-cols-3 gap-12 mb-16 max-w-6xl mx-auto">
                {/* Brand Column - Enhanced */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3 mb-6 group">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all group-hover:scale-110">
                      <img src="/dj_rag_logo.png" alt="DJ RAG" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-bold text-2xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                      DJ RAG
                    </span>
                  </div>
                  <p className="text-gray-400 mb-8 leading-relaxed max-w-md">
                    Empowering organizations with intelligent document analysis and AI-powered conversations. Transform your static documents into dynamic, searchable knowledge bases with cutting-edge RAG technology.
                  </p>

                  {/* Enhanced Social Media Links */}
                  <div>
                    <p className="text-sm text-gray-500 mb-4 font-medium">Connect with us</p>
                    <div className="flex gap-3">
                      <a
                        href="#"
                        className="group relative w-11 h-11 rounded-xl bg-gradient-to-br from-white/5 to-white/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-white/10 hover:border-purple-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                      >
                        <Twitter className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors relative z-10" />
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity"></div>
                      </a>
                      <a
                        href="#"
                        className="group relative w-11 h-11 rounded-xl bg-gradient-to-br from-white/5 to-white/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-white/10 hover:border-purple-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                      >
                        <Github className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors relative z-10" />
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity"></div>
                      </a>
                      <a
                        href="#"
                        className="group relative w-11 h-11 rounded-xl bg-gradient-to-br from-white/5 to-white/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-white/10 hover:border-purple-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                      >
                        <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors relative z-10" />
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity"></div>
                      </a>
                      <a
                        href="mailto:contact@djrag.com"
                        className="group relative w-11 h-11 rounded-xl bg-gradient-to-br from-white/5 to-white/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-white/10 hover:border-purple-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                      >
                        <Mail className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors relative z-10" />
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity"></div>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Company Column - Enhanced */}
                <div className="md:border-l md:border-white/10 md:pl-12">
                  <h4 className="font-bold text-white mb-6 text-base flex items-center gap-2">
                    <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
                    Company
                  </h4>
                  <ul className="space-y-4">
                    <li>
                      <Link href="/about" className="text-gray-400 hover:text-white transition-all flex items-center gap-3 group hover:translate-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        <span>About Us</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/careers" className="text-gray-400 hover:text-white transition-all flex items-center gap-3 group hover:translate-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        <span>Careers</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy" className="text-gray-400 hover:text-white transition-all flex items-center gap-3 group hover:translate-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        <span>Privacy Policy</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms" className="text-gray-400 hover:text-white transition-all flex items-center gap-3 group hover:translate-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        <span>Terms of Service</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/security" className="text-gray-400 hover:text-white transition-all flex items-center gap-3 group hover:translate-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        <span>Security</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Enhanced Bottom Bar */}
              <div className="border-t border-white/10 pt-8 mt-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                    <p className="text-gray-500 text-sm text-center md:text-left">
                      © 2025 DJ RAG. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <span className="hidden md:inline">•</span>
                      <span>Built with</span>
                      <span className="text-pink-500 animate-pulse">❤️</span>
                      <span>for the future of AI</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors hover:underline underline-offset-4">
                      Privacy
                    </Link>
                    <span className="text-gray-700">•</span>
                    <Link href="/terms" className="text-gray-500 hover:text-white transition-colors hover:underline underline-offset-4">
                      Terms
                    </Link>
                    <span className="text-gray-700">•</span>
                    <Link href="/cookie-policy" className="text-gray-500 hover:text-white transition-colors hover:underline underline-offset-4">
                      Cookies
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
