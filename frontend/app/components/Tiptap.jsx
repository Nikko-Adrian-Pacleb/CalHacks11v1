import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import Toolbar from "./Toolbar";

const Tiptap = ({ content, onContentChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content, // Initialize editor with the content prop
    onUpdate: ({ editor }) => {
      // Send updated content as HTML string back to the parent component
      onContentChange(editor.getJSON(), editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "flex flex-col py-3 justify-start text-gray-400 items-start font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none text-cDarkBlack w-full", // Ensure full width
      },
    },
  });

  // If content changes in the parent, update the editor content
  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="flex flex-col justify-center align-center w-full">
      {" "}
      {/* Ensure full width */}
      <Toolbar editor={editor} content={content} />
      <EditorContent
        style={{ whiteSpace: "pre-line" }}
        editor={editor}
        className="w-full"
      />{" "}
      {/* Full width for editor content */}
    </div>
  );
};

export default Tiptap;
