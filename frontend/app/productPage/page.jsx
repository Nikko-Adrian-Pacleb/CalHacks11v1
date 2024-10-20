"use client";
import { useState, useCallback, act } from "react";
import Tiptap from "../components/Tiptap";
import { marked } from "marked";
import { NetworkDiagram } from "../components/NetworkDiagram";
export default function Home() {
  const [notes, setNotes] = useState([
    {
      noteId: 0,
      title: "The Importance of Mind Mapping",
      content: `
        Mind mapping is a powerful note-taking technique that involves creating a visual representation of information, usually in the form of a diagram. 
        It's essential for capturing ideas, organizing them logically, and visually representing the relationships between concepts. 
        This method helps in structuring thoughts and allows for a more holistic understanding of a topic.
      `,
      htmlContent: marked(`
        # The Importance of Mind Mapping
        Mind mapping is a powerful note-taking technique that involves creating a visual representation of information, usually in the form of a diagram.
        It's essential for capturing ideas, organizing them logically, and visually representing the relationships between concepts. 
        This method helps in structuring thoughts and allows for a more holistic understanding of a topic.
      `),
    },
    {
      noteId: 1,
      title: "Why Connecting Ideas is Important",
      content: `
        Connecting ideas when taking notes is crucial because it helps to reveal the underlying patterns and relationships between topics. 
        This not only aids in memory retention but also fosters a deeper understanding of the subject matter. 
        When ideas are connected, it becomes easier to build on existing knowledge, make connections to real-world scenarios, and solve problems more effectively.
      `,
      htmlContent: marked(`
        # Why Connecting Ideas is Important
        Connecting ideas when taking notes is crucial because it helps to reveal the underlying patterns and relationships between topics.
        This not only aids in memory retention but also fosters a deeper understanding of the subject matter. 
        When ideas are connected, it becomes easier to build on existing knowledge, make connections to real-world scenarios, and solve problems more effectively.
      `),
    },
    {
      noteId: 2,
      title: "Mind Mapping and Active Learning",
      content: `
        Mind mapping encourages active learning by forcing you to process and reorganize information as you take notes. 
        It prompts critical thinking by asking you to evaluate how different concepts fit together, 
        making it a great tool for problem-solving and creative thinking.
      `,
      htmlContent: marked(`
        # Mind Mapping and Active Learning
        Mind mapping encourages active learning by forcing you to process and reorganize information as you take notes. 
        It prompts critical thinking by asking you to evaluate how different concepts fit together, 
        making it a great tool for problem-solving and creative thinking.
      `),
    },
    {
      noteId: 3,
      title: "Visual Representation",
      content: `
        A visual representation of information helps in understanding complex ideas by breaking them down into simpler, more digestible components. 
        It leverages the brain's natural tendency to process visual information faster than text. 
        Mind maps are a perfect example of visual representation, as they make it easier to see relationships between ideas.
      `,
      htmlContent: marked(`
        # Visual Representation
        A visual representation of information helps in understanding complex ideas by breaking them down into simpler, more digestible components. 
        It leverages the brain's natural tendency to process visual information faster than text. 
        Mind maps are a perfect example of visual representation, as they make it easier to see relationships between ideas.
      `),
    },
    {
      noteId: 4,
      title: "Organizing Information",
      content: `
        Organizing information is a critical part of note-taking and learning. 
        It allows you to structure ideas in a logical flow, making it easier to recall later. 
        Mind mapping helps with organizing information by giving each idea a clear place in relation to others.
      `,
      htmlContent: marked(`
        # Organizing Information
        Organizing information is a critical part of note-taking and learning. 
        It allows you to structure ideas in a logical flow, making it easier to recall later. 
        Mind mapping helps with organizing information by giving each idea a clear place in relation to others.
      `),
    },
    {
      noteId: 5,
      title: "Memory Retention",
      content: `
        Memory retention is the ability to store and recall information over time. 
        By connecting ideas and creating a structured note-taking system, like mind mapping, you reinforce connections in the brain, 
        making it easier to retrieve information later.
      `,
      htmlContent: marked(`
        # Memory Retention
        Memory retention is the ability to store and recall information over time. 
        By connecting ideas and creating a structured note-taking system, like mind mapping, you reinforce connections in the brain, 
        making it easier to retrieve information later.
      `),
    },
    {
      noteId: 6,
      title: "Critical Thinking",
      content: `
        Critical thinking involves analyzing and evaluating information to form a judgment. 
        Mind mapping encourages this process by making you break down information into its core components, 
        assess relationships between concepts, and come to conclusions based on connections.
      `,
      htmlContent: marked(`
        # Critical Thinking
        Critical thinking involves analyzing and evaluating information to form a judgment. 
        Mind mapping encourages this process by making you break down information into its core components, 
        assess relationships between concepts, and come to conclusions based on connections.
      `),
    },
    {
      noteId: 7,
      title: "Problem-Solving",
      content: `
        Problem-solving is enhanced by mind mapping because it allows you to visualize the elements of a problem and explore different solutions. 
        By mapping out related ideas, you can identify patterns and come up with creative solutions more efficiently.
      `,
      htmlContent: marked(`
        # Problem-Solving
        Problem-solving is enhanced by mind mapping because it allows you to visualize the elements of a problem and explore different solutions. 
        By mapping out related ideas, you can identify patterns and come up with creative solutions more efficiently.
      `),
    },
    {
      noteId: 8,
      title: "Creative Thinking",
      content: `
        Creative thinking is fostered when you're able to make new connections between ideas. 
        Mind mapping encourages free-flowing thought and allows ideas to branch out in multiple directions, which leads to innovative solutions and new insights.
      `,
      htmlContent: marked(`
        # Creative Thinking
        Creative thinking is fostered when you're able to make new connections between ideas. 
        Mind mapping encourages free-flowing thought and allows ideas to branch out in multiple directions, which leads to innovative solutions and new insights.
      `),
    },
  ]);

  const [notesConnection, setNotesConnection] = useState({
    nodes: [
      { id: "The Importance of Mind Mapping", group: "concepts" },
      { id: "Why Connecting Ideas is Important", group: "concepts" },
      { id: "Mind Mapping and Active Learning", group: "concepts" },
      { id: "Visual Representation", group: "benefits" },
      { id: "Organizing Information", group: "benefits" },
      { id: "Memory Retention", group: "benefits" },
      { id: "Critical Thinking", group: "skills" },
      { id: "Problem-Solving", group: "skills" },
      { id: "Creative Thinking", group: "skills" },
    ],
    links: [
      {
        source: "The Importance of Mind Mapping",
        target: "Why Connecting Ideas is Important",
        value: 1,
      },
      {
        source: "The Importance of Mind Mapping",
        target: "Mind Mapping and Active Learning",
        value: 1,
      },
      {
        source: "The Importance of Mind Mapping",
        target: "Visual Representation",
        value: 1,
      },
      {
        source: "Why Connecting Ideas is Important",
        target: "Organizing Information",
        value: 1,
      },
      {
        source: "Why Connecting Ideas is Important",
        target: "Memory Retention",
        value: 1,
      },
      {
        source: "Mind Mapping and Active Learning",
        target: "Critical Thinking",
        value: 1,
      },
      {
        source: "Mind Mapping and Active Learning",
        target: "Problem-Solving",
        value: 1,
      },
      {
        source: "Mind Mapping and Active Learning",
        target: "Creative Thinking",
        value: 1,
      },
      {
        source: "Visual Representation",
        target: "Organizing Information",
        value: 1,
      },
      {
        source: "Organizing Information",
        target: "Memory Retention",
        value: 1,
      },
      { source: "Critical Thinking", target: "Problem-Solving", value: 1 },
      { source: "Problem-Solving", target: "Creative Thinking", value: 1 },
    ],
  });

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
      setTimeout(() => {
        getNoteConnections(notes);
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

  const getNoteConnections = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/getNotesConnections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notes),
      });

      const data = await response.json();
      if (data.connections) {
        console.log(data.connections);
        setNotesConnection(data.connections);
      } else {
        setNotesConnection(null);
      }
    } catch (error) {
      setNotesConnection(null);
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
          className="text-black p-2 mb-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <span className="text-3xl text-cBeige">
            {isSidebarOpen ? "<" : ">"}
          </span>
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
              className="text-2xl hover:bold text-white px-4 rounded mt-2"
              onClick={addNewNote}
            >
              +
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
          {loading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            <></>
          )}
          <h3 className="text-lg font-semibold">{activeSection.title}</h3>
          <div
            className="text-sm flex flex-col text-start mt-2 scroll-smooth focus:scroll-auto"
            dangerouslySetInnerHTML={{ __html: marked(activeSection.content) }}
          ></div>
        </div>
      </div>
      <NetworkDiagram
        width={800}
        height={600}
        data={notesConnection}
        activeNote={currentNote.title}
      />
    </div>
  );
}
