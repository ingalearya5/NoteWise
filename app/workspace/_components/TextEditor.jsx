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

function TextEditor() {
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

  return (
    <div>
      < EditorExtensions editor={editor} />
      <div className="overflow-scroll h-[88vh]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default TextEditor;
