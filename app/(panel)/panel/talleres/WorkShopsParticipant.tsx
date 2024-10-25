'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { getSubscribers, updateRegister } from '@/lib/firebase'
import { Subscriber, Unsubscribe } from './WorkshopParticipants.type'

export default function ParticipantsWorkshop({
  initialData
}: {
  initialData: Subscriber[]
}) {
  const [data, setData] = useState<Subscriber[]>(initialData)

  useEffect(() => {
    const getClientData = getSubscribers('workshops') as (
      callback: (data: Subscriber[]) => void
    ) => Unsubscribe
    const unsubscribe = getClientData(setData)

    return () => {
      unsubscribe()
    }
  }, [])
  const updateDoc = (id, status) => {
    console.log('id, status')
    updateRegister(id, { status }, 'register')
  }

  return (
    <div>
      {data.map(work => {
        console.log(work)
        const { id, name, phone, status, workshop } = work

        return (
          <div key={id}>
            <div className="grid gap-3 grid-cols-4 bg-white p-5 rounded-md shadow-sm my-3">
              <div className="flex flex-col">
                <p className="font-semibold">{name}</p>
              </div>
              <div className="text-sm">
                <span className="text-sm">{phone}</span>
              </div>
              <div className="text-sm">
                <strong>Workshop: </strong>
                <br /> {workshop}
              </div>
              <div className="flex justify-center">
                <Button onClick={() => updateDoc(id, !status)}>
                  {status ? 'Confirmado' : 'Sin Confirmar'}
                </Button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
