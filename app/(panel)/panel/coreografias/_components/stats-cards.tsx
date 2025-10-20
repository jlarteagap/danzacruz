"use client";

import { Users, Layers, TrendingUp, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChoreographyStats } from "../_types";

interface StatsCardsProps {
  stats: ChoreographyStats;
  isLoading?: boolean;
}

export const StatsCards = ({ stats, isLoading }: StatsCardsProps) => {
  if (isLoading) {
    return <StatsCardsSkeleton />;
  }

  const cards = [
    {
      title: "Total Participantes",
      value: stats.totalParticipants,
      icon: Users,
      description: "Registrados en el sistema",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Coreografías",
      value: stats.totalChoreographies,
      icon: Layers,
      description: "En todas las categorías",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Categoría Popular",
      value: stats.topCategory,
      subtitle: `${stats.categoriesCount[stats.topCategory] || 0} coreografías`,
      icon: TrendingUp,
      description: "Más registrada",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "División Popular",
      value: stats.topDivision,
      subtitle: `${stats.divisionsCount[stats.topDivision] || 0} coreografías`,
      icon: Award,
      description: "Más competida",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      {cards.map((card, index) => (
        <Card
          key={index}
          className='overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5'
        >
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-slate-600'>
              {card.title}
            </CardTitle>
            <div className={`rounded-lg p-2 ${card.bgColor}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-1'>
              <div className='flex items-baseline gap-2'>
                <p className='text-2xl font-bold tracking-tight text-slate-900'>
                  {card.value}
                </p>
                {card.subtitle && (
                  <p className='text-xs font-medium text-slate-500'>
                    {card.subtitle}
                  </p>
                )}
              </div>
              <p className='text-xs text-slate-500'>{card.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const StatsCardsSkeleton = () => {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      {[...Array(4)].map((_, i) => (
        <Card key={i} className='overflow-hidden'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <div className='h-4 w-24 animate-pulse rounded bg-slate-200' />
            <div className='h-8 w-8 animate-pulse rounded-lg bg-slate-200' />
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div className='h-8 w-16 animate-pulse rounded bg-slate-200' />
              <div className='h-3 w-32 animate-pulse rounded bg-slate-200' />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
