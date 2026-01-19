"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { RefreshCw } from "lucide-react";
import { useHealthCheck } from "@/lib/useHealthCheck";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export function HealthStatus() {
    const { isOnline, isChecking } = useHealthCheck();

    return (
        <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1e1f20] border border-[#444746]"
            title={isOnline === false ? "Backend is offline. Run 'python main.py' in RagBackend folder." : "System Status"}
        >
            <div className={cn(
                "w-2 h-2 rounded-full",
                isOnline === null ? "bg-gray-500" : isOnline ? "bg-green-500" : "bg-red-500 animate-pulse"
            )} />
            <span className="text-xs font-medium text-[#c4c7c5]">
                {isOnline === null ? "Checking System..." : isOnline ? "System Operational" : "System Offline"}
            </span>
            <button
                onClick={() => window.open(API_BASE_URL, "_blank")}
                className="ml-1 p-1 hover:bg-[#333537] rounded-full transition-colors"
                title="Open Backend URL"
            >
                <RefreshCw className={cn("w-3 h-3 text-[#a8c7fa]", isChecking && "animate-spin")} />
            </button>
        </div>
    );
}
