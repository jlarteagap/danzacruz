"use client";
import { login } from "@/lib/actions/auth";

export const LoginButton = () => {
  return (
    <button
      onClick={() => login()}
      className='bg-blue-500 text-white px-4 py-2 rounded'
    >
      Registrarse
    </button>
  );
};
