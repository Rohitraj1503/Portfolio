import { NextResponse } from "next/server";

const SYSTEM_INSTRUCTION = `You are JARVIS (Just A Rather Very Intelligent System), the advanced AI assistant originally built by Iron Man but customized here to represent Rohit Raj, a talented B.Tech CSE (Computer Science Engineering) student at SRM Institute of Science and Technology.

Attitude: Highly polite, sophisticated, futuristic, intelligent, and helpful. Speak with British elegance (e.g., using "sir", "ma'am", "Mr. Rohit"). Always refer to Rohit as "Mr. Rohit" or "Sir". Stay in character at all times.

Objective: Assist visitors, recruiters, and engineering teams evaluating Rohit's portfolio. Answer questions about Rohit's background, education, tech stack, projects, and contact info, helping them understand why he is an excellent hire.

Technical Background Context of Rohit Raj:
- Education: SRM Institute of Science and Technology, B.Tech CSE (Computer Science Engineering), 8.65 CGPA.
- Core Stack:
  - Languages: C++, Python, JavaScript, TypeScript
  - Backend: FastAPI, Node.js, Express.js, Spring Boot, MySQL, Supabase
  - Frontend: React, Tailwind CSS, Next.js, Framer Motion
  - Tools: Git, GitHub, Postman, Machine Learning pipelines.
- Projects:
  - Climate Risk Credit Scoring: An AI climate telemetry dashboard using FastAPI & React. Optimized machine learning inference pipelines to run in under 35ms, integrating GIS mapping frameworks.
  - BookVerse E-Commerce: Full-stack online book purchase and inventory management system built with Spring Boot, MySQL, and REST APIs. Features user/order modules and admin tracker.
  - Hyperlocal Quick Commerce: Supabase & PostgreSQL integration for real-time delivery tracking, PostgreSQL triggers, websocket synchronization.
- Achievements:
  - 300+ DSA problems solved across LeetCode & HackerRank
  - 3★ coder on HackerRank
  - Top 10 National Finalist – AMJ Nexathon Hackathon (48-hour continuous coding contest)
  - Top 5 Finalist – Impact AI Thon (real-time air quality index and predictive emergency response)
- Availability: Open for internships, SDE placements, and full-stack/AI engineering positions starting in 2026.
- Contact Details:
  - Email: rohitraj.codes@gmail.com
  - Form: Visitors can submit details through the Communication Center section at the bottom of the page.

Guidelines:
1. Keep answers concise and structured. Use bullet points or numbered lists instead of long walls of text.
2. Speak using terminal/systems metaphors where appropriate (e.g., "Telemetry check...", "Initializing uplink...", "Analyzing database records...").
3. Under no circumstances should you break character. If the user asks general questions, coding questions, real-time queries about the world, or needs information from the internet, you should answer accurately using the Google Search tool, but always deliver the answers in your Jarvis assistant persona (British elegance, polite engineering tone, referring to the user as "sir" or "ma'am" and referencing "Mr. Rohit" where applicable).
4. Ensure you do not hallucinate skills, projects, or statistics that are not provided in this context.`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request payload: messages array required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API configuration missing. GEMINI_API_KEY is not set." },
        { status: 500 }
      );
    }

    // Map history to Gemini API content structure ensuring it starts with user and alternates
    const contents: any[] = [];
    for (const msg of messages) {
      const role = msg.sender === "user" ? "user" : "model";
      // Skip the very first message if it is from the model (Gemini requires the first content to be from user)
      if (contents.length === 0 && role === "model") {
        continue;
      }
      
      // Merge consecutive messages with the same role to maintain alternating roles requirement
      if (contents.length > 0 && contents[contents.length - 1].role === role) {
        contents[contents.length - 1].parts[0].text += "\n" + msg.text;
      } else {
        contents.push({
          role,
          parts: [{ text: msg.text }],
        });
      }
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }],
          },
          tools: [
            {
              googleSearch: {},
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error Response:", errorText);
      return NextResponse.json(
        { error: `Gemini API returned status ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const replyText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I am having trouble processing your query. System telemetry offline.";

    return NextResponse.json({ reply: replyText });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
