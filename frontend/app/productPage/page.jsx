"use client";
import { useState, useCallback } from "react";
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
  const [isEditing, setIsEditing] = useState(true);
  const [summary, setSummary] = useState("");
  const [moreInfo, setMoreInfo] = useState("");
  const [mistakes, setMistakes] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Add state to control sidebar visibility
  const [debounceTimeout, setDebounceTimeout] = useState(null); // Debounce timer

  // Debounce function to limit API calls
  const debounce = (func, delay) => {
    return (...args) => {
      if (debounceTimeout) clearTimeout(debounceTimeout);
      setDebounceTimeout(setTimeout(() => func(...args), delay));
    };
  };

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

    // Trigger debounced API calls when content changes
    debounceApiCalls();
  };

  // Debounced function to handle summary, more info, and mistakes calls
  const debounceApiCalls = useCallback(
    debounce(() => {
      generateSummary();
      getMoreInfo();
      getMistakes();
    }, 1000), // Delay of 1 second
    [currentNote] // Dependency array to ensure latest note
  );

  const addNewNote = () => {
    const newNoteId = notes.length; // Generate new note ID based on array length
    const newNote = {
      noteId: newNoteId,
      title: `New Note ${newNoteId + 1}`, // Automatically generated title
      content: "",
    };
    setNotes([...notes, newNote]); // Add new note to array
    setCurrentNote(newNote); // Set new note as current
    setIsEditing(true); // Allow editing for new note
  };

  const handleTitleChange = (e) => {
    const updatedTitle = e.target.value; // Get updated title from input field
    setCurrentNote((prevNote) => ({
      ...prevNote,
      title: updatedTitle, // Update current note title
    }));
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.noteId === currentNote.noteId
          ? { ...note, title: updatedTitle }
          : note
      )
    );
  };

  const generateSummary = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/getSummary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentNote),
      });

      const data = await response.json();
      if (data.output) {
        setSummary(data.output);
      } else {
        setSummary("Failed to generate summary");
      }
    } catch (error) {
      setSummary("Error generating summary");
      console.error("Error:", error);
    }
    setLoading(false);
  };

  const getMoreInfo = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/getMore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentNote),
      });

      const data = await response.json();
      if (data.output) {
        setMoreInfo(data.output);
      } else {
        setMoreInfo("Failed to get more information");
      }
    } catch (error) {
      setMoreInfo("Error getting more information");
      console.error("Error:", error);
    }
    setLoading(false);
  };

  const getMistakes = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/getMistakes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(currentNote), // Send note as JSON
      });

      const data = await response.json();
      if (data.output) {
        setMistakes(data.output);
      } else {
        setMistakes("Failed to find mistakes");
      }
    } catch (error) {
      setMistakes("Error finding mistakes");
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-blue-900 text-white p-4 transition-all duration-300 ${
          isSidebarOpen ? "w-1/4" : "w-12"
        }`}
      >

        <button
          className="bg-gray-400 text-black p-2 rounded-full mb-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "<" : ">"}
        </button>
        {isSidebarOpen && (
          <div>
            <div className="rounded-full bg-gray-300 w-16 h-16 mb-6"></div>
            <ul className="space-y-4">
              {notes.map((note) => (
                <li
                  key={note.noteId}
                  className="border-b border-gray-500 pb-2"
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
        )}
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
      <div className="w-1/4 bg-gray-200 p-4 space-y-6">
        {/* Summary Section */}
        <div className="bg-gray-300 p-4 rounded-lg flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold">Summary</h3>
          <div className="text-center mt-2">
            {summary ? (
              <div
                className="text-sm flex flex-col text-start"
                id="summary-box"
                dangerouslySetInnerHTML={{ __html: marked(summary) }}
              ></div>
            ) : (
              <div>No summary available</div>
            )}
          </div>
        </div>

        {/* More Info Section */}
        <div className="bg-gray-300 p-4 rounded-lg flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold">More Info</h3>
          <div className="text-center mt-2">
            {moreInfo ? (
              <div
                className="text-sm flex flex-col text-start"
                id="moreinfo-box"
                dangerouslySetInnerHTML={{ __html: marked(moreInfo) }}
              ></div>
            ) : (
              <div>No additional information available</div>
            )}
          </div>
        </div>

        {/* Mistakes Section */}
        <div className="bg-gray-300 p-4 rounded-lg flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold">Mistakes</h3>
          <div className="text-center mt-2">
            {mistakes ? (
              <div
                className="text-sm flex flex-col text-start"
                id="mistakes-box"
                dangerouslySetInnerHTML={{ __html: marked(mistakes) }}
              ></div>
            ) : (
              <div>No mistakes found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
