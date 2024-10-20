import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const data = await req.json();
    const prompt = data.htmlContent;
    const result = await model.generateContent([
      "You are an AI assistant in a note-taking app.",
      "Your role is to find mistakes in the user's notes and correct them.",
      "For each mistake, quote the incorrect part of the text in **bold** and provide the correction on the next line.",
      "Keep both the mistake and correction very short and concise.",
      "If any important context, background information, or details are missing, supplement them to provide a complete understanding.",
      "You can reference external information or general knowledge if needed to enhance the correction.",
      "If there is no mistake, do not output anything.",
      "Ensure the correction is clear, informative, and focused only on the key points.",
      "Keep the tone neutral and concise.",
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
