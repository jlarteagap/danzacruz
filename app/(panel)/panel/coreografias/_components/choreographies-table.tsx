"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import type { FlattenedChoreography } from "../_types";

interface ChoreographiesTableProps {
  data: FlattenedChoreography[];
  columns: ColumnDef<FlattenedChoreography>[];
  isLoading?: boolean;
}

export const ChoreographiesTable = ({
  data,
  columns,
  isLoading = false,
}: ChoreographiesTableProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
  });

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (data.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className='space-y-4'>
      {/* Búsqueda rápida */}
      <div className='flex items-center gap-2'>
        <div className='relative flex-1 max-w-sm'>
          <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
          <Input
            placeholder='Buscar participante, coreografía, coreógrafo...'
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className='pl-9 pr-9'
          />
          {globalFilter && (
            <Button
              variant='ghost'
              size='icon'
              className='absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2'
              onClick={() => setGlobalFilter("")}
            >
              <X className='h-4 w-4' />
            </Button>
          )}
        </div>
      </div>

      {/* Tabla */}
      <div className='rounded-lg border border-slate-200 bg-white shadow-sm'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='hover:bg-transparent'>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className='font-semibold text-slate-700'
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className='hover:bg-slate-50 transition-colors'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='py-4'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  <div className='flex flex-col items-center justify-center text-slate-500'>
                    <Search className='mb-2 h-8 w-8 text-slate-300' />
                    <p className='text-sm'>
                      No se encontraron resultados para tu búsqueda
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer con conteo */}
      <div className='flex items-center justify-between px-2 text-sm text-slate-600'>
        <div>
          Mostrando{" "}
          <span className='font-medium text-slate-900'>
            {table.getFilteredRowModel().rows.length}
          </span>{" "}
          de <span className='font-medium text-slate-900'>{data.length}</span>{" "}
          coreografías
        </div>
      </div>
    </div>
  );
};

//============================================================================
// Skeleton Loading State
// ============================================================================
const TableSkeleton = () => {
  return (
    <div className='space-y-4'>
      {/* Búsqueda skeleton */}
      <div className='h-10 w-full max-w-sm animate-pulse rounded-md bg-slate-200' />

      {/* Tabla skeleton */}
      <div className='rounded-lg border border-slate-200 bg-white'>
        <div className='p-4'>
          {/* Header */}
          <div className='mb-4 flex gap-4'>
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className='h-5 flex-1 animate-pulse rounded bg-slate-200'
              />
            ))}
          </div>

          {/* Rows */}
          {[...Array(8)].map((_, i) => (
            <div key={i} className='mb-3 flex gap-4'>
              {[...Array(7)].map((_, j) => (
                <div
                  key={j}
                  className='h-12 flex-1 animate-pulse rounded bg-slate-100'
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// Empty State
// ============================================================================
const EmptyState = () => {
  return (
    <div className='flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center'>
      <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100'>
        <Search className='h-8 w-8 text-slate-400' />
      </div>
      <h3 className='mt-4 text-lg font-semibold text-slate-900'>
        No hay coreografías registradas
      </h3>
      <p className='mt-2 max-w-sm text-sm text-slate-500'>
        Cuando se registren participantes con coreografías, aparecerán aquí para
        su gestión.
      </p>
    </div>
  );
};
