import NextAuth, { DefaultSession } from "next-auth";
import { UserRole } from "./user.types";

// 👇 Extiende los tipos por defecto de NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      role: UserRole;
      createdAt: string;
      phone?: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
    role?: string; // ✅ añadimos role aquí también
  }
}
