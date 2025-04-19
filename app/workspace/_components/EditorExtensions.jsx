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
} from "lucide-react";

const EditorExtensions = ({ editor }) => {
  if (!editor) return null;

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
      </div>
    </div>
  );
};

export default EditorExtensions;
