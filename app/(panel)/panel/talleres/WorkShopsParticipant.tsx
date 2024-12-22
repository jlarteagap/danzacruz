'use client'

import { useState, useEffect } from 'react'
import { getSubscribers } from '@/lib/firebase'
import { Subscriber, Unsubscribe } from './WorkshopParticipants.type'
import ActionButtons from '@/components/ActionButtons/ActionButtons'

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

  return (
    <div>
      {data.map(work => {
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
              <div className="flex justify-center gap-4">
                <ActionButtons status={status} id={id} collection="workshops" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
