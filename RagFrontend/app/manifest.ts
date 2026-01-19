import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "DJ Rag - Enterprise RAG AI",
        short_name: "DJ Rag",
        description: "Advanced Retrieval-Augmented Generation (RAG) platform powered by Google Gemini and Pinecone.",
        start_url: "/",
        display: "standalone",
        background_color: "#131314",
        theme_color: "#131314",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
            {
                src: "/djraglogo.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/djraglogo.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
