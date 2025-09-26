import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface PanelWorkshopHeaderProps {
  onOpen: () => void;
}

const PanelWorkshopHeader = ({ onOpen }: PanelWorkshopHeaderProps) => {
  return (
    <header className='flex justify-between items-center'>
      <h1 className='text-2xl font-bold'>Talleres</h1>
      <Button
        onClick={onOpen}
        className='bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer'
      >
        <Plus className='mr-2' />
        Agregar Taller
      </Button>
    </header>
  );
};

export default PanelWorkshopHeader;
