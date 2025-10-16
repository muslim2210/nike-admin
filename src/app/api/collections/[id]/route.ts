import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ GET /api/collections/:id
export async function GET(
_req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const collection = await prisma.collection.findUnique({
      where: { id: params.id },
      include: { products: true },
    });

    if (!collection) {
      return NextResponse.json(
        { status: "error", code: 404, message: "Collection not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        code: 200,
        message: "Collection fetched successfully",
        data: collection,
      },
      { status: 200 }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("GET /api/collections/:id error:", error);
    return NextResponse.json(
      {
        status: "error",
        code: 500,
        message: "Internal server error while fetching collection detail",
        error: error.message || error,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// ✅ PUT /api/collections/:id
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { title, description, image } = body;

    const updated = await prisma.collection.update({
      where: { id: params.id },
      data: { title, description, image },
    });

    return NextResponse.json(
      {
        status: "success",
        code: 200,
        message: "Collection updated successfully",
        data: updated,
      },
      { status: 200 }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("PUT /api/collections/:id error:", error);
    return NextResponse.json(
      {
        status: "error",
        code: 500,
        message: "Internal server error while updating collection",
        error: error.message || error,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// ✅ DELETE /api/collections/:id
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await prisma.collection.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      {
        status: "success",
        code: 200,
        message: "Collection deleted successfully",
        data: deleted,
      },
      { status: 200 }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("DELETE /api/collections/:id error:", error);
    return NextResponse.json(
      {
        status: "error",
        code: 500,
        message: "Internal server error while deleting collection",
        error: error.message || error,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
