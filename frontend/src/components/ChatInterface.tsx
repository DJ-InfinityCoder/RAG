import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInterface({ messages, onSendMessage, isLoading }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const CopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-lg bg-gray-800/80 hover:bg-gray-700 text-gray-400 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-105 backdrop-blur-sm border border-gray-700/50"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full relative bg-gradient-to-b from-[#0f1014] via-[#131318] to-[#0f1014] text-gray-100">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700/50 scrollbar-track-transparent">
        <div className="flex flex-col pb-40 pt-10 max-w-4xl mx-auto px-4 w-full">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-3xl rounded-full animate-pulse" />
                <div className="relative w-24 h-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-900/30 rotate-6 hover:rotate-0 transition-transform duration-300">
                  <Sparkles className="w-12 h-12 text-white" strokeWidth={2.5} />
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="space-y-3"
              >
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Ready to explore your document?
                </h2>
                <p className="text-gray-400 max-w-md mx-auto text-lg leading-relaxed">
                  Ask questions, extract insights, or summarize key points. I'm here to help you analyze your file.
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl"
              >
                {[
                  "Summarize this document",
                  "What are the key findings?",
                  "List the main topics",
                  "Explain the methodology"
                ].map((question, i) => (
                  <motion.button
                    key={i}
                    onClick={() => onSendMessage(question)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-5 text-left bg-gradient-to-br from-[#1a1b26] to-[#1e1f2a] hover:from-[#1e1f2a] hover:to-[#24252f] border border-gray-800/50 hover:border-purple-500/30 rounded-2xl transition-all duration-300 group shadow-lg hover:shadow-purple-900/20"
                  >
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 group-hover:bg-purple-400" />
                      {question}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "w-full mb-8 group",
                    msg.role === 'user' ? "flex justify-end" : "flex justify-start"
                  )}
                >
                  <div className={cn(
                    "flex gap-4 max-w-[85%]",
                    msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                  )}>
                    {/* Avatar */}
                    <div className="flex-shrink-0 mt-1">
                      <div className={cn(
                        "relative w-9 h-9 rounded-xl flex items-center justify-center shadow-xl transition-all duration-300",
                        msg.role === 'user'
                          ? "bg-gradient-to-br from-blue-500 to-purple-600 shadow-blue-500/30"
                          : "bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 shadow-emerald-500/30"
                      )}>
                        {msg.role === 'assistant' && (
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl blur opacity-30 animate-pulse" />
                        )}
                        {msg.role === 'user' ?
                          <User size={18} className="text-white relative z-10" strokeWidth={2.5} /> :
                          <Sparkles size={18} className="text-white relative z-10" strokeWidth={2.5} />
                        }
                      </div>
                    </div>

                    {/* Message Content */}
                    <div className={cn(
                      "relative rounded-2xl shadow-lg transition-all duration-300",
                      msg.role === 'user'
                        ? "bg-gradient-to-br from-blue-600/90 to-purple-600/90 text-white px-6 py-4 rounded-tr-md border border-blue-500/20 shadow-blue-900/30"
                        : "bg-transparent text-gray-100 px-0 py-0 shadow-none"
                    )}>
                      {msg.role === 'user' && (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-2xl blur-sm -z-10" />
                      )}
                      <div className="prose prose-invert max-w-none leading-7">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            code({ node, inline, className, children, ...props }: any) {
                              const match = /language-(\w+)/.exec(className || '')
                              return !inline && match ? (
                                <div className="relative group my-4 rounded-xl overflow-hidden border border-gray-700/50 shadow-lg">
                                  <div className="flex items-center justify-between px-4 py-2 bg-[#1a1b26] border-b border-gray-700/50">
                                    <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">{match[1]}</span>
                                    <CopyButton text={String(children).replace(/\n$/, '')} />
                                  </div>
                                  <SyntaxHighlighter
                                    {...props}
                                    style={vscDarkPlus}
                                    language={match[1]}
                                    PreTag="div"
                                    className="!bg-[#1a1b26] !p-4 !m-0 !rounded-none"
                                  >
                                    {String(children).replace(/\n$/, '')}
                                  </SyntaxHighlighter>
                                </div>
                              ) : (
                                <code {...props} className="bg-gray-800/70 px-2 py-0.5 rounded-md text-sm font-mono text-pink-400 border border-gray-700/40">
                                  {children}
                                </code>
                              )
                            },
                            p({ children }) {
                              return <p className="mb-4 last:mb-0">{children}</p>
                            },
                            ul({ children }) {
                              return <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
                            },
                            ol({ children }) {
                              return <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
                            },
                            li({ children }) {
                              return <li className="pl-1">{children}</li>
                            },
                            a({ href, children }) {
                              return <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">{children}</a>
                            },
                            table({ children }) {
                              return <div className="overflow-x-auto my-4 rounded-xl border border-gray-700/50 shadow-lg"><table className="min-w-full divide-y divide-gray-700">{children}</table></div>
                            },
                            th({ children }) {
                              return <th className="px-4 py-3 bg-gray-800/70 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">{children}</th>
                            },
                            td({ children }) {
                              return <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300 border-t border-gray-700/30">{children}</td>
                            }
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start w-full mb-8"
            >
              <div className="flex gap-4 max-w-[85%]">
                <div className="flex-shrink-0 mt-1">
                  <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 flex items-center justify-center shadow-xl shadow-emerald-500/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl blur opacity-40 animate-pulse" />
                    <Sparkles size={18} className="text-white relative z-10 animate-pulse" strokeWidth={2.5} />
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-400 mt-2 bg-gray-800/30 px-4 py-3 rounded-2xl border border-gray-700/30 backdrop-blur-sm">
                  <Loader2 className="animate-spin text-emerald-400" size={18} />
                  <span className="text-sm font-medium bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Thinking...</span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#0f1014] via-[#131318]/95 to-transparent pt-24 pb-8 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative group"
          >
            {/* Enhanced gradient glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-[2rem] opacity-0 group-hover:opacity-20 group-focus-within:opacity-25 transition-opacity duration-500 blur-xl" />

            <form
              onSubmit={handleSubmit}
              className="relative flex items-end gap-3 p-3 bg-gradient-to-br from-[#1a1b26]/95 to-[#1e1f2a]/95 rounded-[1.75rem] shadow-2xl border border-gray-700/50 focus-within:border-purple-500/30 transition-all duration-300 backdrop-blur-xl"
            >
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything..."
                className="flex-1 bg-transparent text-white placeholder-gray-500 border-none focus-visible:ring-0 resize-none max-h-[200px] py-3.5 px-4 min-h-[48px] scrollbar-thin scrollbar-thumb-gray-600 text-base leading-relaxed"
                rows={1}
              />

              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                size="icon"
                className={cn(
                  "h-11 w-11 rounded-full mb-0.5 transition-all duration-300 shadow-lg",
                  input.trim()
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
                    : "bg-gray-800/50 text-gray-500 hover:bg-gray-700/50 shadow-none"
                )}
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              </Button>
            </form>
          </motion.div>
          <p className="text-center text-xs text-gray-500 mt-4 font-medium">
            DJ RAG can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
}
