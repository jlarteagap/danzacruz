import { useQuery } from "@tanstack/react-query";
import { choreographyService } from "@/services/choreographiesService";

/**
 * Hook para obtener todas las registrations
 * Con caching y revalidación automática
 */
export const useRegistrations = () => {
  return useQuery({
    queryKey: ["registrations"],
    queryFn: async () => {
      const response = await choreographyService.getAll();
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos (antes cacheTime)
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};
