"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Filter, X, Download } from "lucide-react";
import type { ChoreographyFilters } from "../_types";

interface FiltersBarProps {
  filters: ChoreographyFilters;
  onFiltersChange: (filters: ChoreographyFilters) => void;
  filterOptions: {
    categories: string[];
    divisions: string[];
    modalities: string[];
  };
  hasActiveFilters: boolean;
  onReset: () => void;
  onExport?: () => void;
  totalResults: number;
}

export const FiltersBar = ({
  filters,
  onFiltersChange,
  filterOptions,
  hasActiveFilters,
  onReset,
  onExport,
  totalResults,
}: FiltersBarProps) => {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [divisionOpen, setDivisionOpen] = useState(false);
  const [modalityOpen, setModalityOpen] = useState(false);

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.category, category]
      : filters.category.filter((c) => c !== category);

    onFiltersChange({ ...filters, category: newCategories });
  };

  const handleDivisionChange = (division: string, checked: boolean) => {
    const newDivisions = checked
      ? [...filters.division, division]
      : filters.division.filter((d) => d !== division);

    onFiltersChange({ ...filters, division: newDivisions });
  };

  const handleModalityChange = (modality: string, checked: boolean) => {
    const newModalities = checked
      ? [...filters.modality, modality]
      : filters.modality.filter((m) => m !== modality);

    onFiltersChange({ ...filters, modality: newModalities });
  };

  const activeFiltersCount =
    filters.category.length + filters.division.length + filters.modality.length;

  return (
    <div className='space-y-4'>
      {/* Barra de filtros */}
      <div className='flex flex-wrap items-center gap-2'>
        {/* Filtro por categoría */}
        <FilterPopover
          label='Categoría'
          options={filterOptions.categories}
          selectedValues={filters.category}
          onValueChange={handleCategoryChange}
          isOpen={categoryOpen}
          onOpenChange={setCategoryOpen}
        />

        {/* Filtro por división */}
        <FilterPopover
          label='División'
          options={filterOptions.divisions}
          selectedValues={filters.division}
          onValueChange={handleDivisionChange}
          isOpen={divisionOpen}
          onOpenChange={setDivisionOpen}
        />

        {/* Filtro por modalidad */}
        <FilterPopover
          label='Modalidad'
          options={filterOptions.modalities}
          selectedValues={filters.modality}
          onValueChange={handleModalityChange}
          isOpen={modalityOpen}
          onOpenChange={setModalityOpen}
        />

        {/* Botón limpiar filtros */}
        {hasActiveFilters && (
          <Button
            variant='ghost'
            size='sm'
            onClick={onReset}
            className='h-9 text-slate-600 hover:text-slate-900'
          >
            <X className='mr-2 h-4 w-4' />
            Limpiar filtros
          </Button>
        )}

        {/* Separador */}
        <div className='ml-auto flex items-center gap-2'>
          {/* Contador de resultados */}
          <span className='text-sm text-slate-600'>
            <span className='font-medium text-slate-900'>{totalResults}</span>{" "}
            {totalResults === 1 ? "resultado" : "resultados"}
          </span>

          {/* Botón exportar */}
          {onExport && (
            <Button
              variant='outline'
              size='sm'
              onClick={onExport}
              className='h-9'
            >
              <Download className='mr-2 h-4 w-4' />
              Exportar
            </Button>
          )}
        </div>
      </div>

      {/* Badges de filtros activos */}
      {activeFiltersCount > 0 && (
        <div className='flex flex-wrap items-center gap-2'>
          <span className='text-sm font-medium text-slate-600'>
            Filtros activos:
          </span>

          {filters.category.map((category) => (
            <Badge
              key={category}
              variant='secondary'
              className='gap-1 pr-1 font-normal'
            >
              {category}
              <button
                onClick={() => handleCategoryChange(category, false)}
                className='ml-1 rounded-sm hover:bg-slate-300'
              >
                <X className='h-3 w-3' />
              </button>
            </Badge>
          ))}

          {filters.division.map((division) => (
            <Badge
              key={division}
              variant='secondary'
              className='gap-1 pr-1 font-normal'
            >
              {division}
              <button
                onClick={() => handleDivisionChange(division, false)}
                className='ml-1 rounded-sm hover:bg-slate-300'
              >
                <X className='h-3 w-3' />
              </button>
            </Badge>
          ))}

          {filters.modality.map((modality) => (
            <Badge
              key={modality}
              variant='secondary'
              className='gap-1 pr-1 font-normal'
            >
              {modality}
              <button
                onClick={() => handleModalityChange(modality, false)}
                className='ml-1 rounded-sm hover:bg-slate-300'
              >
                <X className='h-3 w-3' />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// Componente FilterPopover reutilizable
// ============================================================================
interface FilterPopoverProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onValueChange: (value: string, checked: boolean) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const FilterPopover = ({
  label,
  options,
  selectedValues,
  onValueChange,
  isOpen,
  onOpenChange,
}: FilterPopoverProps) => {
  const selectedCount = selectedValues.length;

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='h-9 border-dashed hover:bg-slate-50'
        >
          <Filter className='mr-2 h-4 w-4' />
          {label}
          {selectedCount > 0 && (
            <Separator orientation='vertical' className='mx-2 h-4' />
          )}
          {selectedCount > 0 && (
            <Badge
              variant='secondary'
              className='rounded-sm px-1 font-normal lg:hidden'
            >
              {selectedCount}
            </Badge>
          )}
          {selectedCount > 0 && (
            <div className='hidden space-x-1 lg:flex'>
              <Badge
                variant='secondary'
                className='rounded-sm px-1 font-normal'
              >
                {selectedCount} seleccionado{selectedCount > 1 ? "s" : ""}
              </Badge>
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-3 bg-white' align='start'>
        <div className='space-y-2'>
          <p className='text-sm font-medium text-slate-900 mb-3'>{label}</p>
          <div className='space-y-2 max-h-[300px] overflow-y-auto'>
            {options.length === 0 ? (
              <p className='text-sm text-slate-500 text-center py-4'>
                No hay opciones disponibles
              </p>
            ) : (
              options.map((option) => (
                <div key={option} className='flex items-center space-x-2'>
                  <Checkbox
                    id={`${label}-${option}`}
                    checked={selectedValues.includes(option)}
                    onCheckedChange={(checked) =>
                      onValueChange(option, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`${label}-${option}`}
                    className='text-sm font-normal cursor-pointer flex-1'
                  >
                    {option}
                  </Label>
                </div>
              ))
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
