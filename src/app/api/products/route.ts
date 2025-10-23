import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 

/**
 * @route GET /api/products
 * @desc Get all products
 * @access Public
 */
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        collection: true, 
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        status: "success",
        code: 200,
        message: "Products fetched successfully",
        count: products.length,
        data: products,
      },
      { status: 200 }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    console.error("GET /api/products error:", error);

    return NextResponse.json(
      {
        status: "error",
        code: 500,
        message: "Internal server error while fetching products",
        error: error.message || error,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}


/**
 * @route POST /api/products
 * @desc Create new product
 * @access Public
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, media, sizes, colors, price, tags, collectionId } = body;

    if (!title || !description || !media || !sizes || !colors || !price || !collectionId ) {
      return NextResponse.json(
        { status: "error", code: 400, message: "Title, description, media, sizes, colors, price are required." },
        { status: 400 }
      );
    }

    const newproduct = await prisma.product.create({
      data: {
        title,
        media,
        sizes,
        colors,
        price,
        description,
        tags,
        expense: body.expense ?? 0, 
        collection: {
          connect: { id: collectionId },
        }, 
      }
    });

    return NextResponse.json(
      {
        status: "success",
        code: 201,
        message: "product created successfully",
        data: newproduct,
      },
      { status: 201 }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      {
        status: "error",
        code: 500,
        message: "Internal server error while creating product",
        error: error.message || error,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}