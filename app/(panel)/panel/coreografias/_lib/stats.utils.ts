// _lib/stats.utils.ts

import type { DistributionItem } from "../_types";

/**
 * Formatea un número como porcentaje con decimales configurables
 */
export const formatPercentage = (
  value: number,
  decimals: number = 1
): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Obtiene un color para una barra de progreso basado en el porcentaje
 * Útil si decides implementar colores dinámicos en el futuro
 */
export const getProgressBarColor = (percentage: number): string => {
  if (percentage >= 50) return "from-slate-700 to-slate-800";
  if (percentage >= 25) return "from-slate-600 to-slate-700";
  return "from-slate-500 to-slate-600";
};

/**
 * Valida que los porcentajes de una distribución sumen aproximadamente 100%
 * Útil para debugging y tests
 */
export const validateDistribution = (
  distribution: DistributionItem[]
): boolean => {
  const total = distribution.reduce((sum, item) => sum + item.percentage, 0);
  // Permitimos un margen de error de 0.1% por redondeos
  return Math.abs(total - 100) < 0.1 || total === 0;
};

/**
 * Obtiene el top N de items de una distribución
 */
export const getTopItems = (
  distribution: DistributionItem[],
  n: number = 5
): DistributionItem[] => {
  return [...distribution]
    .sort((a, b) => b.count - a.count)
    .slice(0, n);
};

/**
 * Agrupa items con bajo porcentaje en "Otros"
 * Útil para simplificar visualizaciones
 */
export const groupLowPercentageItems = (
  distribution: DistributionItem[],
  threshold: number = 5
): DistributionItem[] => {
  const significant = distribution.filter(
    (item) => item.percentage >= threshold
  );
  const others = distribution.filter((item) => item.percentage < threshold);

  if (others.length === 0) return significant;

  const othersTotal = others.reduce(
    (acc, item) => ({
      count: acc.count + item.count,
      percentage: acc.percentage + item.percentage,
    }),
    { count: 0, percentage: 0 }
  );

  return [
    ...significant,
    {
      label: "Otros",
      count: othersTotal.count,
      percentage: othersTotal.percentage,
    },
  ];
};