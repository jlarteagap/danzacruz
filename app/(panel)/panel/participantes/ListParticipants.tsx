'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { getSubscribers, updateRegister } from '@/lib/firebase'

export default function ParticipantesList({ initialData }) {
  const [data, setData] = useState(initialData)

  useEffect(() => {
    const getClientData = getSubscribers('register')
    const unsubscribe = getClientData(setData)

    return () => unsubscribe()
  }, [])

  const updateDoc = (id, status) => {
    console.log('id, status')
    updateRegister(id, { status }, 'register')
  }

  return (
    <div>
      {data.map(sub => {
        const {
          id,
          name,
          phone,
          modalidity,
          coreografy,
          professor,
          category,
          division,
          subDivision,
          status
        } = sub

        return (
          <div key={id}>
            <div className="grid gap-3 grid-cols-4 bg-white p-5 rounded-md shadow-sm my-3">
              <div className="flex flex-col">
                <p className="font-semibold">{name}</p>
                <span className="text-sm">{phone}</span>
              </div>
              <div className="text-sm">
                <strong>Modalidad: </strong> {modalidity} <br />
                <strong>Categoria: </strong> {category} <br />
                <strong>Division: </strong> {division} <br />
                <strong>Sub Division: </strong> {subDivision} <br />
              </div>
              <div className="text-sm">
                <strong>Coreografía: </strong>
                <br /> {coreografy}
                <br />
                <strong>Profesor / Coreografo: </strong>
                <br />
                {professor}
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
