import React from 'react';
import Link from 'next/link';
import { Plus, MessageSquare, Trash2, FileText, Sparkles } from 'lucide-react';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Session {
    id: string;
    title: string;
    created_at: string;
}

interface SidebarProps {
    sessions: Session[];
    currentSessionId: string | null;
    onSelectSession: (id: string) => void;
    onNewChat: () => void;
    onDeleteSession: (id: string) => void;
}

export default function Sidebar({ sessions, currentSessionId, onSelectSession, onNewChat, onDeleteSession }: SidebarProps) {
    return (
        <div className="flex h-full w-[280px] flex-col relative overflow-hidden">
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1b1e] via-[#1e1f23] to-[#1a1b1e]" />
            <div className="absolute inset-0 backdrop-blur-xl bg-black/40 border-r border-white/5" />

            {/* Ambient Glow */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
                {/* Header with New Chat Button */}
                <div className="p-4 space-y-4">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            DJ RAG
                        </span>
                    </div>

                    <Button
                        onClick={onNewChat}
                        className="w-full justify-start gap-2 text-white shadow-lg shadow-blue-900/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer hover:shadow-xl hover:shadow-blue-900/40 border border-purple-500/50"
                    >
                        <Plus size={18} strokeWidth={2.5} />
                        <span className="font-semibold">New Chat</span>
                    </Button>
                </div>

                {/* History List */}
                <ScrollArea className="flex-1 px-3">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2 py-2 flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-gray-500" />
                        Recent Chats
                    </div>
                    <div className="space-y-1.5 pb-4">
                        {sessions.map((session) => (
                            <Link
                                key={session.id}
                                href={`/chat/${session.id}`}
                                onClick={() => onSelectSession(session.id)}
                                className={cn(
                                    "group flex items-center gap-3 px-3 w-62 py-3 rounded-xl text-sm transition-all duration-300 relative overflow-hidden",
                                    currentSessionId === session.id
                                        ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-blue-500/30 shadow-lg shadow-blue-900/20"
                                        : "text-gray-300 hover:bg-white/5 border border-transparent hover:border-white/10 hover:scale-[1.001]"
                                )}
                            >
                                {/* Active indicator glow */}
                                {currentSessionId === session.id && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl" />
                                )}

                                <div className={cn(
                                    "relative flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
                                    currentSessionId === session.id
                                        ? "bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30"
                                        : "bg-gray-800/50 group-hover:bg-gray-700/50"
                                )}>
                                    <FileText size={16} className={cn(
                                        "transition-colors",
                                        currentSessionId === session.id ? "text-white" : "text-gray-400 group-hover:text-gray-300"
                                    )} />
                                </div>

                                <div className="flex-1 min-w-0 relative">
                                    <span className={cn(
                                        "block font-medium text-left leading-tight truncate transition-colors",
                                        currentSessionId === session.id ? "text-white" : "text-gray-300 group-hover:text-white"
                                    )}>
                                        {session.title || "New Chat"}
                                    </span>
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        onDeleteSession(session.id);
                                    }}
                                    className={cn(
                                        "relative flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 p-2 hover:bg-red-500/20 hover:text-red-400 rounded-lg backdrop-blur-sm hover:scale-110",
                                        currentSessionId === session.id && "opacity-100"
                                    )}
                                >
                                    <Trash2 size={14} strokeWidth={2} />
                                </button>
                            </Link>
                        ))}
                    </div>
                </ScrollArea>

                {/* Footer gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1a1b1e] to-transparent pointer-events-none" />
            </div>
        </div>
    );
}
