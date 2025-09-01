"use client";

import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import EditorExtensions from "./EditorExtensions";
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import { useQueries, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, forwardRef, useImperativeHandle } from "react";

const TextEditor = forwardRef(({fileId}, ref) => {

  const notes = useQuery(api.notes.GetNotes, {
    fileId: fileId, // Replace with actual fileId
  });

  console.log("notes", notes);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'my-custom-bullet-list',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'my-custom-ordered-list',
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: 'my-custom-list-item',
        },
      }),
      Placeholder.configure({
        placeholder: "Start Taking Your Notes Here...",
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose prose-sm focus:outline-none min-h-screen p-5",
      },
    },
  });

  // Expose editor methods to parent component
  useImperativeHandle(ref, () => ({
    getContent: () => editor?.getHTML() || "",
    getEditor: () => editor
  }));

  useEffect(()=>{
    editor&&editor.commands.setContent(notes || "<p>Start Taking Your Notes Here...</p>");
  },[notes&&editor]);

  return (
    <div>
      <EditorExtensions editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
});

TextEditor.displayName = 'TextEditor';

export default TextEditor;
