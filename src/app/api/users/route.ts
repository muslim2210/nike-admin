import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 

/**
 * @route GET /api/users
 * @desc Get all users
 * @access Public
 */
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        customer: true, 
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        status: "success",
        code: 200,
        message: "users fetched successfully",
        count: users.length,
        data: users,
      },
      { status: 200 }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    console.error("GET /api/users error:", error);

    return NextResponse.json(
      {
        status: "error",
        code: 500,
        message: "Internal server error while fetching users",
        error: error.message || error,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
