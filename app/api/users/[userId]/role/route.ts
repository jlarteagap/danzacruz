import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { USER_ROLES } from "@/types/user.types";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await req.json();
    const { userId } = params;
    const { role } = body;

    // Validación simple del rol
    const validRoles = Object.values(USER_ROLES);
    if (!role || !validRoles.includes(role)) {
      return NextResponse.json(
        { error: "Rol inválido. Debe ser: admin, jurado, coordinador o user" },
        { status: 400 }
      );
    }

    // Actualizar solo el campo 'role'
    await db.collection("users").doc(userId).update({
      role,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        userId,
        role,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating user role:", error);

    // Manejar error de documento no encontrado
    if (error.code === 5) {
      // NOT_FOUND en Firestore
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Error al actualizar rol del usuario" },
      { status: 500 }
    );
  }
}
