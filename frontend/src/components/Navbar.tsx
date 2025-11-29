'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const offset = 150; // 100px from the top
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: 'smooth',
                });
                setIsMobileMenuOpen(false); // Close mobile menu after click
            }
        }
    };

    const navLinks = [
        { name: 'Features', href: '#features' },
        { name: 'How it Works', href: '#how-it-works' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Docs', href: '/docs' },
    ];

    return (
        <nav
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[90%] max-w-6xl rounded-full ${isScrolled
                ? 'bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 shadow-lg shadow-purple-500/10 py-3 px-6'
                : 'bg-transparent py-4 px-6'
                }`}
        >
            <div className="flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-8 h-8 overflow-hidden rounded-lg">
                        <img
                            src="/dj_rag_logo.png"
                            alt="DJ RAG Logo"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="font-bold text-lg tracking-tight text-white group-hover:text-purple-400 transition-colors">
                        DJ RAG
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleSmoothScroll(e, link.href)}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </div>
                <div className="hidden md:block">
                    <Link
                        href="https://www.dilip.live/#projects"
                        className="px-5 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Explore more
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full mt-4 p-4 bg-[#0a0a0a] border border-white/10 rounded-2xl md:hidden flex flex-col gap-4 shadow-xl">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleSmoothScroll(e, link.href)}
                            className="text-gray-300 hover:text-white font-medium"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="https://www.dilip.live/#projects"
                        className="px-5 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Explore more
                    </Link>
                </div>
            )}
        </nav>
    );
}
