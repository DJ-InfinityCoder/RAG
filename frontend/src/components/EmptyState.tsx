import React, { useState, useRef } from 'react';
import { Upload, FileText, File, FileSpreadsheet, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface EmptyStateProps {
    onFileUpload: (file: File) => Promise<void>;
    isUploading: boolean;
}

export default function EmptyState({ onFileUpload, isUploading }: EmptyStateProps) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            await validateAndUpload(files[0]);
        }
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            await validateAndUpload(e.target.files[0]);
        }
    };

    const validateAndUpload = async (file: File) => {
        const validTypes = ['.pdf', '.docx', '.xlsx', '.csv'];
        const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

        if (validTypes.includes(fileExtension)) {
            await onFileUpload(file);
        } else {
            alert('Please upload a PDF, DOCX, Excel, or CSV file');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-[#131314]">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl w-full"
            >
                <div className="mb-8 relative">
                    <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full opacity-50"></div>
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="relative w-24 h-24 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-900/30"
                    >
                        <Sparkles className="w-12 h-12 text-white" />
                    </motion.div>
                </div>

                <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                        DJ RAG
                    </span>
                </h1>
                <p className="text-gray-400 text-lg mb-12 max-w-md mx-auto leading-relaxed">
                    Upload your documents and start a conversation. AI-powered insights at your fingertips.
                </p>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                        "relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 bg-[#1E1F20]",
                        isDragging
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-gray-700 hover:border-gray-600 hover:bg-[#252628]"
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <div className="p-10 flex flex-col items-center gap-4">
                        <div className="p-4 rounded-full bg-gray-800/50 group-hover:bg-gray-700/50 transition-colors">
                            {isUploading ? (
                                <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                            ) : (
                                <Upload className="w-8 h-8 text-gray-400 group-hover:text-blue-400 transition-colors" />
                            )}
                        </div>

                        <div className="space-y-2">
                            <p className="text-lg font-medium text-gray-200">
                                {isUploading ? "Processing..." : "Drop files here or click to upload"}
                            </p>
                            <p className="text-sm text-gray-500">
                                Supports PDF, DOCX, Excel, and CSV
                            </p>
                        </div>

                        <div className="flex gap-3 mt-4 opacity-50 group-hover:opacity-100 transition-opacity">
                            <FileText size={20} className="text-red-400" />
                            <File size={20} className="text-blue-400" />
                            <FileSpreadsheet size={20} className="text-green-400" />
                        </div>
                    </div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        className="hidden"
                        accept=".pdf,.docx,.xlsx,.csv"
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}
