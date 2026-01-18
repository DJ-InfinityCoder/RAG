import React, { useState } from "react";
import { Plus, MessageSquare, Settings, Menu, Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Session } from "@/lib/api";
import Link from "next/link";
import { SettingsDialog } from "./SettingsDialog";

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    sessions: Session[];
    currentSessionId: string | null;
    onSelectSession: (sessionId: string) => void;
    onNewChat: () => Promise<void>;
    onDeleteSession: (sessionId: string) => Promise<void>;
    onDeleteAllSessions: () => Promise<void>;
    isLoading?: boolean;
}

export function Sidebar({
    isOpen,
    setIsOpen,
    sessions,
    currentSessionId,
    onSelectSession,
    onNewChat,
    onDeleteSession,
    onDeleteAllSessions,
    isLoading
}: SidebarProps) {
    const [deletingSessionId, setDeletingSessionId] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleNewChatClick = async () => {
        setIsCreating(true);
        try {
            await onNewChat();
        } finally {
            setIsCreating(false);
        }
    };

    const handleDeleteClick = async (e: React.MouseEvent, sessionId: string) => {
        e.preventDefault();
        e.stopPropagation();
        setDeletingSessionId(sessionId);
        try {
            await onDeleteSession(sessionId);
        } finally {
            setDeletingSessionId(null);
        }
    };

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Container */}
            <motion.div
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-72 bg-[#1e1f20] text-[#e3e3e3] flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen border-r border-[#444746]",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Header */}
                <div className="p-4 flex items-center justify-between">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 hover:bg-[#333537] rounded-full md:hidden"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <Link href="/" className="text-xl font-semibold tracking-tight hover:opacity-80 transition-opacity">DJ Rag</Link>
                </div>

                {/* New Chat Button */}
                <div className="px-4 pb-4">
                    <button
                        onClick={handleNewChatClick}
                        disabled={isCreating}
                        className="w-full flex items-center gap-3 px-4 py-3 bg-[#1a1a1c] hover:bg-[#333537] rounded-full transition-colors text-sm font-medium text-[#e3e3e3] border border-[#444746] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isCreating ? (
                            <Loader2 className="w-5 h-5 text-[#a8c7fa] animate-spin" />
                        ) : (
                            <Plus className="w-5 h-5 text-[#a8c7fa]" />
                        )}
                        <span>{isCreating ? "Creating..." : "New chat"}</span>
                    </button>
                </div>

                {/* Recent Chats List */}
                <div className="flex-1 overflow-y-auto px-2">
                    <div className="px-4 py-2 text-xs font-medium text-[#c4c7c5]">Recent</div>
                    <div className="space-y-1">
                        {isLoading ? (
                            // Skeleton Loader
                            Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="px-4 py-3 rounded-full flex items-center gap-3 animate-pulse">
                                    <div className="w-4 h-4 bg-[#333537] rounded-full" />
                                    <div className="h-4 bg-[#333537] rounded w-3/4" />
                                </div>
                            ))
                        ) : (
                            sessions.map((session) => (
                                <Link
                                    key={session.id}
                                    href={`/chat/${session.id}`}
                                    className={cn(
                                        "group w-full flex items-center justify-between px-4 py-2 rounded-full transition-colors text-sm text-left cursor-pointer",
                                        currentSessionId === session.id ? "bg-[#004a77] text-[#c2e7ff]" : "hover:bg-[#333537] text-[#e3e3e3]"
                                    )}
                                    onClick={() => onSelectSession(session.id)}
                                >
                                    <div className="flex items-center gap-3 truncate">
                                        <MessageSquare className="w-4 h-4 min-w-[16px]" />
                                        <span className="truncate">{session.title || "New Chat"}</span>
                                    </div>
                                    <button
                                        onClick={(e) => handleDeleteClick(e, session.id)}
                                        disabled={deletingSessionId === session.id}
                                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[#444746] rounded-full transition-opacity disabled:opacity-100"
                                    >
                                        {deletingSessionId === session.id ? (
                                            <Loader2 className="w-3 h-3 animate-spin text-[#c4c7c5]" />
                                        ) : (
                                            <Trash2 className="w-3 h-3" />
                                        )}
                                    </button>
                                </Link>
                            ))
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-[#444746]">
                    <button
                        onClick={() => setIsSettingsOpen(true)}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#333537] rounded-full transition-colors text-sm text-[#e3e3e3]"
                    >
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                    </button>
                </div>
            </motion.div>

            <SettingsDialog
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                onDeleteAllSessions={onDeleteAllSessions}
            />
        </>
    );
}
