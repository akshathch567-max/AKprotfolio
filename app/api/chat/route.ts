import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    const query = (message || "").toLowerCase();

    let reply = "";

    // 1. Check for AI Keys (to support future real AI integration)
    const apiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx") {
      // In the future, you can implement real LLM call here:
      // const response = await callLLM(query);
      // reply = response;
    }

    // 2. Intelligent local fallback rule-based parser
    if (!reply) {
      if (query.includes("nexus") || query.includes("attendance")) {
        reply = "The Nexus Attendance System is Akshath's premium 2026 AI project. It features automated face recognition logging in under 300ms using OpenCV, robust database persistence with MongoDB, and an integrated real-time check-in frequency chart. The chart features a custom glowing neon cyan-to-purple line showing live activity log spikes and time-series data clusters.";
      } else if (query.includes("stellar") || query.includes("dashboard")) {
        reply = "Stellar Dashboard is a high-performance Next-gen analytics dashboard built in 2024. It utilizes Next.js, D3.js, and Framer Motion. It solves complex rendering challenges of drawing thousands of data streams in real time by debouncing layout paint triggers and applying GPU-accelerated CSS paths.";
      } else if (query.includes("aura") || query.includes("e-commerce") || query.includes("store")) {
        reply = "Aura E-Commerce is a premium luxury shopping platform built in 2024 using React, Shopify, and Three.js. It integrates compressed WebGL assets directly in a headless commerce flow, letting buyers view, customize (textures, colors), and preview 3D products in real time directly from their mobile browser.";
      } else if (query.includes("nomad") || query.includes("travel") || query.includes("map")) {
        reply = "Nomad Travel App is a mobile experience built in 2023. It features offline-first vector maps with Mapbox, custom POI highlights, and local OpenAI itinerary curation, ensuring travelers have stable access to details even in zero-reception areas.";
      } else if (query.includes("mosaic") || query.includes("architecture")) {
        reply = "Mosaic Architecture is a minimalist showcase site for an architectural studio created in 2023. Built using Webflow, GSAP, and Three.js, it uses passive event listener hooks and hardware-accelerated transforms to execute smooth scroll slide transitions and vertical slideshow timelines.";
      } else if (query.includes("pulse") || query.includes("music") || query.includes("audio")) {
        reply = "Pulse Music is a spatial audio streaming app from 2023. Using Vue.js, the Web Audio API, and HTML5 Canvas, it runs a 60fps real-time frequency analyser with offscreen buffering, generating an interactive canvas wave matching the track's amplitude spectrum.";
      } else if (query.includes("skill") || query.includes("languages") || query.includes("tech")) {
        reply = "Akshath is a Creative Developer specializing in high-performance frontend frameworks (React, Next.js, Vue), interactive WebGL assets (Three.js), data visualization libraries (D3.js), mobile development (React Native), and creative animations (GSAP, Framer Motion). On the backend, he works with Node.js, Express, and MongoDB.";
      } else if (query.includes("contact") || query.includes("email") || query.includes("hire")) {
        reply = "You can contact Akshath directly via hello@akshathch.dev or fill out the contact form at the bottom of the dashboard! He is currently open to full-time opportunities and creative frontend consulting.";
      } else if (query.includes("hello") || query.includes("hi") || query.includes("hey")) {
        reply = "Hello! I am Akshath's AI Portfolio assistant. You can ask me about his work (e.g. 'Nexus Attendance', 'Stellar Dashboard'), his engineering skills, or how to contact him directly!";
      } else {
        reply = "That's an interesting question! I am Akshath's specialized portfolio bot. I can give you detailed technical breakdowns on projects like 'Nexus Attendance System' (OpenCV/MongoDB), 'Stellar Dashboard' (D3.js), his coding stack (Next.js, Three.js, GSAP), or his email contact info.";
      }
    }

    return NextResponse.json({ success: true, reply }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, reply: "An error occurred in the AI assistant channel. Please try again!" },
      { status: 500 }
    );
  }
}
