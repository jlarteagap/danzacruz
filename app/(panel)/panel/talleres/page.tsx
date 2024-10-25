import { Suspense } from 'react'

import { getSubscribers } from '@/lib/firebase'
import ParticipantsWorkshop from './WorkShopsParticipant'

export default async function Talleres() {
  const getServerData = getSubscribers('workshops') as () => Promise<any[]>
  const initialData = await getServerData()
  return (
    <section>
      <div className="flex justify-between">
        <h2 className="text-2xl">Lista de participantes en talleres</h2>
        {/* <Button>Crear Talleres</Button> */}
      </div>
      <div className="grid gap-3 grid-cols-4 bg-white p-5 rounded-md shadow-sm my-3">
        <div className="text-center">Nombre</div>
        <div className="text-center">Telefono</div>
        <div className="text-center">Taller</div>
        <div className="text-center">Acciones</div>
      </div>

      {initialData.length === 0 ? (
        <h3 className="text-center my-5 bg-white p-5 font-semibold">
          Aun no existen registros...
        </h3>
      ) : (
        ''
      )}
      <Suspense fallback={<div>Cargando...</div>}>
        <ParticipantsWorkshop initialData={initialData} />
      </Suspense>
    </section>
  )
}
