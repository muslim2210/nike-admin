import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ valid: false, error: "No token provided" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };
    return NextResponse.json({ valid: true, user: decoded });
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.json({ valid: false, error: "Invalid or expired token" }, { status: 401 });
  }
}
