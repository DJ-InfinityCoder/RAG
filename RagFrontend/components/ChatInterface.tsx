"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Plus } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { ChatArea } from "@/components/ChatArea";
import { InputArea } from "@/components/InputArea";
import {
    createSession,
    sendMessage,
    uploadFile,
    deleteSession,
    deleteAllSessions,
    Message,
    API_BASE_URL
} from "@/lib/api";
import { useSessions, useMessages } from "@/lib/hooks";
import { mutate } from "swr";

interface ChatInterfaceProps {
    initialSessionId?: string;
}

export function ChatInterface({ initialSessionId }: ChatInterfaceProps) {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(initialSessionId || null);
    const [isSending, setIsSending] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    // SWR Hooks
    const { sessions, mutate: mutateSessions, isLoading: isSessionsLoading } = useSessions();
    const { messages, mutate: mutateMessages, isLoading: isMessagesLoading } = useMessages(currentSessionId);

    // Update currentSessionId when initialSessionId changes
    useEffect(() => {
        if (initialSessionId && initialSessionId !== currentSessionId) {
            setCurrentSessionId(initialSessionId);
        }
    }, [initialSessionId, currentSessionId]);

    const handleNewChat = async () => {
        setIsCreating(true);
        try {
            const newSession = await createSession();
            await mutateSessions(); // Refresh sessions

            // Pre-seed cache to avoid skeleton loader
            mutate(`${API_BASE_URL}/sessions/${newSession.id}/messages`, [], false);

            setCurrentSessionId(newSession.id);
            setIsSidebarOpen(false);
            router.push(`/chat/${newSession.id}`);
        } catch (error) {
            console.error("Failed to create new session:", error);
        } finally {
            setIsCreating(false);
        }
    };

    const handleSelectSession = (id: string) => {
        setCurrentSessionId(id);
        setIsSidebarOpen(false);
        router.push(`/chat/${id}`);
    };

    const handleDeleteSession = async (sessionId: string) => {
        try {
            await deleteSession(sessionId);
            await mutateSessions(); // Refresh sessions
            if (currentSessionId === sessionId) {
                setCurrentSessionId(null);
                router.push("/chat");
            }
        } catch (error) {
            console.error("Failed to delete session:", error);
        }
    };

    const handleDeleteAllSessions = async () => {
        try {
            await deleteAllSessions();
            await mutateSessions();
            setCurrentSessionId(null);
            router.push("/chat");
        } catch (error) {
            console.error("Failed to delete all sessions:", error);
        }
    };

    const handleSendMessage = async (content: string, files: File[]) => {
        let sessionId = currentSessionId;

        // Create session if none exists
        if (!sessionId) {
            try {
                const newSession = await createSession();
                await mutateSessions();
                sessionId = newSession.id;
                setCurrentSessionId(sessionId);
                router.push(`/chat/${newSession.id}`);
            } catch (error) {
                console.error("Failed to create session:", error);
                return;
            }
        }

        setIsSending(true);

        // Upload files first
        if (files.length > 0) {
            for (const file of files) {
                try {
                    await uploadFile(sessionId, file);
                    mutateSessions(); // Refresh title

                } catch (error) {
                    console.error(`Failed to upload ${file.name}:`, error);
                }
            }
        }

        // Send text message
        if (content.trim()) {
            const tempUserMsg: Message = {
                id: Date.now(),
                role: "user",
                content: content,
                sources: null,
                created_at: new Date().toISOString(),
            };

            // Optimistic update
            await mutateMessages(async (currentMessages: Message[] | undefined) => {
                return [...(currentMessages || []), tempUserMsg];
            }, { revalidate: false });

            try {
                const response = await sendMessage(sessionId, content);

                const botMsg: Message = {
                    id: Date.now() + 1,
                    role: "assistant",
                    content: response.answer,
                    sources: response.sources,
                    metrics: response.metrics,
                    created_at: new Date().toISOString()
                };

                await mutateMessages(async (currentMessages: Message[] | undefined) => {
                    return [...(currentMessages || []), botMsg];
                }, { revalidate: false });

            } catch (error) {
                console.error("Failed to send message:", error);
                // Rollback if needed (SWR handles revalidation)
                mutateMessages();
            }
        }

        setIsSending(false);
    };

    const handleIngest = async () => {
        await mutateSessions();
        // Add a system message to indicate success
        const systemMsg: Message = {
            id: Date.now(),
            role: "assistant",
            content: "**System**: Text ingested successfully. You can now ask questions about it.",
            sources: null,
            created_at: new Date().toISOString(),
        };
        await mutateMessages(async (currentMessages: Message[] | undefined) => {
            return [...(currentMessages || []), systemMsg];
        }, { revalidate: false });
    };

    return (
        <div className="flex h-screen bg-[#131314] overflow-hidden">
            <Sidebar
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
                sessions={sessions}
                currentSessionId={currentSessionId}
                onSelectSession={handleSelectSession}
                onNewChat={handleNewChat}
                onDeleteSession={handleDeleteSession}
                onDeleteAllSessions={handleDeleteAllSessions}
                isLoading={isSessionsLoading}
            />

            <div className="flex-1 flex flex-col h-full relative">
                {/* Header for Mobile */}
                <div className="md:hidden p-4 flex items-center border-b border-[#444746]">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 -ml-2 hover:bg-[#333537] rounded-full text-[#e3e3e3]"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>
                    <Link href="/" className="ml-2 font-semibold text-[#e3e3e3] hover:opacity-80 transition-opacity">DJ Rag</Link>
                </div>

                {currentSessionId ? (
                    <>
                        <ChatArea
                            messages={messages}
                            isLoading={isSending}
                            sessionTitle={sessions?.find(s => s.id === currentSessionId)?.title || "Chat"}
                            isHistoryLoading={isMessagesLoading}
                        />

                        <div className="p-4">
                            <InputArea
                                onSendMessage={handleSendMessage}
                                currentSessionId={currentSessionId}
                                onIngest={handleIngest}
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-[#e3e3e3] p-4">
                        <div className="mb-8 text-center">
                            <h1 className="text-4xl font-bold mb-2">DJ Rag</h1>
                            <p className="text-[#c4c7c5]">Your intelligent document assistant</p>
                        </div>

                        <button
                            onClick={handleNewChat}
                            disabled={isCreating}
                            className="flex items-center gap-2 px-6 py-3 bg-[#a8c7fa] text-[#0f0f0f] rounded-full font-medium hover:bg-[#8ab4f8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isCreating ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Plus className="w-5 h-5" />
                            )}
                            <span>{isCreating ? "Creating..." : "Start New Chat"}</span>
                        </button>

                        <p className="mt-8 text-[#444746] text-sm">
                            Or select a recent chat from the sidebar
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
