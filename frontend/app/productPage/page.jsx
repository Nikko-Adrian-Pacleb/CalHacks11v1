"use client";
import { useState, useCallback } from "react";
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
      getMoreInfo();
      getMistakes();
      getNoteConnections();
      handleSectionChangeClick(activeSection.title);
    }, 1000), // Delay of 1 second
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
        setActiveSection({
          title: "Summary",
          content: data.output,
        });
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
        setActiveSection({
          title: "More Info",
          content: data.output,
        });
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
        setActiveSection({
          title: "Mistakes",
          content: data.output,
        });
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
      <h1>Network Diagram</h1>
      <NetworkDiagram width={800} height={600} data={notesConnection} />
    </div>
  );
}
