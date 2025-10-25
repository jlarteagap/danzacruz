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
export async function GET(
  req: Request,
  { params }: { params: Promise<{ collection: string; id: string }> }
) {
  try {
    const { collection, id } = await params;

    // Debug: verificar que los parámetros lleguen correctamente
    console.log("Collection:", collection);
    console.log("ID:", id);

    // Validar que los parámetros no estén vacíos
    if (!collection || !id) {
      return NextResponse.json(
        { error: "Collection and ID are required" },
        { status: 400 }
      );
    }

    // Obtener el documento específico por ID
    const docRef = db.collection(collection).doc(id);
    const doc = await docRef.get();

    // Verificar si el documento existe
    if (!doc.exists) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    // Retornar el documento con su ID
    const document = {
      id: doc.id,
      ...doc.data(),
    };

    return NextResponse.json(document, { status: 200 });
  } catch (error) {
    console.error("Error completo:", error);
    return NextResponse.json(
      { error: "Error fetching document" },
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
