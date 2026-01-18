import React, { useState } from "react";
import { Modal } from "./ui/Modal";
import { Trash2, Info, Loader2 } from "lucide-react";

interface SettingsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onDeleteAllSessions: () => Promise<void>;
}

export function SettingsDialog({ isOpen, onClose, onDeleteAllSessions }: SettingsDialogProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteAll = async () => {
        if (confirm("Are you sure you want to delete ALL chat history? This action cannot be undone.")) {
            setIsDeleting(true);
            try {
                await onDeleteAllSessions();
                onClose();
            } catch (error) {
                console.error("Failed to delete all sessions:", error);
            } finally {
                setIsDeleting(false);
            }
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Settings">
            <div className="space-y-6">
                {/* About Section */}
                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-[#c4c7c5] flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        About
                    </h3>
                    <div className="p-4 bg-[#1a1a1c] rounded-lg border border-[#444746]">
                        <p className="text-[#e3e3e3] font-medium">DJ Rag</p>
                        <p className="text-sm text-[#c4c7c5] mt-1">
                            Your intelligent document assistant powered by RAG technology.
                        </p>
                        <p className="text-xs text-[#8e918f] mt-2">Version 1.0.0</p>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-[#ffb4ab] flex items-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        Danger Zone
                    </h3>
                    <div className="p-4 bg-[#2c1517] rounded-lg border border-[#8c1d18]">
                        <p className="text-[#ffb4ab] text-sm mb-3">
                            Permanently delete all chat sessions and history.
                        </p>
                        <button
                            onClick={handleDeleteAll}
                            disabled={isDeleting}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#8c1d18] hover:bg-[#601410] text-[#ffb4ab] rounded-full transition-colors text-sm font-medium disabled:opacity-50"
                        >
                            {isDeleting ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Trash2 className="w-4 h-4" />
                            )}
                            <span>{isDeleting ? "Deleting..." : "Clear All Chats"}</span>
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
