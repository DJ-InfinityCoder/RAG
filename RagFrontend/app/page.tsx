import Link from "next/link";
import { ArrowRight, MessageSquare, Shield, Zap, Github, Globe, Linkedin, Code, Database, Cpu, Layers } from "lucide-react";
import { HealthStatus } from "@/components/HealthStatus";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "DJ Rag",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Enterprise-grade Retrieval-Augmented Generation (RAG) platform powered by Google Gemini and Pinecone.",
    "author": {
      "@type": "Person",
      "name": "Dilip Meghwal",
      "url": "https://dilip.live"
    }
  };

  return (
    <div className="min-h-screen bg-[#131314] text-[#e3e3e3] flex flex-col font-sans selection:bg-[#4285f4] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#131314]/80 backdrop-blur-md border-b border-[#444746]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-[#4285f4] to-[#9b72cb] bg-clip-text text-transparent cursor-pointer">
            DJ Rag
          </Link>
          <div className="flex gap-4 items-center">
            <HealthStatus />
            <a
              href="https://github.com/DJ-InfinityCoder/RAG"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-[#444746] hover:bg-[#333537] transition-colors text-sm font-medium"
            >
              <Github className="w-4 h-4" />
              <span>Star on GitHub</span>
            </a>
            <Link
              href="/chat"
              className="px-4 py-2 rounded-full bg-[#e3e3e3] text-[#1e1f20] font-medium hover:bg-white transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col">
        <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#4285f4]/10 to-transparent rounded-full blur-3xl -z-10" />

          <div className="max-w-5xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1f20] border border-[#444746] text-sm text-[#a8c7fa] mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a8c7fa] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a8c7fa]"></span>
              </span>
              Now with Advanced RAG & Vector Search
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Chat with your data using <br />
              <span className="bg-gradient-to-r from-[#4285f4] via-[#9b72cb] to-[#d96570] bg-clip-text text-transparent">
                Enterprise-Grade AI
              </span>
            </h1>

            <p className="text-xl text-[#c4c7c5] max-w-2xl mx-auto leading-relaxed">
              Upload documents, ask complex questions, and get instant, citation-backed answers.
              Powered by state-of-the-art vector embeddings and LLMs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                href="/chat"
                className="px-8 py-4 rounded-full bg-[#e3e3e3] text-[#1e1f20] font-semibold text-lg hover:bg-white transition-all hover:scale-105 flex items-center gap-2 shadow-[0_0_20px_rgba(227,227,227,0.2)]"
              >
                Start Chatting <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://github.com/DJ-InfinityCoder/RAG"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full border border-[#444746] text-[#e3e3e3] font-semibold text-lg hover:bg-[#333537] transition-all flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                View Code
              </a>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-12 border-y border-[#444746] bg-[#1e1f20]/50">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-[#c4c7c5] text-sm font-medium mb-8 uppercase tracking-widest">Powered by Modern Tech Stack</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 text-xl font-semibold"><Code className="w-6 h-6" /> Next.js 16</div>
              <div className="flex items-center gap-2 text-xl font-semibold"><Database className="w-6 h-6" /> Pinecone</div>
              <div className="flex items-center gap-2 text-xl font-semibold"><Cpu className="w-6 h-6" /> Gemini Pro</div>
              <div className="flex items-center gap-2 text-xl font-semibold"><Layers className="w-6 h-6" /> Python FastAPI</div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 px-6 max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why DJ Rag?</h2>
            <p className="text-[#c4c7c5] max-w-2xl mx-auto">Built for performance, accuracy, and scalability. Experience the next generation of document interaction.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageSquare className="w-8 h-8 text-[#a8c7fa]" />,
                title: "Smart Context Awareness",
                desc: "Maintains deep context across long conversations, understanding nuances and references in your documents.",
              },
              {
                icon: <Zap className="w-8 h-8 text-[#d96570]" />,
                title: "Instant & Accurate",
                desc: "Powered by Flashrank reranking and LRU caching for millisecond-latency responses with high precision.",
              },
              {
                icon: <Shield className="w-8 h-8 text-[#81c995]" />,
                title: "Enterprise Security",
                desc: "Your data is processed securely with ephemeral storage and industry-standard encryption protocols.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-3xl bg-[#1e1f20] border border-[#444746] hover:border-[#a8c7fa]/50 transition-all hover:shadow-[0_0_30px_rgba(66,133,244,0.1)]"
              >
                <div className="mb-6 p-4 rounded-2xl bg-[#131314] w-fit group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-[#a8c7fa] transition-colors">{feature.title}</h3>
                <p className="text-[#c4c7c5] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#444746] bg-[#1e1f20]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-[#4285f4] to-[#9b72cb] bg-clip-text text-transparent mb-4">
                DJ Rag
              </div>
              <p className="text-[#c4c7c5] max-w-sm">
                An advanced RAG (Retrieval-Augmented Generation) platform built for seamless document interaction and intelligence.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-[#e3e3e3]">Project</h4>
              <ul className="space-y-3 text-[#c4c7c5] text-sm">
                <li><a href="https://github.com/DJ-InfinityCoder/RAG" target="_blank" rel="noopener noreferrer" className="hover:text-[#a8c7fa] transition-colors">Source Code</a></li>
                <li><Link href="/chat" className="hover:text-[#a8c7fa] transition-colors">Live Demo</Link></li>
                <li><Link href="/docs" className="hover:text-[#a8c7fa] transition-colors">Documentation</Link></li>
                <li><Link href="/evaluation" className="hover:text-[#a8c7fa] transition-colors">Evaluation Report</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-[#e3e3e3]">Developer</h4>
              <ul className="space-y-3 text-[#c4c7c5] text-sm">
                <li>
                  <a href="https://www.dilip.live/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#a8c7fa] transition-colors">
                    <Globe className="w-4 h-4" /> Portfolio
                  </a>
                </li>
                <li>
                  <a href="https://github.com/DJ-InfinityCoder" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#a8c7fa] transition-colors">
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/dilipmeghwal13/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#a8c7fa] transition-colors">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[#444746] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#c4c7c5]">
            <p>© 2026 DJ Rag. Built with ❤️ by Dilip Meghwal.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-[#e3e3e3] transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#e3e3e3] transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
