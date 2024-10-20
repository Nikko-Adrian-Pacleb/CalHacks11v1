import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

function cleanAndConvertToJson(inputString) {
  // Remove the triple backticks and the '```json' tags
  let cleanedString = inputString.replace(/```json|```/g, "");

  // Remove the escape characters and extra spaces or line breaks
  cleanedString = cleanedString.replace(/\\n/g, "").replace(/\\t/g, "").trim();

  // Convert the cleaned string to a valid JSON object
  try {
    const jsonObject = JSON.parse(cleanedString);
    console.log("Valid JSON Object:", jsonObject);
    return jsonObject;
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
}

// POST request handler to generate note connections using Gemini AI
export async function POST(req, res) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Initialize the AI client
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Load the Gemini model
    const notes = await req.json(); // Parse incoming request JSON
    // console.log(await data);
    // const notes = data.notes; // Assume the notes are passed in the request body

    // Prepare a structured prompt for generating connections between the notes
    const prompt = [
      "You are an AI assistant in a note-taking app.",
      "Your task is to analyze a list of notes and generate connections between the notes.",
      "Strictly follow the format below when creating the output.",
      "Ensure that each note is represented as a node in the 'nodes' array and that the conceptual connections between the notes are represented as links in the 'links' array.",
      "Each connection in the 'links' array must have a source note, a target note, and a value representing the strength of the connection (1 for weak, 2 for moderate, and 3 for strong).",

      "Do not add any additional formatting like backticks or code blocks. Output the JSON object directly.",

      "Output Format:",
      "{",
      '"nodes": [',
      '{ "id": "Note Title 1", "group": "category" },',
      '{ "id": "Note Title 2", "group": "category" },',
      '{ "id": "Note Title 3", "group": "category" },',
      "...",
      "],",
      '"links": [',
      '{ "source": "Note Title 1", "target": "Note Title 2", "value": 1 },',
      '{ "source": "Note Title 1", "target": "Note Title 3", "value": 2 },',
      '{ "source": "Note Title 2", "target": "Note Title 3", "value": 1 },',
      "...",
      "]",
      "}",

      "Make sure the 'id' in the nodes corresponds to the titles of the notes provided.",
      "The 'group' should be based on the conceptual category of the note, such as 'concepts', 'benefits', or 'skills'.",
      "The 'links' array should show how the notes are conceptually connected, with the 'value' field representing the strength of the connection.",
      "Here is the list of notes:",

      ...notes.map((note) => `- ${note.title}: ${note.content}`),
    ];
    // console.log(prompt);
    // Generate content using Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = await response.text();
    console.log(await response.text());
    // Assuming Gemini's response will be a JSON array of connections
    return NextResponse.json({ connections: JSON.parse(output) });
  } catch (error) {
    console.error("Error generating connections: ", error);
    return NextResponse.json(
      { error: "Failed to generate connections" },
      { status: 500 }
    );
  }
}
