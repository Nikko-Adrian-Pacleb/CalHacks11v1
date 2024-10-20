"use client";
import { useState } from "react";
import Tiptap from "../components/Tiptap";
import { marked } from "marked";

export default function Home() {
  const [notes, setNotes] = useState([
    {
      noteId: 0,
      title: "Note Title",
      content: "I hope this content is not deleted",
      htmlContent: "",
    },
    {
      noteId: 1,
      title: "Title 2",
      content: marked("# This should be a header"),
      htmlContent: "",
    },
  ]);

  const [currentNote, setCurrentNote] = useState(notes[0]);
  const [isEditing, setIsEditing] = useState(true); // Keep this true to allow immediate editing after creation
  const [summary, setSummary] = useState(""); // New state for storing the summary
  const [loading, setLoading] = useState(false); // Loading state

  // Function to handle content updates from the Tiptap editor
  const handleContentChange = (updatedContent, updatedHtmlContent) => {
    setCurrentNote((prevNote) => ({
      ...prevNote,
      content: updatedContent,
      htmlContent: updatedHtmlContent,
    }));
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.noteId === currentNote.noteId
          ? {
              ...note,
              content: updatedContent,
              htmlContent: updatedHtmlContent,
            }
          : note
      )
    );
  };

  const addNewNote = () => {
    const newNoteId = notes.length; // This generates a new note ID based on the length of the notes array
    const newNote = {
      noteId: newNoteId,
      title: `New Note ${newNoteId + 1}`, // Automatically generated title
      content: "",
    };
    setNotes([...notes, newNote]); // Add the new note to the notes array
    setCurrentNote(newNote); // Set the new note as the current note
    setIsEditing(true); // Set editing mode to true to allow title editing
  };

  // Function to generate the summary using the API
  const generateSummary = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/getSummary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentNote), // Wrap HTML in a JSON object
      });

      const data = await response.json();
      if (data.output) {
        setSummary(data.output); // Set the summary
      } else {
        setSummary("Failed to generate summary");
      }
    } catch (error) {
      setSummary("Error generating summary");
      console.error("Error:", error);
    }
    setLoading(false);
  };

  // Handle title change
  const handleTitleChange = (e) => {
    const updatedTitle = e.target.value; // Get the updated title from the input field
    setCurrentNote((prevNote) => ({
      ...prevNote,
      title: updatedTitle, // Update the current note title
    }));
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.noteId === currentNote.noteId
          ? { ...note, title: updatedTitle } // Update the note title in the notes array
          : note
      )
    );
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-blue-900 text-white w-1/4 p-4">
        <div className="rounded-full bg-gray-300 w-16 h-16 mb-6"></div>
        <ul className="space-y-4">
          {notes.map((note) => (
            <li
              key={note.noteId}
              className="border-b border-gray-500 pb-2 cursor-pointer"
              onClick={() => {
                setCurrentNote(note);
                setIsEditing(true);
              }}
            >
              {note.title}
            </li>
          ))}
        </ul>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={addNewNote}
        >
          Add Note
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-gray-100 flex-grow p-8">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h1 className="text-3xl font-bold mb-4">
            <input
              type="text"
              value={currentNote.title}
              onChange={handleTitleChange} // Handle title changes
              className="border border-gray-400 rounded p-2 w-full"
            />
          </h1>

          <div className="border border-gray-400 p-4 rounded-lg">
            {isEditing && (
              <Tiptap
                className="bg-cDarkBlack"
                content={currentNote.content}
                onContentChange={handleContentChange}
              />
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-1/4 bg-gray-200 p-4 space-y-4">
        <div className="bg-gray-300 h-32 rounded-lg flex flex-col items-center justify-center">
          <h3>Summary</h3>
          <div className="text-center">
            {summary ? (
              <>
                <p>{summary}</p>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={generateSummary}
                >
                  {loading ? "Regenerating..." : "Regenerate Summary"}
                </button>
              </>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={generateSummary}
              >
                {loading ? "Generating..." : "Get Summary"}
              </button>
            )}
          </div>
        </div>
        <div className="bg-gray-300 h-32 rounded-lg flex items-center justify-center">
          <h3>More Info</h3>
        </div>
        <div className="bg-gray-300 h-32 rounded-lg flex items-center justify-center">
          <h3>Mistakes</h3>
        </div>
      </div>
    </div>
  );
}
