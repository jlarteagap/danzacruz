import { NextResponse } from "next/server";

const API_BASE = process.env.API_BASE_URL || "http://localhost:3000/api";

export async function GET() {
  try {
    // 🚀 Lanzamos todas las llamadas en paralelo
    const [users, participants, choreographies] = await Promise.all([
      fetch(`${API_BASE}/users`)
        .then((r) => r.json())
        .catch(() => []),
      fetch(`${API_BASE}/participants`)
        .then((r) => r.json())
        .catch(() => []),
      fetch(`${API_BASE}/choreographies`)
        .then((r) => r.json())
        .catch(() => []),
    ]);

    return NextResponse.json({
      users: users ?? [],
      participants: participants ?? [],
      choreographies: choreographies ?? [],
    });
    // 👌 Respondemos en un solo JSON consolidado
  } catch (error: any) {
    return NextResponse.json(
      { users: [], participants: [], choreographies: [] },
      { status: 500 }
    );
  }
}
