import React, { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface FileUploadProps {
    onUpload: (file: File) => Promise<void>;
}

export default function FileUpload({ onUpload }: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragging(true);
        } else if (e.type === 'dragleave') {
            setIsDragging(false);
        }
    }, []);

    const handleDrop = useCallback(async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files[0]) {
            await processFile(files[0]);
        }
    }, []);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            await processFile(e.target.files[0]);
        }
    };

    const processFile = async (file: File) => {
        if (!file.name.endsWith('.pdf') && !file.name.endsWith('.docx')) {
            setStatus('error');
            setMessage('Only PDF and DOCX files are supported');
            return;
        }

        setIsUploading(true);
        setStatus('idle');
        setMessage('');

        try {
            await onUpload(file);
            setStatus('success');
            setMessage(`Successfully processed ${file.name}`);
        } catch (error) {
            setStatus('error');
            setMessage('Failed to upload file. Please try again.');
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="w-full">
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`
          relative group cursor-pointer
          border-2 border-dashed rounded-2xl p-8
          transition-all duration-300 ease-in-out
          flex flex-col items-center justify-center text-center
          ${isDragging
                        ? 'border-blue-500 bg-blue-500/10 scale-[1.02]'
                        : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
                    }
        `}
            >
                <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileSelect}
                    accept=".pdf,.docx"
                    disabled={isUploading}
                />

                <div className="z-10 flex flex-col items-center space-y-4">
                    <div className={`
            p-4 rounded-full transition-colors duration-300
            ${isUploading ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-700 text-gray-400 group-hover:bg-gray-600 group-hover:text-gray-300'}
          `}>
                        {isUploading ? (
                            <Loader2 className="w-8 h-8 animate-spin" />
                        ) : (
                            <Upload className="w-8 h-8" />
                        )}
                    </div>

                    <div>
                        <p className="text-lg font-medium text-gray-200">
                            {isUploading ? 'Processing Document...' : 'Drop your document here'}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                            Support for PDF and DOCX
                        </p>
                    </div>
                </div>
            </div>

            {status !== 'idle' && (
                <div className={`mt-4 p-4 rounded-xl flex items-center space-x-3 ${status === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                    {status === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <span className="text-sm font-medium">{message}</span>
                </div>
            )}
        </div>
    );
}
