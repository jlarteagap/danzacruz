import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

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

    if (!body.userId) {
      return NextResponse.json(
        { error: "userId es obligatorio" },
        { status: 400 }
      );
    }

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
