// app/api/user/complete-profile/route.js
import { auth } from "@/auth";
import { CustomFirebaseAdapter } from "@/lib/firebase-adapter-custom";

const adapter = CustomFirebaseAdapter();

export async function POST(request) {
  try {
    // Verificar autenticación
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { userId, firstName, lastName, phone, dateOfBirth, ...otherFields } =
      body;

    // Verificar que el usuario está actualizando su propio perfil
    if (session.user.id !== userId) {
      return Response.json({ error: "No autorizado" }, { status: 403 });
    }

    // Preparar datos de actualización
    const updateData = {
      id: userId,
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      phone: phone?.trim(),
      dateOfBirth,
      profileComplete: true,
      profileCompletedAt: new Date(),
      ...otherFields,
    };

    // Actualizar en Firebase
    const updatedUser = await adapter.updateUser(updateData);

    return Response.json({
      success: true,
      message: "Perfil actualizado correctamente",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error al completar perfil:", error);
    return Response.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
