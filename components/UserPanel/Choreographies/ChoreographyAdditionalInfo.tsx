import { FC } from "react";
import { ChevronDown, Info, Plus } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

interface ChoreographyAdditionalInfoProps {
  clarification?: string;
  extra?: string;
  isApproved: boolean;
}

export const ChoreographyAdditionalInfo: FC<
  ChoreographyAdditionalInfoProps
> = ({ clarification, extra, isApproved }) => {
  if (!clarification && !extra) return null;

  return (
    <Collapsible className='mt-4'>
      <CollapsibleTrigger asChild>
        <Button
          variant='ghost'
          className={`
            w-full justify-between p-3 h-auto text-left transition-all duration-200
            hover:bg-gray-50 rounded-xl
            ${isApproved ? "text-gray-700" : "text-gray-500"}
          `}
        >
          <div className='flex items-center gap-2'>
            <Info className='w-4 h-4' />
            <span className='text-sm font-medium'>Información adicional</span>
          </div>
          <ChevronDown className='h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180' />
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className='space-y-3 pt-2'>
        {clarification && (
          <div
            className={`
            rounded-xl p-4 transition-colors duration-300
            ${
              isApproved
                ? "bg-blue-50 border border-blue-200"
                : "bg-gray-100 border border-gray-200"
            }
          `}
          >
            <div className='flex items-center gap-2 mb-2'>
              <Info
                className={`w-4 h-4 ${
                  isApproved ? "text-blue-600" : "text-gray-500"
                }`}
              />
              <p
                className={`
                text-xs font-semibold uppercase tracking-wider
                ${isApproved ? "text-blue-600" : "text-gray-500"}
              `}
              >
                Aclaración
              </p>
            </div>
            <p
              className={`
              text-sm leading-relaxed
              ${isApproved ? "text-blue-800" : "text-gray-600"}
            `}
            >
              {clarification}
            </p>
          </div>
        )}

        {extra && (
          <div
            className={`
            rounded-xl p-4 transition-colors duration-300
            ${
              isApproved
                ? "bg-purple-50 border border-purple-200"
                : "bg-gray-100 border border-gray-200"
            }
          `}
          >
            <div className='flex items-center gap-2 mb-2'>
              <Plus
                className={`w-4 h-4 ${
                  isApproved ? "text-purple-600" : "text-gray-500"
                }`}
              />
              <p
                className={`
                text-xs font-semibold uppercase tracking-wider
                ${isApproved ? "text-purple-600" : "text-gray-500"}
              `}
              >
                Información adicional
              </p>
            </div>
            <p
              className={`
              text-sm leading-relaxed
              ${isApproved ? "text-purple-800" : "text-gray-600"}
            `}
            >
              {extra}
            </p>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};
