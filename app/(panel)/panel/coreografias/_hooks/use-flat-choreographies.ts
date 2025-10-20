import { useMemo, useState } from "react";
import { useRegistrations } from "./use-registrations";
import {
  flattenChoreographies,
  getUniqueFilterValues,
  calculateStats,
} from "../_lib/flatten-data";
import type { ChoreographyFilters, FlattenedChoreography } from "../_types";

/**
 * Hook principal que combina:
 * - Fetch de datos
 * - Transformación a formato plano
 * - Filtros reactivos
 * - Búsqueda global
 * - Estadísticas calculadas
 */
export const useFlatChoreographies = () => {
  const { data: registrations, isLoading, error } = useRegistrations();

  const [filters, setFilters] = useState<ChoreographyFilters>({
    category: [],
    division: [],
    modality: [],
  });

  const [globalSearch, setGlobalSearch] = useState("");

  // Transformar datos
  const flattenedData = useMemo(() => {
    if (!registrations) return [];
    return flattenChoreographies(registrations);
  }, [registrations]);

  // Aplicar filtros
  const filteredData = useMemo(() => {
    let result = flattenedData;

    // Filtros por categoría, división, modalidad
    if (filters.category.length > 0) {
      result = result.filter((c) => filters.category.includes(c.category));
    }

    if (filters.division.length > 0) {
      result = result.filter((c) => filters.division.includes(c.division));
    }

    if (filters.modality.length > 0) {
      result = result.filter((c) => filters.modality.includes(c.modality));
    }

    // Búsqueda global (case-insensitive)
    if (globalSearch.trim()) {
      const search = globalSearch.toLowerCase();
      result = result.filter(
        (c) =>
          c.participantName.toLowerCase().includes(search) ||
          c.choreographyName.toLowerCase().includes(search) ||
          c.choreographer.toLowerCase().includes(search) ||
          c.musicName.toLowerCase().includes(search)
      );
    }

    return result;
  }, [flattenedData, filters, globalSearch]);

  // Valores únicos para filtros
  const filterOptions = useMemo(
    () => getUniqueFilterValues(flattenedData),
    [flattenedData]
  );

  // Estadísticas (calculadas sobre datos filtrados)
  const stats = useMemo(() => calculateStats(filteredData), [filteredData]);

  const resetFilters = () => {
    setFilters({
      category: [],
      division: [],
      modality: [],
    });
    setGlobalSearch("");
  };

  return {
    data: filteredData,
    allData: flattenedData,
    isLoading,
    error,
    filters,
    setFilters,
    globalSearch,
    setGlobalSearch,
    resetFilters,
    filterOptions,
    stats,
    hasActiveFilters:
      filters.category.length > 0 ||
      filters.division.length > 0 ||
      filters.modality.length > 0 ||
      globalSearch.trim().length > 0,
  };
};
