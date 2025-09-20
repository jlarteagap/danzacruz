"use client";

import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Choreography } from "@/types/userPanel.types";
import { ChoreographyCardHeader } from "./ChoreographyCardHeader";
import { ChoreographyCardContent } from "./ChoreographyCardContent";
import { ChoreographyCardActions } from "./ChoreographyCardActions";
import { ChoreographyAdditionalInfo } from "./ChoreographyAdditionalInfo";
import { ChoreographyCardSkeleton } from "./ChoreographyCardSkeleton";

interface ChoreographyCardProps {
  choreography: Choreography & { status: boolean };
  participantName: string;
  onDelete: (id: string) => Promise<boolean>;
  onEdit?: (choreography: Choreography) => void;
  isLoading?: boolean;
}

const ChoreographyCard: FC<ChoreographyCardProps> = ({
  choreography,
  participantName,
  onDelete,
  onEdit,
  isLoading = false,
}) => {
  const isApproved = choreography.status;

  const handleDelete = async () => {
    await onDelete(choreography.id);
  };

  if (isLoading) {
    return <ChoreographyCardSkeleton />;
  }

  return (
    <Card
      className={`
      relative overflow-hidden backdrop-blur-xl border transition-all duration-500 ease-out
      hover:scale-[1.02] hover:shadow-2xl rounded-2xl mb-6 group
      ${
        isApproved
          ? "bg-white/90 border-white/20 shadow-lg hover:shadow-blue-500/10"
          : "bg-gray-50/80 border-gray-200/50 shadow-sm"
      }
    `}
    >
      <CardContent className='p-6'>
        <ChoreographyCardHeader status={choreography.status} />

        <div className='flex flex-col md:flex-row md:justify-between items-start md:items-center'>
          <div className='flex-1'>
            <ChoreographyCardContent
              choreography={choreography}
              participantName={participantName}
            />
            <ChoreographyAdditionalInfo
              clarification={choreography.clarification}
              extra={choreography.extra}
              isApproved={isApproved}
            />
          </div>

          <ChoreographyCardActions
            choreographyId={choreography.id}
            choreographyName={choreography.name}
            isApproved={isApproved}
            onDelete={handleDelete}
            onEdit={onEdit ? () => onEdit(choreography) : undefined}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChoreographyCard;
