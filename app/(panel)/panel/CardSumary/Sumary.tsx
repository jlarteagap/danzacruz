import CustomIcon from '@/components/CustomIcons/CustomIcons'
import { CardSumaryProps } from './CardSumary.types'

export default function CardSumary(props: CardSumaryProps) {
  const { title, icon: Icon } = props
  return (
    <article className="shadow-sm bg-background rounded-lg p-5 py-3 hover:shadow-lg transition">
      <div className="flex gap-x-2 items-center">
        <CustomIcon icon={Icon} />
        {title}
      </div>
    </article>
  )
}
