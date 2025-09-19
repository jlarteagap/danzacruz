import { FC } from "react";
import { Check, Clock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface ChoreographyCardHeaderProps {
  status: boolean;
}

export const ChoreographyCardHeader: FC<ChoreographyCardHeaderProps> = ({
  status,
}) => {
  const isApproved = status;

  return (
    <div className='absolute top-4 right-4 md:top-6 md:right-6'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge
              variant={isApproved ? "default" : "secondary"}
              className={`
                flex items-center gap-2 px-3 py-1.5 text-xs font-semibold
                transition-all duration-300 cursor-help
                ${
                  isApproved
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                    : "bg-gray-300 hover:bg-gray-400 text-gray-700"
                }
              `}
            >
              {isApproved ? (
                <>
                  <Check className='w-3 h-3' />
                  <span>APROBADO</span>
                </>
              ) : (
                <>
                  <Clock className='w-3 h-3' />
                  <span>PENDIENTE</span>
                </>
              )}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {isApproved
                ? "Esta coreografía ha sido aprobada por el comité artístico"
                : "Esperando aprobación del comité artístico"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
