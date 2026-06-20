import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { User } from "../models/User";
import { connectDB } from "./db";

export const generateToken = (id: string): string => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || "super_secret_key_change_me_in_production",
    {
      expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as any,
    }
  );
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "super_secret_key_change_me_in_production");
  } catch {
    return null;
  }
};

export async function getAuthUser(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);
  if (!decoded || !decoded.id) {
    return null;
  }

  await connectDB();
  const user = await User.findById(decoded.id).select("-password");
  return user;
}
