'use client'

import { useState, useEffect } from 'react'
import { getSubscribers, updateRegister } from '@/lib/firebase'
import { Subscriber, Unsubscribe } from './WorkshopParticipants.type'
import { BadgeCheck, BadgeX, FilePenLine, Trash2Icon } from 'lucide-react'

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
    console.log(id, status)
    updateRegister(id, { status }, 'workshops')
  }

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
                <Trash2Icon />
                <FilePenLine />
                <div onClick={() => updateDoc(id, !status)}>
                  {status ? (
                    <BadgeCheck
                      color="#22c55e"
                      className="cursor-pointer text-green-500"
                    />
                  ) : (
                    <BadgeX className="cursor-pointer text-red-600" />
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
