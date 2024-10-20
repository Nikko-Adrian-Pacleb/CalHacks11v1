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
  const [isEditing, setIsEditing] = useState(true);
  const [summary, setSummary] = useState("");
  const [moreInfo, setMoreInfo] = useState("");
  const [mistakes, setMistakes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContentChange = (updatedContent, updatedHtmlContent) => {
    setCurrentNote({
      ...currentNote,
      content: updatedContent,
      htmlContent: updatedHtmlContent,
    });
    setNotes(
      notes.map((note) =>
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
    const newNoteId = notes.length;
    const newNote = {
      noteId: newNoteId,
      title: `New Note ${newNoteId + 1}`,
      content: "",
    };
    setNotes([...notes, newNote]);
    setCurrentNote(newNote);
    setIsEditing(true);
  };

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
        body: JSON.stringify(currentNote), // Wrap HTML in a JSON object
      });

      const data = await response.json();
      if (data.output) {
        setMistakes(data.output); // Set the summary
      } else {
        setMistakes("Failed to generate summary");
      }
    } catch (error) {
      setMistakes("Error generating summary");
      console.error("Error:", error);
    }
    setLoading(false);
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

      {/* Main Content */}
      <div className="bg-gray-100 flex-grow p-8">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h1 className="text-3xl font-bold mb-4">{currentNote.title}</h1>
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
              <>
                <div
                  className="text-sm flex flex-col text-start"
                  id="summary-box"
                  dangerouslySetInnerHTML={{ __html: marked(summary) }}
                ></div>
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

        {/* More Info Section */}
        <div className="bg-gray-300 p-4 rounded-lg flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold">More Info</h3>
          <div className="text-center mt-2">
            {moreInfo ? (
              <>
                <div
                  className="text-sm flex flex-col text-start"
                  id="moreinfo-box"
                  dangerouslySetInnerHTML={{ __html: moreInfo }}
                ></div>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={getMoreInfo}
                >
                  {loading ? "Getting more info..." : "Get More Info"}
                </button>
              </>
            ) : (
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={getMoreInfo}
              >
                {loading ? "Getting more info..." : "Get More Info"}
              </button>
            )}
          </div>
        </div>

        {/* Mistakes Section */}
        <div className="bg-gray-300 p-4 rounded-lg flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold">Mistakes</h3>
          <div className="text-center mt-2">
            {mistakes ? (
              <>
                <div
                  className="text-sm flex flex-col text-start"
                  id="mistakes-box"
                  dangerouslySetInnerHTML={{ __html: marked(mistakes) }}
                ></div>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={getMistakes}
                >
                  {loading ? "Finding mistakes..." : "Find Mistakes"}
                </button>
              </>
            ) : (
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={getMistakes}
              >
                {loading ? "Finding mistakes..." : "Find Mistakes"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
