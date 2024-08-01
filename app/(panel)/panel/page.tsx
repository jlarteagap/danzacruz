import { UserRound } from 'lucide-react'
import CardSumary from './CardSumary/Sumary'

export default function Dashboard() {
  return (
    <div>
      <div className="text-2xl mb-4">DanzaCruz</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-2">
        <CardSumary icon={UserRound} title="Companies" />
        {/* <CardSumary icon={UserRound} title="Companies" /> */}
        {/* <CardSumary icon={UserRound} title="Companies" /> */}
        {/* <CardSumary /> */}
        {/* <CardSumary /> */}
      </div>
    </div>
  )
}
