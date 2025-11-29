import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DJ RAG - AI-Powered Document Chat",
    template: "%s | DJ RAG"
  },
  description: "Upload your documents and chat with them using AI. DJ RAG helps you extract insights from PDFs and DOCX files through intelligent conversation.",
  keywords: ["AI", "RAG", "Document Chat", "PDF Chat", "AI Assistant", "Document Analysis"],
  authors: [{ name: "DJ RAG" }],
  creator: "DJ RAG",
  publisher: "DJ RAG",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "DJ RAG - AI-Powered Document Chat",
    description: "Upload your documents and chat with them using AI",
    siteName: "DJ RAG",
  },
  twitter: {
    card: "summary_large_image",
    title: "DJ RAG - AI-Powered Document Chat",
    description: "Upload your documents and chat with them using AI",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
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
        {children}
      </body>
    </html>
  );
}
