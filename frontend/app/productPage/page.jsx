"use client";
import { useState, useCallback, act } from "react";
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
  const [activeSection, setActiveSection] = useState({
    title: "Summary",
    content: "",
  }); // New state to track the active section
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

      setTimeout(() => {
        getMoreInfo();
      }, 500); // 0.5 second delay between summary and more info

      setTimeout(() => {
        getMistakes();
      }, 500); // 1 second delay between more info and mistakes

      setTimeout(() => {
        handleSectionChangeClick(activeSection.title);
      }, 500);
    }, 1000), // Delay
    [currentNote, activeSection] // Dependency array to ensure latest note
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
        // Update active section immediately after setting summary
        if (activeSection.title === "Summary") {
          setActiveSection({
            title: "Summary",
            content: summary,
          });
        }
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
        // Update active section immediately after setting more info
        if (activeSection.title === "More Info") {
          setActiveSection({
            title: "More Info",
            content: moreInfo,
          });
        }
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
        body: JSON.stringify(currentNote),
      });

      const data = await response.json();
      if (data.output) {
        setMistakes(data.output);
        // Update active section immediately after setting mistakes
        if (activeSection.title === "Mistakes") {
          setActiveSection({
            title: "Mistakes",
            content: mistakes,
          });
        }
      } else {
        setMistakes("Failed to find mistakes");
      }
    } catch (error) {
      setMistakes("Error finding mistakes");
      console.error("Error:", error);
    }
    setLoading(false);
  };

  // Function to handle button click and update active section
  const handleSectionChangeClick = (section) => {
    if (section == "Mistakes") {
      setActiveSection({
        title: "Mistakes",
        content: mistakes,
      });
    } else if (section == "More Info") {
      setActiveSection({
        title: "More Info",
        content: moreInfo,
      });
    } else {
      setActiveSection({
        title: "Summary",
        content: summary,
      });
    }
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
      <div className="w-1/4 bg-gray-200 p-4 space-y-4">
        {/* Button for different implementations */}
        <button
          className="border-solid border-2 border-black rounded py-2 px-3 mt-2"
          onClick={() => handleSectionChangeClick("Summary")}
        >
          Summary
        </button>
        <button
          className="border-solid border-2 border-black rounded py-2 px-3 mt-2"
          onClick={() => handleSectionChangeClick("More Info")}
        >
          More Info
        </button>
        <button
          className="border-solid border-2 border-black rounded py-2 px-3 mt-2"
          onClick={() => handleSectionChangeClick("Mistakes")}
        >
          Mistakes
        </button>

        {/* Content Section */}
        <div className="bg-gray-300 p-4 rounded-lg flex flex-col items-center justify-center">
          {loading ? <p>Loading</p> : <></>}
          <h3 className="text-lg font-semibold">{activeSection.title}</h3>
          <div
            className="text-sm flex flex-col text-start mt-2"
            dangerouslySetInnerHTML={{ __html: marked(activeSection.content) }}
          ></div>
        </div>
      </div>
    </div>
  );
}
