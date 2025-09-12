import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

export async function PUT(
  req: Request,
  { params }: { params: { collection: string; id: string } }
) {
  try {
    const body = await req.json();
    const { collection, id } = params;

    await db.collection(collection).doc(id).update(body);

    return NextResponse.json({ id, ...body }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error updating document" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { collection: string; id: string } }
) {
  try {
    const { collection, id } = params;

    await db.collection(collection).doc(id).delete();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error deleting document" },
      { status: 500 }
    );
  }
}

// GET: traer un documento por id
export async function GET(
  req: Request,
  { params }: { params: { collection: string; id: string } }
) {
  try {
    const { collection, id } = params;
    const doc = await db.collection(collection).doc(id).get();

    if (!doc.exists) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ id: doc.id, ...doc.data() }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching document" },
      { status: 500 }
    );
  }
}
