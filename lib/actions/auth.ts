"use server";

import { signIn, signOut } from "@/auth";

export const login = async () => {
  // Redirigir directamente al panel, AuthRedirectHandler se encargará del resto
  await signIn("google", { redirectTo: "/panel" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
