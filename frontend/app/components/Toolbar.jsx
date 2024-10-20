import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faUnderline,
  faStrikethrough,
  faHeading,
  faList,
  faListOl,
  faQuoteLeft,
  faUndo,
  faRedo,
  faCode,
} from "@fortawesome/free-solid-svg-icons";

const Toolbar = ({ editor, content }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="px-4 py-3 rounded-tl-md rounded-tr-md justify-top justify-between items-start gap-5 w-full flex-wrap border border-gray-700">
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "bg-black text-white p-2 rounded-lg"
              : "text-black hover:bg-black hover:text-white p-1 hover:rounded-lg"
          }
        >
          <FontAwesomeIcon icon={faBold} />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "bg-black text-white p-2 rounded-lg"
              : "text-black hover:bg-black hover:text-white p-1 hover:rounded-lg"
          }
        >
          <FontAwesomeIcon icon={faItalic} />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "bg-black text-white p-2 rounded-lg"
              : "text-black hover:bg-black hover:text-white p-1 hover:rounded-lg"
          }
        >
          <FontAwesomeIcon icon={faUnderline} />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "bg-dblack text-white p-2 rounded-lg"
              : "text-black hover:bg-black hover:text-white p-1 hover:rounded-lg"
          }
        >
          <FontAwesomeIcon icon={faStrikethrough} />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-dblack text-white p-2 rounded-lg"
              : "text-black hover:bg-black hover:text-white p-1 hover:rounded-lg"
          }
        >
          <FontAwesomeIcon icon={faHeading} />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "bg-dblack text-white p-2 rounded-lg"
              : "text-black hover:bg-black hover:text-white p-1 hover:rounded-lg"
          }
        >
          <FontAwesomeIcon icon={faList} />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "bg-dblack text-white p-2 rounded-lg"
              : "text-black hover:bg-black hover:text-white p-1 hover:rounded-lg"
          }
        >
          <FontAwesomeIcon icon={faListOl} />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive("blockquote")
              ? "bg-black text-white p-2 rounded-lg"
              : "text-black hover:bg-black hover:text-white p-1 hover:rounded-lg"
          }
        >
          <FontAwesomeIcon icon={faQuoteLeft} />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setCode().run();
          }}
          className={
            editor.isActive("code")
              ? "bg-black text-white p-2 rounded-lg"
              : "text-black hover:bg-black hover:text-white p-1 hover:rounded-lg"
          }
        >
          <FontAwesomeIcon icon={faCode} />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? "bg-black text-white p-2 rounded-lg"
              : "text-black hover:bg-black hover:text-white p-1 hover:rounded-lg"
          }
        >
          <FontAwesomeIcon icon={faUndo} />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? "bg-black text-white p-2 rounded-lg"
              : "text-black hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
          }
        >
          <FontAwesomeIcon icon={faRedo} />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
