import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ GET /api/products/:id
export async function GET(
_req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: { collection: true, orderItems: true },
    });

    if (!product) {
      return NextResponse.json(
        { status: "error", code: 404, message: "product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        code: 200,
        message: "Product fetched successfully",
        data: product,
      },
      { status: 200 }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("GET /api/products/:id error:", error);
    return NextResponse.json(
      {
        status: "error",
        code: 500,
        message: "Internal server error while fetching product detail",
        error: error.message || error,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// ✅ PUT /api/products/:id
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { title, description, media, sizes, colors, price, tags, collectionId } = body;

    const updated = await prisma.product.update({
      where: { id: params.id },
      data: { title, description, media, sizes, colors, price, tags, collectionId },
    });

    return NextResponse.json(
      {
        status: "success",
        code: 200,
        message: "product updated successfully",
        data: updated,
      },
      { status: 200 }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("PUT /api/products/:id error:", error);
    return NextResponse.json(
      {
        status: "error",
        code: 500,
        message: "Internal server error while updating product",
        error: error.message || error,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// ✅ DELETE /api/products/:id
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      {
        status: "success",
        code: 200,
        message: "product deleted successfully",
        data: deleted,
      },
      { status: 200 }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("DELETE /api/products/:id error:", error);
    return NextResponse.json(
      {
        status: "error",
        code: 500,
        message: "Internal server error while deleting product",
        error: error.message || error,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
