// import { UserRound } from 'lucide-react'
// import CardSumary from './CardSumary/Sumary'

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div>
      <div className='text-2xl mb-4 uppercase font-semibold'>DanzaCruz</div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-20'>
        <div className='bg-white p-6 rounded-lg shadow'>
          <h2 className='text-xl font-semibold mb-4'>
            Información del usuario
          </h2>
          <p>
            <strong>Nombre:</strong> {session.user?.name}
          </p>
          <p>
            <strong>Email:</strong> {session.user?.email}
          </p>
          <p>
            <strong>Rol:</strong> {session.user?.role}
          </p>
          <p>
            <strong>ID:</strong> {session.user?.id}
          </p>
        </div>
        {/* <CardSumary icon={UserRound} title="Companies" />
        <CardSumary icon={UserRound} title="Companies" />
        <CardSumary icon={UserRound} title="Companies" /> */}
        {/* <CardSumary icon={UserRound} title="Companies" /> */}
        {/* <CardSumary icon={UserRound} title="Companies" /> */}
        {/* <CardSumary /> */}
        {/* <CardSumary /> */}
      </div>
    </div>
  );
}
