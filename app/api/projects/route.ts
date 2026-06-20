import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Project } from "@/models/Project";
import { getAuthUser } from "@/lib/auth";

// GET /api/projects
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: projects.length, data: projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Server error fetching projects",
      },
      { status: 500 }
    );
  }
}

// POST /api/projects (Protected)
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Authenticate admin user
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Not authorized, token failed" }, { status: 401 });
    }

    const { title, description, category, year, tags, imageUrl, liveUrl, githubUrl } = await req.json();

    if (!title || !description || !category || !year || !imageUrl) {
      return NextResponse.json(
        { success: false, message: "Please provide all required fields: title, description, category, year, imageUrl" },
        { status: 400 }
      );
    }

    const project = await Project.create({
      title,
      description,
      category,
      year,
      tags: Array.isArray(tags) ? tags : [],
      imageUrl,
      liveUrl: liveUrl || undefined,
      githubUrl: githubUrl || undefined,
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Server error creating project",
      },
      { status: 500 }
    );
  }
}
