import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * @route GET /api/orders
 * @desc Get all orders
 * @access Public
 */
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true, 
        items: true,  
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        status: "success",
        code: 200,
        message: "orders fetched successfully",
        count: orders.length,
        data: orders,
      },
      { status: 200 }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    console.error("GET /api/orders error:", error);

    return NextResponse.json(
      {
        status: "error",
        code: 500,
        message: "Internal server error while fetching orders",
        error: error.message || error,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
