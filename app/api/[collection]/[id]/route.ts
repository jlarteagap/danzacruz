import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

// POST: crear un nuevo documento en la colección
export async function POST(
  req: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  try {
    const body = await req.json();
    const { collection } = await params;

    const docRef = await db.collection(collection).add(body);

    return NextResponse.json({ id: docRef.id, ...body }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating document" },
      { status: 500 }
    );
  }
}
// GET: obtener todos los documentos de una colección
export async function GET(
  req: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  try {
    const { collection } = await params;
    const snapshot = await db.collection(collection).get();

    const documents = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(documents, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching documents" },
      { status: 500 }
    );
  }
}
export async function DELETE(
  req: Request,

  { params }: { params: Promise<{ collection: string; id: string }> }
) {
  const { collection, id } = await params;
  await db.collection(collection).doc(id).delete();
  return NextResponse.json({ success: true });
}
