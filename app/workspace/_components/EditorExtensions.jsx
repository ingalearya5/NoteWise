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

    const result = await SearchAI({
      query: selectedText,
      fileId: fileId,
    });

    const UnformattedAns = JSON.parse(result);
    let ans = "";
    UnformattedAns &&
      UnformattedAns.forEach((item) => {
        ans = ans + item.pageContent;
      });

    const PROMPT =
      "For Question :" +
      selectedText +
      " and with the given content as answer," +
      "please give appropriate answer in HTML format. The answer content is - " +
      ans;

    const AiModelResult = await chatSession.sendMessage(PROMPT);

    console.log("AI Model Result:", AiModelResult.response.text());

    const FinalAns = AiModelResult.response
      .text()
      .replace("```", "")
      .replace("html", "")
      .replace("```", "");

    const AllTExt = editor.getHTML();

    editor.commands.setContent(
      AllTExt + "<p>  <strong>Answer : </strong>" + FinalAns + "</p>"
    );

    SaveNotes({
      notes: editor.getHTML(),
      fileId: fileId,
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });
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
