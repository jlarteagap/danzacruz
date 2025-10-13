"use client";
import { login } from "@/lib/actions/auth";

export const LoginButton = () => {
  return (
    <button
      onClick={() => login()}
      className='
        inline-flex items-center gap-3 
        px-6 py-3 
        bg-[#63f7df] 
        text-neutral-900 font-semibold 
        rounded-2xl
        shadow-sm hover:shadow-md 
        hover:scale-105 
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-[#fdf770]
      '
    >
      <span>Registrarse</span>
      {/* Indicador animado sutil */}
      <div className='w-2 h-2 bg-white rounded-full animate-ping' />
    </button>
  );
};
