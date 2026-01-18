export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export interface Session {
    id: string;
    title: string;
    file_name: string | null;
    created_at: string;
}

export interface Metrics {
    time: number;
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
    cost: number;
}

export interface Message {
    id: number;
    role: "user" | "assistant";
    content: string;
    sources: Source[] | null;
    metrics?: Metrics;
    created_at: string;
}

export interface Source {
    id: number;
    title: string;
    content: string;
    metadata: Record<string, unknown>;
}

export interface ChatResponse {
    answer: string;
    sources: Source[];
    metrics?: Metrics;
}

export async function createSession(title: string = "New Chat"): Promise<Session> {
    const response = await fetch(`${API_BASE_URL}/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
    });
    if (!response.ok) throw new Error("Failed to create session");
    return response.json();
}

export async function getSessions(): Promise<Session[]> {
    const response = await fetch(`${API_BASE_URL}/sessions`);
    if (!response.ok) throw new Error("Failed to fetch sessions");
    return response.json();
}

export async function getMessages(sessionId: string): Promise<Message[]> {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/messages`);
    if (!response.ok) throw new Error("Failed to fetch messages");
    return response.json();
}

export async function sendMessage(sessionId: string, question: string): Promise<ChatResponse> {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
    });
    if (!response.ok) throw new Error("Failed to send message");
    return response.json();
}

export async function uploadFile(sessionId: string, file: File): Promise<unknown> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/upload`, {
        method: "POST",
        body: formData,
    });
    if (!response.ok) throw new Error("Failed to upload file");
    return response.json();
}

export async function ingestText(sessionId: string, text: string, title: string): Promise<unknown> {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/ingest_text`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, title }),
    });
    if (!response.ok) throw new Error("Failed to ingest text");
    return response.json();
}

export async function deleteSession(sessionId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete session");
}

export async function deleteAllSessions(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/sessions`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete all sessions");
}


