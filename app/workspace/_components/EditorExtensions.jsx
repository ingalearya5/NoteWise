"use client";
import React from "react";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sparkles,
} from "lucide-react";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { chatSession } from "@/configs/AImodels";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

const EditorExtensions = ({ editor }) => {
  if (!editor) return null;

  const { fileId } = useParams();
  const { user } = useUser();
  const SearchAI = useAction(api.myActions.search);
  const SaveNotes = useMutation(api.notes.AddNotes);

  const onAiClick = async () => {
    toast("AI is thinking...");
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );
    console.log("Selected text:", selectedText);

    try {
      const result = await SearchAI({
        query: selectedText,
        fileId: fileId,
      });

      const UnformattedAns = JSON.parse(result);
      
      // Check if we have any results
      if (!UnformattedAns || UnformattedAns.length === 0) {
        toast.error("No relevant content found in the PDF");
        return;
      }

      console.log(`Retrieved ${UnformattedAns.length} chunks from PDF`);

      // Collect content from chunks - keep it clean and direct
      let ans = "";
      UnformattedAns.forEach((item) => {
        ans += item.pageContent + "\n\n";
      });

      // Check if we have substantial content
      if (ans.trim().length < 100) {
        toast.error("Not enough relevant content found in the PDF for this query");
        return;
      }

      console.log(`Total content length: ${ans.length} characters`);

      // Prompt that focuses on direct PDF content without AI expansion
      const PROMPT = `You are a PDF content formatter. Your ONLY job is to present the exact information from the PDF.

QUESTION: "${selectedText}"

PDF CONTENT (${UnformattedAns.length} sections):
${ans}

STRICT INSTRUCTIONS:
1. Present ONLY the information that is directly in the PDF content above
2. DO NOT add explanations, interpretations, or external knowledge
3. DO NOT expand, elaborate, or infer anything beyond what's written
4. Your role is to FORMAT and ORGANIZE the existing PDF text, not to generate new content
5. If the PDF content doesn't answer the question, say: "The PDF does not contain information about this topic."
6. Simply present the relevant parts of the PDF content in a clean, readable format
7. Use basic HTML formatting:
   - <p> for paragraphs
   - <strong> for emphasis on key terms already emphasized in the PDF
   - <ul> and <li> only if the PDF content is already in list format
8. DO NOT include markdown or code blocks
9. Keep it direct and factual - just the PDF content, nothing more

Present the PDF content in clean HTML format:`;

      const AiModelResult = await chatSession.sendMessage(PROMPT);

      console.log("AI Model Result:", AiModelResult.response.text());

      const FinalAns = AiModelResult.response
        .text()
        .replace(/```html/g, "")
        .replace(/```/g, "")
        .trim();

      // Check if AI couldn't find relevant information
      if (
        FinalAns.toLowerCase().includes("does not contain sufficient information") ||
        FinalAns.toLowerCase().includes("cannot find relevant information")
      ) {
        toast.error("The PDF content doesn't adequately address this question");
        editor.commands.setContent(
          editor.getHTML() +
            `<p><strong>Question:</strong> ${selectedText}</p>` +
            `<p><strong>Answer:</strong> <em>${FinalAns}</em></p>`
        );
      } else {
        toast.success("Answer generated successfully!");
        const AllText = editor.getHTML();
        editor.commands.setContent(
          AllText +
            `<div style="margin: 20px 0; padding: 15px; border-left: 4px solid #3b82f6; background-color: #f0f9ff;">` +
            `<p><strong style="color: #1e40af; font-size: 1.1em;">Question:</strong> ${selectedText}</p>` +
            `<div style="margin-top: 10px;"><strong style="color: #1e40af;">Answer:</strong></div>` +
            `<div style="margin-top: 8px;">${FinalAns}</div>` +
            `</div>`
        );
      }

      SaveNotes({
        notes: editor.getHTML(),
        fileId: fileId,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
    } catch (error) {
      console.error("Error in AI processing:", error);
      toast.error("Failed to generate answer. Please try again.");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive("heading", { level: 1 })
              ? "text-blue-500 bg-blue-50"
              : "text-gray-700"
          }`}
          title="Heading 1"
        >
          <Heading1 size={18} />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive("heading", { level: 2 })
              ? "text-blue-500 bg-blue-50"
              : "text-gray-700"
          }`}
          title="Heading 2"
        >
          <Heading2 size={18} />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive("heading", { level: 3 })
              ? "text-blue-500 bg-blue-50"
              : "text-gray-700"
          }`}
          title="Heading 3"
        >
          <Heading3 size={18} />
        </button>

        <div className="h-6 w-px bg-gray-300 mx-1"></div>

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive("bold")
              ? "text-blue-500 bg-blue-50"
              : "text-gray-700"
          }`}
          title="Bold"
        >
          <Bold size={18} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive("italic")
              ? "text-blue-500 bg-blue-50"
              : "text-gray-700"
          }`}
          title="Italic"
        >
          <Italic size={18} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive("underline")
              ? "text-blue-500 bg-blue-50"
              : "text-gray-700"
          }`}
          title="Underline"
        >
          <Underline size={18} />
        </button>

        <div className="h-6 w-px bg-gray-300 mx-1"></div>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive("orderedList")
              ? "text-blue-500 bg-blue-50"
              : "text-gray-700"
          }`}
          title="Numbered List"
        >
          <ListOrdered size={18} />
        </button>

        <button
          onClick={() => {
            editor.chain().focus().toggleBulletList().run();
          }}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive("bulletList")
              ? "text-blue-500 bg-blue-50"
              : "text-gray-700"
          }`}
          title="Bullet List"
        >
          <List size={18} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive("highlight")
              ? "text-blue-500 bg-blue-50"
              : "text-gray-700"
          }`}
          title="Highlight"
        >
          <Highlighter size={18} />
        </button>

        <div className="h-6 w-px bg-gray-300 mx-1"></div>

        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive({ textAlign: "left" })
              ? "text-blue-500 bg-blue-50"
              : "text-gray-700"
          }`}
          title="Align Left"
        >
          <AlignLeft size={18} />
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive({ textAlign: "center" })
              ? "text-blue-500 bg-blue-50"
              : "text-gray-700"
          }`}
          title="Align Center"
        >
          <AlignCenter size={18} />
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive({ textAlign: "right" })
              ? "text-blue-500 bg-blue-50"
              : "text-gray-700"
          }`}
          title="Align Right"
        >
          <AlignRight size={18} />
        </button>

        <div className="h-6 w-px bg-gray-300 mx-1"></div>

        <button
          onClick={() => onAiClick()}
          className="p-2 rounded hover:bg-gray-100 transition-colors text-gray-700"
          title="AI Assistance"
        >
          <Sparkles />
        </button>
      </div>
    </div>
  );
};

export default EditorExtensions;