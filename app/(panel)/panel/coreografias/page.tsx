"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { PageHeader } from "./_components/page-header";
import { StatsCards } from "./_components/stats-cards";
import { FiltersBar } from "./_components/filters-bar";
import { GlobalSearchCommand } from "./_components/global-search-command";
import { TableWrapper } from "./_components/table-wrapper";
import { ChoreographiesTable } from "./_components/choreographies-table";
import { ChoreographySheet } from "./_components/choreography-sheet";
// import { ChoreographyEditSheet } from "./_components/choreography-edit-sheet";
import { DeleteAlertDialog } from "./_components/delete-alert-dialog";
import { createColumns } from "./_components/table-columns";
import { useFlatChoreographies } from "./_hooks/use-flat-choreographies";
import { exportToCSV } from "./_lib/export-excel";
import type { FlattenedChoreography } from "./_types";
import { Separator } from "@/components/ui/separator";

/**
 * Página principal de gestión de coreografías
 *
 * Arquitectura:
 * - Hook principal: useFlatChoreographies (maneja data + filtros + stats)
 * - Componentes presentacionales: reciben data y callbacks
 * - Estado de modales: centralizado en esta página
 *
 * Features:
 * ✅ Vista de estadísticas (cards superiores)
 * ✅ Filtros multi-criterio (categoría, división, modalidad)
 * ✅ Búsqueda global (inline + cmdk con ⌘K)
 * ✅ Tabla con TanStack + Shadcn
 * ✅ CRUD completo (ver, editar, eliminar)
 * ✅ Exportación a CSV
 * ✅ Optimistic updates con React Query
 */
export default function ChoreographiesPage() {
  const queryClient = useQueryClient();

  // Hook principal con toda la lógica de datos
  const {
    data,
    allData,
    isLoading,
    filters,
    setFilters,
    globalSearch,
    setGlobalSearch,
    resetFilters,
    filterOptions,
    stats,
    hasActiveFilters,
  } = useFlatChoreographies();

  // Estados de los modales/sheets
  const [viewSheet, setViewSheet] = useState<{
    isOpen: boolean;
    choreography: FlattenedChoreography | null;
  }>({
    isOpen: false,
    choreography: null,
  });

  const [editSheet, setEditSheet] = useState<{
    isOpen: boolean;
    choreography: FlattenedChoreography | null;
  }>({
    isOpen: false,
    choreography: null,
  });

  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    choreography: FlattenedChoreography | null;
  }>({
    isOpen: false,
    choreography: null,
  });

  // Handlers para acciones de tabla
  const handleView = (choreography: FlattenedChoreography) => {
    setViewSheet({ isOpen: true, choreography });
  };

  const handleEdit = (choreography: FlattenedChoreography) => {
    setEditSheet({ isOpen: true, choreography });
  };

  const handleDelete = (choreography: FlattenedChoreography) => {
    setDeleteDialog({ isOpen: true, choreography });
  };

  // Handler para búsqueda rápida (cmdk)
  const handleSearchSelect = (choreography: FlattenedChoreography) => {
    setViewSheet({ isOpen: true, choreography });
  };

  // Handler para exportar
  const handleExport = () => {
    exportToCSV(data);
  };

  // Handler para refrescar datos
  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["registrations"] });
  };

  // Crear columnas con callbacks
  const columns = createColumns(handleView, handleEdit, handleDelete);

  return (
    <div className='container mx-auto space-y-8 py-8 px-4 sm:px-6 lg:px-8'>
      {/* Header */}
      <PageHeader onRefresh={handleRefresh} isRefreshing={isLoading} />

      <Separator />

      {/* Stats Cards */}
      <StatsCards stats={stats} isLoading={isLoading} />

      {/* Búsqueda global + Filtros */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4'>
        <GlobalSearchCommand data={allData} onSelect={handleSearchSelect} />

        <div className='flex-1'>
          <FiltersBar
            filters={filters}
            onFiltersChange={setFilters}
            filterOptions={filterOptions}
            hasActiveFilters={hasActiveFilters}
            onReset={resetFilters}
            onExport={handleExport}
            totalResults={data.length}
          />
        </div>
      </div>

      {/* Tabla principal */}
      <ChoreographiesTable
        data={data}
        columns={columns}
        isLoading={isLoading}
      />

      {/* Modales/Sheets condicionales */}
      {viewSheet.choreography && (
        <ChoreographySheet
          choreography={viewSheet.choreography}
          isOpen={viewSheet.isOpen}
          onClose={() => setViewSheet({ isOpen: false, choreography: null })}
        />
      )}

      {/* {editSheet.choreography && (
        <ChoreographyEditSheet
          choreography={editSheet.choreography}
          isOpen={editSheet.isOpen}
          onClose={() => setEditSheet({ isOpen: false, choreography: null })}
        />
      )} */}

      {deleteDialog.choreography && (
        <DeleteAlertDialog
          choreography={deleteDialog.choreography}
          isOpen={deleteDialog.isOpen}
          onClose={() => setDeleteDialog({ isOpen: false, choreography: null })}
        />
      )}
    </div>
  );
}
