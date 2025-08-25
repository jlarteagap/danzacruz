// auth.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { CustomFirebaseAdapter } from "@/lib/firebase-adapter-custom";

const adapter = CustomFirebaseAdapter();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: {
    ...adapter,
    // Interceptar createUser para asegurar que el rol y status se asignen
    async createUser(user) {
      console.log("Creating user with data:", user);

      // Asegurarse de que el rol y profileComplete estén presentes
      const userWithDefaults = {
        ...user,
        role: user.role || "user",
        profileComplete: false, // Nuevo campo para indicar perfil incompleto
      };

      const result = await adapter.createUser(userWithDefaults);
      console.log("User created with role and status:", {
        role: result.role,
        profileComplete: result.profileComplete,
      });

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
      session.user.profileComplete = user.profileComplete || false;
      return session;
    },

    async signIn({ user, account, profile, isNewUser }) {
      console.log("SignIn callback:", {
        isNewUser,
        provider: account?.provider,
        user,
      });

      // Para nuevos usuarios de Google, actualizar campos después de la creación
      if (isNewUser && account?.provider === "google") {
        try {
          if (user.id) {
            await adapter.updateUser({
              id: user.id,
              role: "user",
              profileComplete: false,
            });
            console.log("User defaults set for new user:", user.id);
          }
        } catch (error) {
          console.error("Error updating user defaults:", error);
        }
      }

      return true;
    },

    // Callback para manejar redirecciones - simplificado
    async redirect({ url, baseUrl }) {
      // Si es después de login, siempre ir al panel
      // La lógica de verificar profileComplete se manejará en el cliente
      if (url.startsWith("/api/auth/signin") || url === baseUrl) {
        return `${baseUrl}/panel`;
      }

      // Si la URL es relativa, hacerla absoluta
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      // Si la URL pertenece al mismo origen, permitirla
      if (new URL(url).origin === baseUrl) {
        return url;
      }

      // Por defecto, redirigir al baseUrl
      return baseUrl;
    },
  },

  events: {
    async createUser({ user }) {
      console.log("User created event:", user);
    },
  },
});
