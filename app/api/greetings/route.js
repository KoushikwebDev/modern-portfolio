// app/api/greeting/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_APP_GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { city, country, time } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash"});

    const prompt = `
      Write a short, funny, and friendly welcome message for a personal portfolio visitor.
      The visitor is from ${city}, ${country} and it is currently ${time} there.
      Keep it casual and developer-themed, as if it's from a creative software engineer.
      Limit it to 2 sentences and add a fun emoji or two.
    `;

    const result = await model.generateContent(prompt);
    const message = result.response.text();

    return Response.json({ message });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Hey there 👋 Welcome to my portfolio!" });
  }
}
