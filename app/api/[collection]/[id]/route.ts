import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

// GET por ID
export async function GET(
  req: Request,
  { params }: { params: { collection: string; id: string } }
) {
  try {
    const { collection, id } = params;
    const doc = await db.collection(collection).doc(id).get();

    if (!doc.exists)
      return NextResponse.json(
        { error: "Documento no encontrado" },
        { status: 404 }
      );

    return NextResponse.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching document" },
      { status: 500 }
    );
  }
}

// PATCH por ID
export async function PATCH(
  req: Request,
  { params }: { params: { collection: string; id: string } }
) {
  try {
    const { collection, id } = params;
    const body = await req.json();
    await db.collection(collection).doc(id).update(body);
    return NextResponse.json({ id, ...body });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error updating document" },
      { status: 500 }
    );
  }
}

// DELETE por ID
export async function DELETE(
  req: Request,
  { params }: { params: { collection: string; id: string } }
) {
  try {
    const { collection, id } = params;
    await db.collection(collection).doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error deleting document" },
      { status: 500 }
    );
  }
}
