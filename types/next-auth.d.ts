import NextAuth, { DefaultSession } from "next-auth";

// 👇 Extiende los tipos por defecto de NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      role?: string; // ✅ añadimos role aquí
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
    role?: string; // ✅ añadimos role aquí también
  }
}
