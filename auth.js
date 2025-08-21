// auth.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirebaseDynamicAdapter } from "@/lib/firebase-adapter-dinamic";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // NO pasar la instancia db del cliente, el adapter se encarga de Firebase Admin
  adapter: FirebaseDynamicAdapter(),
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
    async signIn({ user, account, profile }) {
      // El adapter ya maneja la inicialización de Firebase Admin
      return true;
    },
  },
});
