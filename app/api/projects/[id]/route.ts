import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Project } from "@/models/Project";
import { getAuthUser } from "@/lib/auth";

// GET /api/projects/:id
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: project }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Server error fetching project",
      },
      { status: 500 }
    );
  }
}

// PUT /api/projects/:id (Protected)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    // Authenticate admin user
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Not authorized, token failed" }, { status: 401 });
    }

    const { id } = await params;
    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
    }

    const { title, description, category, year, tags, imageUrl, liveUrl, githubUrl } = await req.json();

    const updatedData = {
      title: title || project.title,
      description: description || project.description,
      category: category || project.category,
      year: year !== undefined ? year : project.year,
      tags: tags !== undefined ? tags : project.tags,
      imageUrl: imageUrl || project.imageUrl,
      liveUrl: liveUrl !== undefined ? liveUrl : project.liveUrl,
      githubUrl: githubUrl !== undefined ? githubUrl : project.githubUrl,
    };

    const updatedProject = await Project.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({ success: true, data: updatedProject }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Server error updating project",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/:id (Protected)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    // Authenticate admin user
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Not authorized, token failed" }, { status: 401 });
    }

    const { id } = await params;
    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
    }

    await project.deleteOne();

    return NextResponse.json({ success: true, message: "Project deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Server error deleting project",
      },
      { status: 500 }
    );
  }
}
