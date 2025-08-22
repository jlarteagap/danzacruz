// auth.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { CustomFirebaseAdapter } from "@/lib/firebase-adapter-custom";

const adapter = CustomFirebaseAdapter();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: {
    ...adapter,
    // Interceptar createUser para asegurar que el rol se asigne
    async createUser(user) {
      console.log("Creating user with data:", user);

      // Asegurarse de que el rol esté presente
      const userWithRole = {
        ...user,
        role: user.role || "user",
      };

      const result = await adapter.createUser(userWithRole);
      console.log("User created with role:", result.role);

      return result;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.role = user.role || "user";
      return session;
    },
    async signIn({ user, account, profile, isNewUser }) {
      console.log("SignIn callback:", {
        isNewUser,
        provider: account?.provider,
        user,
      });

      // Para nuevos usuarios de Google, actualizar el rol inmediatamente después de la creación
      if (isNewUser && account?.provider === "google") {
        try {
          // Si ya tiene un ID (ya fue creado), actualizar el rol
          if (user.id) {
            await adapter.updateUser({
              id: user.id,
              role: "user",
            });
            console.log("Role updated for new user:", user.id);
          }
        } catch (error) {
          console.error("Error updating user role:", error);
        }
      }

      return true;
    },
  },
  events: {
    async createUser({ user }) {
      console.log("User created event:", user);
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
