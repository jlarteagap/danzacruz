import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

type RouteContext = {
  params: Promise<{ collection: string }>;
};

// POST: crear un nuevo documento en la colección
export async function POST(req: Request, context: RouteContext) {
  try {
    const body = await req.json();
    const { collection } = await context.params;

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
export async function GET(req: Request, context: RouteContext) {
  try {
    const { collection } = await context.params;
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
