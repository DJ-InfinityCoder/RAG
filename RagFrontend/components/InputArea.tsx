import React, { useState, useRef } from "react";
import { Paperclip, Send, X, FileText, Clipboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { ingestText } from "@/lib/api";

interface InputAreaProps {
    onSendMessage: (message: string, files: File[]) => void;
    currentSessionId: string | null;
    onIngest?: () => void;
}

export function InputArea({ onSendMessage, currentSessionId, onIngest }: InputAreaProps) {
    const [input, setInput] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);
    const [pasteTitle, setPasteTitle] = useState("");
    const [pasteContent, setPasteContent] = useState("");
    const [isIngesting, setIsIngesting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSend = () => {
        if (input.trim() || files.length > 0) {
            onSendMessage(input, files);
            setInput("");
            setFiles([]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
        }
    };

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handlePasteSubmit = async () => {
        if (!pasteContent.trim() || !currentSessionId) return;

        setIsIngesting(true);
        try {
            await ingestText(currentSessionId, pasteContent, pasteTitle || "Pasted Text");
            setIsPasteModalOpen(false);
            setPasteTitle("");
            setPasteContent("");
            if (onIngest) onIngest();
        } catch (error) {
            console.error("Failed to ingest text:", error);
        } finally {
            setIsIngesting(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 relative">
            {/* Paste Modal */}
            {isPasteModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#1e1f20] rounded-2xl border border-[#444746] w-full max-w-lg p-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-[#e3e3e3]">Paste Text</h3>
                            <button onClick={() => setIsPasteModalOpen(false)} className="text-[#c4c7c5] hover:text-[#e3e3e3]">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Title (optional)"
                            value={pasteTitle}
                            onChange={(e) => setPasteTitle(e.target.value)}
                            className="w-full bg-[#131314] border border-[#444746] rounded-lg p-3 text-[#e3e3e3] focus:outline-none focus:border-[#a8c7fa]"
                        />
                        <textarea
                            placeholder="Paste your text here..."
                            value={pasteContent}
                            onChange={(e) => setPasteContent(e.target.value)}
                            className="w-full h-48 bg-[#131314] border border-[#444746] rounded-lg p-3 text-[#e3e3e3] resize-none focus:outline-none focus:border-[#a8c7fa]"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsPasteModalOpen(false)}
                                className="px-4 py-2 rounded-lg text-[#c4c7c5] hover:bg-[#333537]"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePasteSubmit}
                                disabled={isIngesting || !pasteContent.trim()}
                                className="px-4 py-2 rounded-lg bg-[#a8c7fa] text-[#004a77] font-medium hover:bg-[#8ab4f8] disabled:opacity-50"
                            >
                                {isIngesting ? "Ingesting..." : "Ingest Text"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="relative bg-[#1e1f20] rounded-2xl border border-[#444746] hover:border-[#7e7f80] transition-colors focus-within:border-[#a8c7fa] focus-within:ring-1 focus-within:ring-[#a8c7fa]">
                {/* File Preview */}
                {files.length > 0 && (
                    <div className="flex gap-2 p-3 overflow-x-auto">
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 bg-[#333537] px-3 py-1.5 rounded-lg text-sm text-[#e3e3e3]"
                            >
                                <FileText className="w-4 h-4 text-[#a8c7fa]" />
                                <span className="truncate max-w-[100px]">{file.name}</span>
                                <button
                                    onClick={() => removeFile(index)}
                                    className="hover:text-[#e3e3e3] text-[#c4c7c5]"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Text Input */}
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything..."
                    className="w-full bg-transparent text-[#e3e3e3] placeholder-[#c4c7c5] p-4 min-h-[60px] max-h-[200px] resize-none focus:outline-none text-base"
                    rows={1}
                />

                {/* Actions */}
                <div className="flex items-center justify-between p-2 pl-4">
                    <div className="flex gap-2">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="p-2 hover:bg-[#333537] rounded-full text-[#c4c7c5] hover:text-[#e3e3e3] transition-colors"
                            title="Upload file"
                        >
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setIsPasteModalOpen(true)}
                            className="p-2 hover:bg-[#333537] rounded-full text-[#c4c7c5] hover:text-[#e3e3e3] transition-colors"
                            title="Paste text"
                        >
                            <Clipboard className="w-5 h-5" />
                        </button>
                        <input
                            type="file"
                            multiple
                            accept=".pdf,.docx,.xlsx,.csv,.pptx,.txt"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                    </div>
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() && files.length === 0}
                        className={cn(
                            "p-2 rounded-full transition-all duration-200",
                            input.trim() || files.length > 0
                                ? "bg-[#e3e3e3] text-[#1e1f20] hover:bg-white"
                                : "bg-[#333537] text-[#7e7f80] cursor-not-allowed"
                        )}
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <div className="text-center mt-2 text-xs text-[#c4c7c5]">
                Gemini may display inaccurate info, including about people, so double-check its responses.
            </div>
        </div>
    );
}
