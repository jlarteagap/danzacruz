import React from "react";
import { PanelJudgeCard } from "./PanelJuradoCard";
import { EmptyState } from "../EmptyState";
import { Judge } from "../../types/judges.types";

interface JudgeListProps {
  judges: Judge[];
  onEdit: (judge: Judge) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onAddClick: () => void;
}

export const PanelJudgeList: React.FC<JudgeListProps> = ({
  judges,
  onEdit,
  onDelete,
  onToggleStatus,
  onAddClick,
}) => {
  if (judges.length === 0) {
    return <EmptyState onAddClick={onAddClick} />;
  }

  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {judges.map((judge) => (
        <PanelJudgeCard
          key={judge.id}
          judge={judge}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
};
