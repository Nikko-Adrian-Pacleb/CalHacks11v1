import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    console.log("---Summarizing---");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const data = await req.json();
    const prompt = data.htmlContent;
    const result = await model.generateContent([
      "You are an AI assistant in a note-taking app.",
      "Your role is to provide a brief and accurate summary of the user's notes in strict Markdown format.",
      "Do not add any new information or provide external context.",
      "Focus only on the key points and main ideas from the user's input.",
      "Ensure the summary is clear and concise, using proper Markdown elements (e.g., headers, lists, bold, italic) where appropriate.",
      "Keep the tone neutral and informative.",
      "Ensure all output adheres to Markdown formatting rules strictly.",
      "User Input: ",
      prompt,
    ]);

    const response = await result.response;
    const output = await response.text();
    return NextResponse.json({ output: output });
  } catch (error) {
    console.error("Error generating content: ", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
