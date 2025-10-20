"use client";

import { useState } from "react";
import { ChoreographiesTable } from "./choreographies-table";
import { createColumns } from "./table-columns";
import { ChoreographySheet } from "./choreography-sheet";
// import { ChoreographyEditSheet } from "./choreography-edit-sheet";
import { DeleteAlertDialog } from "./delete-alert-dialog";
import { useFlatChoreographies } from "../_hooks/use-flat-choreographies";
import type { FlattenedChoreography } from "../_types";

/**
 * Wrapper que maneja el estado de los modales/sheets
 * Implementa el patrón de composición para separar lógica de UI
 */
export const TableWrapper = () => {
  const { data, isLoading } = useFlatChoreographies();

  // Estados de los modales
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

  // Handlers
  const handleView = (choreography: FlattenedChoreography) => {
    setViewSheet({ isOpen: true, choreography });
  };

  const handleEdit = (choreography: FlattenedChoreography) => {
    setEditSheet({ isOpen: true, choreography });
  };

  const handleDelete = (choreography: FlattenedChoreography) => {
    setDeleteDialog({ isOpen: true, choreography });
  };

  const columns = createColumns(handleView, handleEdit, handleDelete);

  return (
    <>
      <ChoreographiesTable
        data={data}
        columns={columns}
        isLoading={isLoading}
      />

      {/* Sheet de detalles */}
      {viewSheet.choreography && (
        <ChoreographySheet
          choreography={viewSheet.choreography}
          isOpen={viewSheet.isOpen}
          onClose={() => setViewSheet({ isOpen: false, choreography: null })}
        />
      )}

      {/* Sheet de edición */}
      {/* {editSheet.choreography && (
        <ChoreographyEditSheet
          choreography={editSheet.choreography}
          isOpen={editSheet.isOpen}
          onClose={() => setEditSheet({ isOpen: false, choreography: null })}
        />
      )} */}

      {/* Dialog de confirmación */}
      {/* {deleteDialog.choreography && (
        <DeleteAlertDialog
          choreography={deleteDialog.choreography}
          isOpen={deleteDialog.isOpen}
          onClose={() => setDeleteDialog({ isOpen: false, choreography: null })}
        />
      )} */}
    </>
  );
};
