"use client";
import { User, Users, BookUser } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import CardSumary from "../CardSumary/Sumary";
import LastChoreographiesCard from "./LastChoreographiesCard";
import LastParticipantsCard from "./LastParticipantsCard";

export default function DashboardClient({ initialData }: { initialData: any }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard-data"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard-data");
      if (!res.ok) throw new Error("Error al cargar datos");
      const json = await res.json();
      return json; // ✅ aseguramos devolver datos
    },
    initialData, // ⚡ Usamos datos precargados del Server Component
  });

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar datos</p>;

  return (
    <div>
      <div className='text-2xl font-bold mb-5'>Panel de Control</div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5'>
        <CardSumary
          title='Participantes'
          icon={Users}
          count={data?.participants?.length ?? 0}
        />
        <CardSumary
          title='Coreografías'
          icon={BookUser}
          count={data?.choreographies?.length ?? 0}
        />
        <CardSumary
          title='Usuarios'
          icon={User}
          count={data?.users?.length ?? 0}
        />
      </div>
      <hr className='my-5' />
      <div className='text-lg font-semibold mb-3'>Resumen</div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <LastChoreographiesCard choreographies={data?.choreographies ?? []} />
        <LastParticipantsCard participants={data?.participants ?? []} />
      </div>
    </div>
  );
}
