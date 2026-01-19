import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { OfflineBanner } from "@/components/OfflineBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://djrag.dilip.live"),
  title: {
    default: "DJ Rag | Enterprise-Grade RAG AI Chat",
    template: "%s | DJ Rag",
  },
  description: "Advanced Retrieval-Augmented Generation (RAG) platform powered by Google Gemini and Pinecone. Upload documents and chat with your data instantly.",
  keywords: ["RAG", "AI", "Chat", "Document Analysis", "PDF Chat", "Gemini", "Pinecone", "Vector Database", "Next.js", "FastAPI"],
  authors: [{ name: "Dilip Meghwal", url: "https://dilip.live" }],
  creator: "Dilip Meghwal",
  publisher: "Dilip Meghwal",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://djrag.dilip.live",
    title: "DJ Rag | Enterprise-Grade RAG AI Chat",
    description: "Chat with your documents using advanced AI. Powered by Google Gemini 2.5 Flash and Pinecone vector search.",
    siteName: "DJ Rag",
    images: [
      {
        url: "/djraglogo.png",
        width: 1200,
        height: 630,
        alt: "DJ Rag - Advanced RAG Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DJ Rag | Enterprise-Grade RAG AI Chat",
    description: "Chat with your documents using advanced AI. Powered by Google Gemini 2.5 Flash and Pinecone vector search.",
    images: ["/djraglogo.png"],
    creator: "@dilip_maurya",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/djraglogo.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <OfflineBanner />
        {children}
      </body>
    </html>
  );
}
