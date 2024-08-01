'use client'

import { useRouter } from 'next/navigation'

export default function Logo() {
  const router = useRouter()
  return (
    <div
      className="min-h-20 h-20 flex items-center px-6 border-r cursor-pointer"
      onClick={() => router.push('/')}
    >
      <h1>DANZACRUZ</h1>
    </div>
  )
}
