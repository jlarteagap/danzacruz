import { BadgeCheck, BadgeX } from 'lucide-react'

export default function UpdateStatusButton({ id, status, onUpdate }) {
  return (
    <div onClick={() => onUpdate(id, !status)}>
      {status ? (
        <BadgeCheck color="#22c55e" className="cursor-pointer text-green-500" />
      ) : (
        <BadgeX className="cursor-pointer text-red-600" />
      )}
    </div>
  )
}
