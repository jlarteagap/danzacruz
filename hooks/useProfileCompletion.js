"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function useProfileCompletion() {
  const [isViewMode, setIsViewMode] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const viewMode = searchParams.get("view") === "true";
    setIsViewMode(viewMode);
  }, [searchParams]);

  const toggleViewMode = (mode) => {
    setIsViewMode(mode);
  };

  return {
    isViewMode,
    toggleViewMode,
  };
}
