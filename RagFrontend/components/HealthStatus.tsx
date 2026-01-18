"use client";

import React, { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { RefreshCw } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export function HealthStatus() {
    const [isOnline, setIsOnline] = useState<boolean | null>(null);
    const [isChecking, setIsChecking] = useState(false);

    const checkHealth = useCallback(async () => {
        setIsChecking(true);
        try {
            const response = await fetch(`${API_BASE_URL}/health`);
            if (response.ok) {
                setIsOnline(true);
            } else {
                setIsOnline(false);
            }
        } catch (error) {
            setIsOnline(false);
        } finally {
            // Add a small delay to show the animation
            setTimeout(() => setIsChecking(false), 500);
        }
    }, []);

    useEffect(() => {
        // Check immediately
        checkHealth();

        // Poll every 30 seconds
        const interval = setInterval(checkHealth, 30000);

        return () => clearInterval(interval);
    }, [checkHealth]);

    if (isOnline === null) return null; // Loading state

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1e1f20] border border-[#444746]">
            <div className={cn("w-2 h-2 rounded-full", isOnline ? "bg-green-500" : "bg-red-500")} />
            <span className="text-xs font-medium text-[#c4c7c5]">
                {isOnline ? "System Operational" : "System Offline"}
            </span>
            <button
                onClick={checkHealth}
                disabled={isChecking}
                className="ml-1 p-1 hover:bg-[#333537] rounded-full transition-colors disabled:opacity-50"
                title="Check Health"
            >
                <RefreshCw className={cn("w-3 h-3 text-[#a8c7fa]", isChecking && "animate-spin")} />
            </button>
        </div>
    );
}
