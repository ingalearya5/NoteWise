"use client";
import { api } from "@/convex/_generated/api";
import {  useUser } from "@clerk/nextjs";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { useMutation } from "convex/react";
import { useEffect } from "react";
import { 
  BookOpen, 
  FileText, 
  Brain, 
  MessageSquare, 
  Upload, 
  Sparkles 
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    user && checkUser();
  }, [user]);

  const checkUser = async () => {
    const result = await createUser({
      email: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      imageUrl: user?.imageUrl,
    });
    console.log(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-8 h-8 text-blue-600" />
          <span className="text-2xl font-bold text-blue-600">NoteWise</span>
        </div>
        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 text-blue-600 font-medium hover:text-blue-700 transition-colors">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transform Your Notes with{" "}
            <span className="text-blue-600">AI-Powered</span> Intelligence
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            Upload your PDF notes, ask questions, and get instant answers. 
            Take smart notes with the power of artificial intelligence.
          </p>
          <button onClick={() => router.push("/dashboard")} className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold cursor-pointer hover:bg-blue-700 transition-colors">
          {user ? "Go to Dashboard" : "Get Started"}
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Upload PDFs</h3>
            <p className="text-gray-600">
              Easily upload your PDF notes and documents to our platform
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Ask Questions</h3>
            <p className="text-gray-600">
              Get instant answers to your questions about your notes
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Notes</h3>
            <p className="text-gray-600">
              Take intelligent notes with AI-powered suggestions
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Upload</h3>
            <p className="text-gray-600">Upload your PDF notes</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Take Notes</h3>
            <p className="text-gray-600">Create and organize your notes</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Interact</h3>
            <p className="text-gray-600">Ask questions and get AI-powered answers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
