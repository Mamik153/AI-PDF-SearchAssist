# AI PDF Search Assistant

An intelligent PDF search and question-answering application built with React, TypeScript, and AI-powered document processing. Upload PDF documents and ask natural language questions to get relevant answers with source citations.

## 🚀 Features

- **AI-Powered Search**: Upload PDFs and ask questions in natural language
- **Smart Document Processing**: Uses LangChain for efficient document chunking and indexing
- **Interactive Chat Interface**: Modern chat UI with typing indicators and smooth animations
- **Source Citations**: Get precise citations from your documents for each answer
- **Real-time Responses**: Streaming AI responses for faster interactions
- **Document Management**: Upload, process, and manage multiple PDF documents
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Routing**: TanStack Router with file-based routing
- **State Management**: TanStack Query for server state
- **Styling**: Tailwind CSS + shadcn/ui components
- **AI/ML**: AI SDK with Groq, LangChain for document processing
- **Backend**: Supabase for authentication and data storage
- **Build Tool**: Vite with SWC for fast development

## 📋 Prerequisites

- Node.js 18+ and pnpm (recommended) or npm
- Supabase account and project
- OpenAI API key or compatible API provider
- Groq API key

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd ai-pdf-searchassist
```

### 2. Install dependencies

```bash
pnpm install
# or
npm install
```

### 3. Environment Setup

Copy the example environment file and configure your variables:

```bash
cp .env.example .env
```

Fill in your environment variables in `.env`:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_API_KEY=your_supabase_anon_key
VITE_SUPABASE_BASE_URL=your_supabase_project_url

# OpenAI Configuration (If you want to update the logic and use LLM architecture from this project)
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_OPENAI_BASE_URL=https://api.openai.com/v1
```

### 4. Database Setup

Set up your Supabase database with the required tables and storage buckets. The application expects:
- Document storage for PDF files
- Vector embeddings for search functionality
- User authentication tables

### 5. Start Development Server

```bash
pnpm dev
# or
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ai-elements/    # AI-specific components (chat, messages, etc.)
│   ├── notebook/       # Chat and document interface components
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries and API clients
│   ├── utils/          # Document processing and AI utilities
│   └── supabaseClient.ts
├── routes/             # TanStack Router route definitions
├── types/              # TypeScript type definitions
└── interfaces/         # Interface definitions
```

## 🔧 Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint
- `pnpm preview` - Preview production build

## 📚 Key Features Explained

### Document Processing
- Upload PDF files through the intuitive interface
- Documents are processed using LangChain text splitters
- Content is embedded using OpenAI embeddings for semantic search

### AI Chat Interface
- Natural language questions about your documents
- Streaming responses for real-time interaction
- Source citations with page numbers and document references
- Chat history and session management

### Search & Retrieval
- Vector-based semantic search for accurate results
- Contextual understanding of queries
- Support for complex multi-document questions

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_API_KEY` | Supabase anonymous key | Yes |
| `VITE_SUPABASE_BASE_URL` | Supabase base URL (usually same as URL) | Yes |
| `VITE_OPENAI_API_KEY` | OpenAI API key for embeddings and chat | Yes |
| `VITE_OPENAI_BASE_URL` | OpenAI API base URL | Yes |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Hot Reload Issues
If you experience hot reload problems:
1. Make sure your `.env` file is properly configured
2. Restart the development server
3. Clear browser cache and storage

### PDF Processing Issues
- Ensure your Supabase storage is properly configured
- Check that your OpenAI API key has sufficient credits
- Verify document upload permissions

### Build Issues
- Run `pnpm clean` or delete `node_modules` and reinstall
- Check for TypeScript errors: `pnpm build`
- Ensure all environment variables are set

For more help, please open an issue on the repository.