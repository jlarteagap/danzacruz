// app/dashboard/participantes/_components/data-table-toolbar.tsx
"use client";

import { Table } from "@tanstack/react-table";
import { X, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { useState } from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  selectedIds: string[];
}

export function DataTableToolbar<TData>({
  table,
  selectedIds,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  // Opciones de filtro
  const categories = Array.from(
    table.getColumn("category")?.getFacetedUniqueValues()?.keys() ?? []
  ).map((value) => ({
    label: value as string,
    value: value as string,
  }));

  const divisions = Array.from(
    table.getColumn("division")?.getFacetedUniqueValues()?.keys() ?? []
  ).map((value) => ({
    label: value as string,
    value: value as string,
  }));

  const handleExport = () => {
    const rows = table.getFilteredRowModel().rows;
    const data = rows.map((row) => row.original);

    // Convertir a CSV
    const headers = ["Nombre", "Categoría", "División"];
    const csvContent = [
      headers.join(","),
      ...data.map((item: any) =>
        [item.name, item.category, item.division].join(",")
      ),
    ].join("\n");

    // Descargar
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `participantes_${new Date().getTime()}.csv`);
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
          {table.getColumn("category") && (
            <DataTableFacetedFilter
              column={table.getColumn("category")}
              title='Categoría'
              options={categories}
            />
          )}
          {table.getColumn("division") && (
            <DataTableFacetedFilter
              column={table.getColumn("division")}
              title='División'
              options={divisions}
            />
          )}

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
