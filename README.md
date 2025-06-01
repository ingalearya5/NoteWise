# AI PDF Notes SaaS 📚🤖

A full-stack AI-powered PDF note-taking SaaS application that transforms how you interact with documents. Upload PDFs, get AI-generated notes, and ask questions about your documents with semantic search capabilities.



## ✨ Features

### 🔐 Authentication & User Management
- **Secure Authentication** with Clerk (social login + email/password)
- User profiles and session management
- Protected routes and role-based access

### 📄 PDF Processing & AI Integration
- **Smart PDF Upload** with drag-and-drop interface
- **AI-Powered Note Generation** using LangChain and Gemini API
- **Semantic Search** within PDF documents
- **Interactive Q&A** - Ask questions about your PDFs and get intelligent answers
- PDF embedding pipeline for enhanced search capabilities

### 📝 Note Management
- **Real-time Note Editor** with live saving
- **Text Highlighting** and annotation tools
- **Export Functionality** - Download or copy notes
- Organized note storage with easy retrieval

### 💳 Monetization & Payments
- **Integrated Payment Gateway** with PayPal
- **Freemium Model** - Free and paid subscription plans
- Usage tracking and plan management
- Secure payment processing

### 🚀 Performance & Scalability
- **Real-time Database** with Convex DB
- **Cloud Deployment** for high availability
- Optimized for performance and scalability
- Responsive design for all devices

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 14, React 18, Tailwind CSS |
| **Backend** | Next.js API Routes, Convex DB |
| **AI/ML** | LangChain, Google Gemini API |
| **Authentication** | Clerk |
| **Database** | Convex (Real-time) |
| **Payments** | PayPal Integration |
| **Deployment** | Vercel|

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Git
- Accounts for: Clerk, Convex, Google AI Studio, PayPal Developer

### Environment Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ai-pdf-notes-saas.git
cd ai-pdf-notes-saas
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Convex Database
NEXT_PUBLIC_CONVEX_URL=your_convex_url
CONVEX_DEPLOY_KEY=your_convex_deploy_key

# Google Gemini API
GOOGLE_API_KEY=your_gemini_api_key

# PayPal
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret

# Other configurations
NEXT_PUBLIC_MAX_FREE_UPLOADS=3
```

4. **Set up Convex**
```bash
npx convex dev
```

5. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.


## 🔧 Configuration

### Clerk Authentication Setup
1. Create a Clerk application
2. Configure social providers (Google, GitHub, etc.)
3. Set up email/password authentication
4. Add webhook endpoints for user management

### Convex Database Setup
1. Create a new Convex project
2. Deploy the database schema
3. Configure real-time subscriptions
4. Set up file storage for PDFs

### Google Gemini API Setup
1. Create a Google AI Studio project
2. Enable the Gemini API
3. Generate an API key
4. Configure rate limits and quotas

### PayPal Integration Setup
1. Create PayPal Developer account
2. Set up sandbox/production applications
3. Configure webhook endpoints
4. Test payment flows

## 🎯 Usage

### For Users
1. **Sign Up/Login** using email or social providers
2. **Upload PDFs** via drag-and-drop or file selection
3. **Generate AI Notes** automatically from PDF content
4. **Ask Questions** about your documents using natural language
5. **Edit and Organize** notes with the built-in editor
6. **Export Notes** in various formats
7. **Upgrade Plans** for additional features

### For Developers
- Extend AI capabilities by modifying LangChain configurations
- Add new PDF processing features
- Customize the note editor functionality
- Integrate additional payment providers
- Scale with Convex's real-time infrastructure

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy with automatic CI/CD

### Manual Deployment
```bash
npm run build
npm start
```





## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Clerk](https://clerk.com/) for seamless authentication
- [Convex](https://convex.dev/) for real-time database capabilities
- [LangChain](https://langchain.com/) for AI integration
- [Google Gemini](https://ai.google.dev/) for powerful AI capabilities
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

