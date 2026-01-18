import useSWR from "swr";
import { Session, Message, API_BASE_URL } from "./api";

const fetcher = (url: string) => fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
});

export function useSessions() {
    const { data, error, isLoading, mutate } = useSWR<Session[]>(
        `${API_BASE_URL}/sessions`,
        fetcher
    );

    return {
        sessions: data || [],
        isLoading,
        isError: error,
        mutate,
    };
}

export function useMessages(sessionId: string | null) {
    const { data, error, isLoading, mutate } = useSWR<Message[]>(
        sessionId ? `${API_BASE_URL}/sessions/${sessionId}/messages` : null,
        fetcher
    );

    return {
        messages: data || [],
        isLoading,
        isError: error,
        mutate,
    };
}
