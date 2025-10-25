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
// PATCH - Actualización parcial de un documento
export async function PATCH(
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

    // Obtener el body de la petición
    const body = await req.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: "Request body is required" },
        { status: 400 }
      );
    }

    // Referencia al documento
    const docRef = db.collection(collection).doc(id);
    const doc = await docRef.get();

    // Verificar si el documento existe
    if (!doc.exists) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    // Actualizar parcialmente el documento (solo los campos enviados)
    await docRef.update(body);

    // Obtener el documento actualizado
    const updatedDoc = await docRef.get();
    const document = {
      id: updatedDoc.id,
      ...updatedDoc.data(),
    };

    return NextResponse.json(document, { status: 200 });
  } catch (error) {
    console.error("Error completo:", error);
    return NextResponse.json(
      { error: "Error updating document" },
      { status: 500 }
    );
  }
}

// PUT - Reemplazo completo de un documento
export async function PUT(
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

    // Obtener el body de la petición
    const body = await req.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: "Request body is required" },
        { status: 400 }
      );
    }

    // Referencia al documento
    const docRef = db.collection(collection).doc(id);

    // Reemplazar completamente el documento (set con merge: false)
    // Si el documento no existe, lo crea
    await docRef.set(body);

    // Obtener el documento actualizado
    const updatedDoc = await docRef.get();
    const document = {
      id: updatedDoc.id,
      ...updatedDoc.data(),
    };

    return NextResponse.json(document, { status: 200 });
  } catch (error) {
    console.error("Error completo:", error);
    return NextResponse.json(
      { error: "Error replacing document" },
      { status: 500 }
    );
  }
}
