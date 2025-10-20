"use client";

import { Table } from "@tanstack/react-table";
import { X, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Choreography } from "@/types/userPanel.types";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  selectedIds: string[];
}

export function DataTableToolbar<TData>({
  table,
  selectedIds,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  // Opciones de filtros dinámicos
  const modalities = Array.from(
    table.getColumn("participantName")?.getFacetedUniqueValues()?.keys() ?? []
  ).map((value) => ({ label: value as string, value: value as string }));

  const statuses = Array.from(
    table.getColumn("participant")?.getFacetedUniqueValues()?.keys() ?? []
  ).map((value) => ({ label: value as string, value: value as string }));

  // Opcional: filtro por participantId
  /*
  const participants = Array.from(
    table.getColumn("participantId")?.getFacetedUniqueValues()?.keys() ?? []
  ).map((value) => ({ label: value as string, value: value as string }));
  */

  const handleExport = () => {
    const rows = table.getFilteredRowModel().rows;
    const data = rows.map((row) => row.original as Choreography);

    // Convertir a CSV
    const headers = ["Nombre", "Modalidad", "Estado"];
    const csvContent = [
      headers.join(","),
      ...data.map((item) =>
        [item.name, item.modality, item.status ? "Activa" : "Inactiva"].join(
          ","
        )
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `coreografias_${new Date().getTime()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className='flex items-center justify-between gap-2'>
        <div className='flex flex-1 items-center space-x-2'>
          <Input
            placeholder='Buscar por nombre...'
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className='h-10 w-[250px] lg:w-[300px]'
          />

          {table.getColumn("modality") && (
            <DataTableFacetedFilter
              column={table.getColumn("modality")}
              title='Modalidad'
              options={modalities}
            />
          )}

          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title='Estado'
              options={statuses}
            />
          )}

          {/* Filtro opcional por participantId */}
          {/*
          {table.getColumn("participantId") && (
            <DataTableFacetedFilter
              column={table.getColumn("participantId")}
              title='Participante'
              options={participants}
            />
          )}
          */}

          {isFiltered && (
            <Button
              variant='ghost'
              onClick={() => table.resetColumnFilters()}
              className='h-10 px-2 lg:px-3'
            >
              Limpiar
              <X className='ml-2 h-4 w-4' />
            </Button>
          )}
        </div>

        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={handleExport}
            className='h-10'
          >
            <Download className='mr-2 h-4 w-4' />
            Exportar
          </Button>
          <DataTableViewOptions table={table} />
        </div>
      </div>

      {selectedIds.length > 0 && (
        <div className='flex items-center justify-between rounded-lg border border-border bg-muted/50 p-3'>
          <div className='flex items-center space-x-2'>
            <p className='text-sm font-medium'>
              {selectedIds.length} seleccionado(s)
            </p>
          </div>
        </div>
      )}
    </>
  );
}
