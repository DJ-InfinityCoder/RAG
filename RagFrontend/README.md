# DJ Rag Frontend

The modern, responsive frontend for the DJ Rag application, built with Next.js 16 and Tailwind CSS.

[**🚀 Live Demo**](https://djrag.dilip.live) | [**📂 GitHub Repository**](https://github.com/DJ-InfinityCoder/RagFrontend)

## 🏗️ Architecture

The application follows the Next.js App Router architecture:

- **`app/`**: Application routes and pages.
- **`components/`**: Reusable UI components (ChatInterface, Sidebar, etc.).
- **`lib/`**: Utility functions, API clients, and hooks.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Fetching**: [SWR](https://swr.vercel.app/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## ✨ Features

- **Chat Interface**: Real-time chat with streaming responses.
- **File Upload**: Support for PDF, DOCX, PPTX, CSV, Excel, and TXT files.
- **Sidebar**: Manage chat sessions, create new chats, and delete history.
- **Settings**: "Clear All Chats" functionality and app information.
- **Responsive Design**: Optimized for both desktop and mobile.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- NPM or Yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/dj-rag.git
    cd dj-rag/RagFrontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables (`.env.local`):
    ```env
    NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## 👨‍💻 Author

**Dilip**

- [Portfolio](https://dilip.live)
- [LinkedIn](https://www.linkedin.com/in/dilip-maurya-58252a236/)
- [Resume](https://drive.google.com/file/d/1sjZU4XBlfpP_mToazGgdlv-J-odBw7pd/view)
