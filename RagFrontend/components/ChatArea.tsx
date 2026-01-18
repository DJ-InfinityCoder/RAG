"use client";

import React, { useEffect, useRef } from "react";
import { User, Bot, Copy, ThumbsUp, ThumbsDown, MoreVertical, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Message } from "@/lib/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatSkeleton } from "./ChatSkeleton";

interface ChatAreaProps {
    messages: Message[];
    isLoading?: boolean;
    sessionTitle?: string;
    isHistoryLoading?: boolean;
}

export function ChatArea({ messages, isLoading, sessionTitle, isHistoryLoading }: ChatAreaProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        // You could add a toast notification here
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
            {/* Header */}
            {sessionTitle && (
                <div className="absolute top-0 left-0 right-0 z-10 bg-[#131314]/80 backdrop-blur-md border-b border-[#444746] px-6 py-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#a8c7fa]" />
                    <span className="font-medium text-[#e3e3e3] truncate">{sessionTitle}</span>
                </div>
            )}

            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 pt-20 md:pt-24">
                {isHistoryLoading ? (
                    <ChatSkeleton />
                ) : messages.length === 0 && !isLoading ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center justify-center h-full text-center space-y-8"
                    >
                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#4285f4] to-[#9b72cb] flex items-center justify-center mb-4">
                            <Bot className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#4285f4] via-[#9b72cb] to-[#d96570] bg-clip-text text-transparent">
                            Hello, I&apos;m DJ Rag
                        </h1>
                        <p className="text-xl text-[#c4c7c5] max-w-lg">
                            I can help you analyze your documents. Upload a file or start typing to begin.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full text-left">
                            <div className="p-4 rounded-xl bg-[#1e1f20] border border-[#444746]">
                                <h3 className="font-semibold text-[#e3e3e3] mb-2 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-[#a8c7fa]" /> Supported Files
                                </h3>
                                <ul className="text-sm text-[#c4c7c5] space-y-1 list-disc list-inside">
                                    <li>PDF Documents (.pdf)</li>
                                    <li>Word Documents (.docx)</li>
                                    <li>Excel Spreadsheets (.xlsx)</li>
                                    <li>CSV Files (.csv)</li>
                                </ul>
                            </div>
                            <div className="p-4 rounded-xl bg-[#1e1f20] border border-[#444746]">
                                <h3 className="font-semibold text-[#e3e3e3] mb-2 flex items-center gap-2">
                                    <Bot className="w-4 h-4 text-[#d96570]" /> Capabilities
                                </h3>
                                <ul className="text-sm text-[#c4c7c5] space-y-1 list-disc list-inside">
                                    <li>Answer questions from docs</li>
                                    <li>Provide citations</li>
                                    <li>Summarize content</li>
                                    <li>Analyze data</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                                "flex gap-4 max-w-4xl mx-auto",
                                message.role === "user" ? "flex-row-reverse" : "flex-row"
                            )}
                        >
                            {/* Avatar */}
                            <div
                                className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                    message.role === "user" ? "bg-[#a8c7fa] text-[#004a77]" : "bg-gradient-to-tr from-[#4285f4] to-[#9b72cb] text-white"
                                )}
                            >
                                {message.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                            </div>

                            {/* Content */}
                            <div className={cn("flex flex-col gap-2 max-w-[80%]", message.role === "user" ? "items-end" : "items-start")}>
                                <div className="text-[#e3e3e3] text-base leading-relaxed">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                            ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                                            ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                                            li: ({ children }) => <li className="text-[#e3e3e3]">{children}</li>,
                                            h1: ({ children }) => <h1 className="text-2xl font-bold mb-2 mt-4 text-[#e3e3e3]">{children}</h1>,
                                            h2: ({ children }) => <h2 className="text-xl font-bold mb-2 mt-3 text-[#e3e3e3]">{children}</h2>,
                                            h3: ({ children }) => <h3 className="text-lg font-bold mb-2 mt-2 text-[#e3e3e3]">{children}</h3>,
                                            code: ({ children }) => <code className="bg-[#1e1f20] px-1 py-0.5 rounded text-sm font-mono text-[#a8c7fa]">{children}</code>,
                                            pre: ({ children }) => <pre className="bg-[#1e1f20] p-3 rounded-lg overflow-x-auto mb-2 border border-[#444746]">{children}</pre>,
                                            strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                                            a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#a8c7fa] hover:underline">{children}</a>,
                                        }}
                                    >
                                        {message.content}
                                    </ReactMarkdown>
                                </div>

                                {/* Citations */}
                                {message.role === "assistant" && message.sources && message.sources.length > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {message.sources.map((source, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-2 bg-[#1e1f20] border border-[#444746] rounded-lg px-3 py-2 text-sm text-[#c4c7c5] hover:bg-[#333537] cursor-pointer transition-colors"
                                                title={source.content}
                                            >
                                                <FileText className="w-4 h-4 text-[#a8c7fa]" />
                                                <span className="truncate max-w-[150px]">{source.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Metrics */}
                                {message.role === "assistant" && message.metrics && (
                                    <div className="mt-2 flex items-center gap-4 text-xs text-[#8e918f] font-mono">
                                        <span title="Response Time">⏱️ {message.metrics.time}s</span>
                                        <span title="Total Tokens">🪙 {message.metrics.total_tokens} tokens</span>
                                        <span title="Estimated Cost">💰 ${message.metrics.cost}</span>
                                    </div>
                                )}

                                {/* Actions */}
                                {message.role === "assistant" && (
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() => handleCopy(message.content)}
                                            className="p-1.5 hover:bg-[#333537] rounded-full text-[#c4c7c5] transition-colors"
                                            title="Copy response"
                                        >
                                            <Copy className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))
                )}

                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-4 max-w-4xl mx-auto"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#4285f4] to-[#9b72cb] flex items-center justify-center shrink-0 animate-pulse">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-[#c4c7c5] rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <div className="w-2 h-2 bg-[#c4c7c5] rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <div className="w-2 h-2 bg-[#c4c7c5] rounded-full animate-bounce" />
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}
