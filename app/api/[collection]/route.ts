import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

// Colecciones que NO requieren userId
const PUBLIC_COLLECTIONS = ["registrations"];

// GET: listar documentos con filtro opcional por userId
export async function GET(
  req: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  try {
    const { collection } = await params;
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    let queryRef: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
      db.collection(collection);

    if (userId) {
      queryRef = queryRef.where("userId", "==", userId);
    }

    const snapshot = await queryRef.get();
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

// POST: crear un nuevo documento
export async function POST(
  req: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  try {
    const { collection } = await params;
    const body = await req.json();

    // ✅ SOLUCIÓN: Solo validar userId si NO es una colección pública
    const isPublicCollection = PUBLIC_COLLECTIONS.includes(collection);

    if (!isPublicCollection && !body.userId) {
      return NextResponse.json(
        { error: "userId es obligatorio" },
        { status: 400 }
      );
    }

    // Agregar metadata de creación
    const docData = {
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await db.collection(collection).add(docData);

    return NextResponse.json({ id: docRef.id, ...docData }, { status: 201 });
  } catch (error) {
    console.error("Error creating document:", error);
    return NextResponse.json(
      { error: "Error creating document" },
      { status: 500 }
    );
  }
}
