import { BadgeCheck, BadgeX, Trash2Icon } from 'lucide-react'
import { updateRegister } from '@/lib/firebase'

export default function ActionButtons({ id, status }) {
  const updateDoc = (id, status) => {
    updateRegister(id, { status }, 'workshops')
  }

  const deleteDoc = (id, stattus) => {
    console.log('clicj')
  }

  return (
    <>
      <Trash2Icon
        onClick={() => {
          deleteDoc(id, status)
        }}
      />
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
    </>
  )
}
