import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const data = await req.json();
    const prompt = data.body;
    const result = await model.generateContent([
      "You are an AI assistant in a note-taking app.",
      "Your role is to provide additional relevant information, context, or background to supplement the user's notes, adhering strictly to Markdown formatting.",
      "Utilize general knowledge to fill in missing details or add important information that enhances clarity or completeness.",
      "Avoid summarizing the user's input; instead, enrich the content with pertinent insights.",
      "If no relevant information can be added, respond with 'Nothing relevant to add.'",
      "Ensure all content is accurate, well-structured, and complies with Markdown syntax.",
      "Maintain a neutral and informative tone throughout.",
      "Use at least 2-3 reliable sources to support your content.",
      "Format the sources as a bulleted list at the end of the response in the following format: [Source Title](URL).",
      "User Input: ",
      prompt,
    ]);

    const response = await result.response;
    const citation = await response.candidates[0].citationMetadata;
    await console.log(citation);
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
