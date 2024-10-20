import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const data = await req.json();
    const prompt = data.htmlContent;
    console.log(["start the sentence with Hello", prompt]);
    const result = await model.generateContent([
      "You are a AI in a note taking app.",
      "Your job is to give a short summary about the topic the user is typing.",
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
