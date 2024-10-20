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
          {loading ? <div role="status">
           <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
           </svg>
                 <span class="sr-only">Loading...</span>
          </div> : <></>}
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
