import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { generateToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Please provide username, email, and password" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return NextResponse.json(
        { success: false, message: "User with this email or username already exists" },
        { status: 400 }
      );
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          _id: user._id,
          username: user.username,
          email: user.email,
          token: generateToken(user._id.toString()),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Server error during registration",
      },
      { status: 500 }
    );
  }
}
