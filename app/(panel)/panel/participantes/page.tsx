import { Suspense } from 'react'
import ListParticipants from './ListParticipants'
import { getSubscribers } from '@/lib/firebase'

export default async function Participantes() {
  const getServerData = getSubscribers('register')
  const initialData = await getServerData()

  return (
    <section>
      <div className="flex justify-between">
        <h2 className="text-2xl">Lista de participantes</h2>
      </div>
      {initialData.length === 0 ? (
        <h3 className="text-center my-5 bg-white p-5 font-semibold">
          Aun no existen registros...
        </h3>
      ) : (
        ''
      )}
      <Suspense fallback={<div>Cargando...</div>}>
        <ListParticipants initialData={initialData} />
      </Suspense>
    </section>
  )
}
