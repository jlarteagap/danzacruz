"use client";

import { cn } from "@/lib/utils";

interface StatsProgressBarProps {
  label: string;
  percentage: number;
  value?: number;
  className?: string;
  barClassName?: string;
}

export const StatsProgressBar = ({
  label,
  percentage,
  value,
  className,
  barClassName,
}: StatsProgressBarProps) => {
  const formattedPercentage = percentage.toFixed(1);

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700 truncate pr-2">
          {label}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          {value !== undefined && (
            <span className="text-xs text-slate-500">
              {value}
            </span>
          )}
          <span className="text-xs font-semibold text-slate-600 w-12 text-right">
            {formattedPercentage}%
          </span>
        </div>
      </div>
      
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            style={{ width: `${percentage}%` }}
            className={cn(
              "h-full rounded-full bg-slate-500 transition-all duration-300",
              barClassName
            )}
          />
      </div>
    </div>
  );
};

/**
 * Versión skeleton para estado de carga
 */
export const StatsProgressBarSkeleton = () => {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-12 animate-pulse rounded bg-slate-200" />
      </div>
      <div className="h-2 w-full animate-pulse rounded-full bg-slate-200" />
    </div>
  );
};