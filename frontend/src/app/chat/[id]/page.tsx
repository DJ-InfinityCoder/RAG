'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ChatInterface from '@/components/ChatInterface';
import Sidebar from '@/components/Sidebar';
import EmptyState from '@/components/EmptyState';
import { Menu } from 'lucide-react';

interface Message {
    id: number;
    role: 'user' | 'assistant';
    content: string;
}

interface Session {
    id: string;
    title: string;
    file_name: string | null;
    created_at: string;
}

export default function ChatPage() {
    const params = useParams();
    const router = useRouter();
    const sessionId = params.id as string;

    const [sessions, setSessions] = useState<Session[]>([]);
    const [currentSession, setCurrentSession] = useState<Session | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Load sessions on mount
    useEffect(() => {
        fetchSessions();
    }, []);

    // Load current session and messages when sessionId changes
    useEffect(() => {
        if (sessionId) {
            fetchCurrentSession(sessionId);
            fetchMessages(sessionId);
        }
    }, [sessionId]);

    const fetchSessions = async () => {
        try {
            const res = await fetch('http://localhost:8000/sessions');
            const data = await res.json();
            setSessions(data);
        } catch (error) {
            console.error('Failed to fetch sessions:', error);
        }
    };

    const fetchCurrentSession = async (id: string) => {
        try {
            const res = await fetch('http://localhost:8000/sessions');
            const data = await res.json();
            const session = data.find((s: Session) => s.id === id);
            setCurrentSession(session || null);
        } catch (error) {
            console.error('Failed to fetch current session:', error);
        }
    };

    const fetchMessages = async (id: string) => {
        try {
            const res = await fetch(`http://localhost:8000/sessions/${id}/messages`);
            const data = await res.json();
            setMessages(data);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        }
    };

    const handleNewChat = async () => {
        try {
            const res = await fetch('http://localhost:8000/sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: 'New Chat' }),
            });
            const newSession = await res.json();
            setSessions(prev => [newSession, ...prev]);
            router.push(`/chat/${newSession.id}`);
        } catch (error) {
            console.error('Failed to create session:', error);
        }
    };

    const handleSelectSession = (id: string) => {
        router.push(`/chat/${id}`);
        if (window.innerWidth < 768) setIsSidebarOpen(false);
    };

    const handleDeleteSession = async (id: string) => {
        try {
            const res = await fetch(`http://localhost:8000/sessions/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setSessions(prev => prev.filter(s => s.id !== id));
                if (sessionId === id) {
                    // Redirect to home or create new chat
                    const remainingSessions = sessions.filter(s => s.id !== id);
                    if (remainingSessions.length > 0) {
                        router.push(`/chat/${remainingSessions[0].id}`);
                    } else {
                        router.push('/');
                    }
                }
            }
        } catch (error) {
            console.error('Failed to delete session:', error);
        }
    };

    const handleFileUpload = async (file: File) => {
        if (!sessionId) return;

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await fetch(`http://localhost:8000/sessions/${sessionId}/upload`, {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                await fetchSessions();
                await fetchCurrentSession(sessionId);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSendMessage = async (content: string) => {
        if (!sessionId || !content.trim()) return;

        const tempId = Date.now();
        setMessages(prev => [...prev, { id: tempId, role: 'user', content }]);
        setIsLoading(true);

        try {
            const res = await fetch(`http://localhost:8000/sessions/${sessionId}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: content }),
            });

            if (!res.ok) throw new Error('Failed to send message');

            await fetchMessages(sessionId);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Show empty state if no file uploaded
    const hasFile = currentSession?.file_name !== null;

    return (
        <div className="flex h-screen bg-gradient-to-br from-[#0a0b0f] via-[#0f1014] to-[#0a0b0f] text-white font-sans overflow-hidden">
            {/* Mobile Sidebar Toggle */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2.5 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-xl border border-gray-700/50 shadow-lg hover:scale-105 transition-transform duration-200"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                <Menu size={20} />
            </button>

            {/* Sidebar */}
            <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 fixed md:relative z-40 h-full`}>
                <Sidebar
                    sessions={sessions}
                    currentSessionId={sessionId}
                    onSelectSession={handleSelectSession}
                    onNewChat={handleNewChat}
                    onDeleteSession={handleDeleteSession}
                />
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col relative w-full">
                {hasFile ? (
                    <ChatInterface
                        messages={messages}
                        onSendMessage={handleSendMessage}
                        isLoading={isLoading}
                    />
                ) : (
                    <EmptyState onFileUpload={handleFileUpload} isUploading={isUploading} />
                )}
            </div>
        </div>
    );
}
