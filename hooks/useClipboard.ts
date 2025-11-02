// hooks/useClipboard.ts
"use client";

import { useState } from "react";

/**
 * Hook personalizado para manejo de clipboard con feedback
 * @returns {Object} - copied state y función copyToClipboard
 */
export function useClipboard() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (err) {
      console.error("Error al copiar:", err);
      return false;
    }
  };

  return { copied, copyToClipboard };
}
