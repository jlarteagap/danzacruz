import { auth } from "@/auth";
import { db } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { role } = await request.json();
    const { userId } = params;

    if (!["admin", "moderator", "user"].includes(role)) {
      return NextResponse.json({ error: "Rol inválido" }, { status: 400 });
    }

    await db.collection("users").doc(userId).update({
      role: role,
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Rol actualizado correctamente",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
