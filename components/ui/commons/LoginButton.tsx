"use client";
import { login } from "@/lib/actions/auth";

export const LoginButton = () => {
  return (
    <button
      onClick={() => login()}
      className='inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 rounded-full text-white font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300'
    >
      <span>Registrarse</span>
      <div className='w-2 h-2 bg-white rounded-full animate-pulse' />
    </button>
  );
};
