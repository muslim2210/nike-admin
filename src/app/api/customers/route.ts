import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * @route GET /api/customers
 * @desc Get all customers
 * @access Public
 */
export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        orders: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        status: "success",
        code: 200,
        message: "customers fetched successfully",
        count: customers.length,
        data: customers,
      },
      { status: 200 }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    console.error("GET /api/customers error:", error);

    return NextResponse.json(
      {
        status: "error",
        code: 500,
        message: "Internal server error while fetching customers",
        error: error.message || error,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
