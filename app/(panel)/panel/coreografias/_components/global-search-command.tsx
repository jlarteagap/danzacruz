"use client";

import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Search, User, Music } from "lucide-react";
import type { FlattenedChoreography } from "../_types";

interface GlobalSearchCommandProps {
  data: FlattenedChoreography[];
  onSelect: (choreography: FlattenedChoreography) => void;
}

export const GlobalSearchCommand = ({
  data,
  onSelect,
}: GlobalSearchCommandProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Atajo de teclado ⌘K / Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Filtrar resultados
  const filteredResults = data.filter((choreo) => {
    const searchLower = search.toLowerCase();
    return (
      choreo.participantName.toLowerCase().includes(searchLower) ||
      choreo.choreographyName.toLowerCase().includes(searchLower) ||
      choreo.choreographer.toLowerCase().includes(searchLower) ||
      choreo.musicName.toLowerCase().includes(searchLower) ||
      choreo.category.toLowerCase().includes(searchLower)
    );
  });

  const handleSelect = (choreography: FlattenedChoreography) => {
    setOpen(false);
    setSearch("");
    onSelect(choreography);
  };

  return (
    <>
      {/* Botón trigger */}
      <button
        onClick={() => setOpen(true)}
        className='inline-flex h-9 items-center justify-between rounded-md border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 shadow-sm hover:bg-slate-50 transition-colors w-full sm:w-64'
      >
        <div className='flex items-center gap-2'>
          <Search className='h-4 w-4' />
          <span>Búsqueda rápida...</span>
        </div>
        <kbd className='pointer-events-none hidden h-5 select-none items-center gap-1 rounded border border-slate-200 bg-slate-100 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
          <span className='text-xs'>⌘</span>K
        </kbd>
      </button>

      {/* Dialog de búsqueda */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder='Buscar por participante, coreografía, coreógrafo...'
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          <CommandEmpty>
            <div className='flex flex-col items-center justify-center py-8 text-slate-500'>
              <Search className='mb-2 h-8 w-8 text-slate-300' />
              <p className='text-sm'>No se encontraron resultados</p>
            </div>
          </CommandEmpty>

          {filteredResults.length > 0 && (
            <CommandGroup
              heading={`${filteredResults.length} resultado${
                filteredResults.length === 1 ? "" : "s"
              }`}
            >
              {filteredResults.slice(0, 10).map((choreo) => (
                <CommandItem
                  key={choreo.choreographyId}
                  onSelect={() => handleSelect(choreo)}
                  className='cursor-pointer'
                >
                  <div className='flex flex-col gap-1 flex-1'>
                    <div className='flex items-center gap-2'>
                      <User className='h-4 w-4 text-slate-400' />
                      <span className='font-medium text-slate-900'>
                        {choreo.participantName}
                      </span>
                      <Badge variant='outline' className='text-xs'>
                        {choreo.category}
                      </Badge>
                    </div>
                    <div className='flex items-center gap-2 text-sm text-slate-500 ml-6'>
                      <Music className='h-3 w-3' />
                      <span className='truncate'>
                        {choreo.choreographyName}
                      </span>
                    </div>
                  </div>
                </CommandItem>
              ))}

              {filteredResults.length > 10 && (
                <div className='px-2 py-3 text-center text-xs text-slate-500'>
                  Y {filteredResults.length - 10} resultado
                  {filteredResults.length - 10 === 1 ? "" : "s"} más...
                </div>
              )}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};
