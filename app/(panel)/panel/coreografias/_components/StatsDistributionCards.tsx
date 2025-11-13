"use client";

import { Calendar, Grid3x3, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsProgressBar, StatsProgressBarSkeleton } from "./StatsProgressBar";
import type { ChoreographyStats } from "../_types";

interface StatsDistributionCardsProps {
  stats: ChoreographyStats;
  isLoading?: boolean;
}

export const StatsDistributionCards = ({
  stats,
  isLoading,
}: StatsDistributionCardsProps) => {
  if (isLoading) {
    return <StatsDistributionCardsSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* División por Edad */}
      <Card className="overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-sm font-medium text-slate-600">
            División por Edad
          </CardTitle>
          <div className="rounded-lg bg-blue-50 p-2">
            <Calendar className="h-4 w-4 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {stats.divisionDistribution.length > 0 ? (
            stats.divisionDistribution.map((item) => (
              <StatsProgressBar
                key={item.label}
                label={item.label}
                percentage={item.percentage}
                value={item.count}
              />
            ))
          ) : (
            <p className="text-sm text-slate-500 text-center py-4">
              No hay datos disponibles
            </p>
          )}
        </CardContent>
      </Card>

      {/* Subdivisión */}
      <Card className="overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-sm font-medium text-slate-600">
            Subdivisión
          </CardTitle>
          <div className="rounded-lg bg-purple-50 p-2">
            <Grid3x3 className="h-4 w-4 text-purple-600" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {stats.subdivisionDistribution.length > 0 ? (
            stats.subdivisionDistribution.map((item) => (
              <StatsProgressBar
                key={item.label}
                label={item.label}
                percentage={item.percentage}
                value={item.count}
              />
            ))
          ) : (
            <p className="text-sm text-slate-500 text-center py-4">
              No hay datos disponibles
            </p>
          )}
        </CardContent>
      </Card>

      {/* Top 5 Modalidades */}
      <Card className="overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-sm font-medium text-slate-600">
            Top 5 Modalidades
          </CardTitle>
          <div className="rounded-lg bg-emerald-50 p-2">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {stats.topModalities.length > 0 ? (
            stats.topModalities.map((item, index) => (
              <StatsProgressBar
                key={item.label}
                label={`${item.label}`}
                percentage={item.percentage}
                value={item.count}
              />
            ))
          ) : (
            <p className="text-sm text-slate-500 text-center py-4">
              No hay datos disponibles
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

/**
 * Skeleton para estado de carga
 */
const StatsDistributionCardsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {[...Array(3)].map((_, cardIndex) => (
        <Card key={cardIndex} className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
            <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-200" />
          </CardHeader>
          <CardContent className="space-y-3">
            {[...Array(4)].map((_, barIndex) => (
              <StatsProgressBarSkeleton key={barIndex} />
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};