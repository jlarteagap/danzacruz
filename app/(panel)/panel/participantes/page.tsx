import { Suspense } from 'react'
import ListParticipants from './ListParticipants'
import { getSubscribers } from '@/lib/firebase'

export default async function Participantes() {
  const getServerData = getSubscribers('register-data')
  const initialData = await getServerData()

  return (
    <section>
      <div className="flex justify-between">
        <h2 className="text-2xl">Lista de participantes</h2>
      </div>
      <Suspense fallback={<div>Cargando...</div>}>
        <ListParticipants initialData={initialData} />
      </Suspense>
    </section>
  )
}
