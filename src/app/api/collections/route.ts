import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 

/**
 * @route GET /api/collection
 * @desc Get all collection
 * @access Public
 */
export async function GET() {
  try {
    const collection = await prisma.collection.findMany({
      include: {
        products: true, 
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        status: "success",
        code: 200,
        message: "collection fetched successfully",
        count: collection.length,
        data: collection,
      },
      { status: 200 }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    console.error("GET /api/collection error:", error);

    return NextResponse.json(
      {
        status: "error",
        code: 500,
        message: "Internal server error while fetching collection",
        error: error.message || error,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
