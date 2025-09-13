import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

export async function POST(
  req: Request,
  { params }: { params: { collection: string } }
) {
  try {
    const body = await req.json();
    const { collection } = params;

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
// GET: traer documentos, con filtro opcional por userId
export async function GET(
  req: Request,
  { params }: { params: { collection: string } }
) {
  try {
    const { collection } = params;
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
      db.collection(collection);

    if (userId) {
      query = query.where("userId", "==", userId);
    }

    const snapshot = await query.get();

    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching collection" },
      { status: 500 }
    );
  }
}
