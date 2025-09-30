import CustomIcon from "@/components/CustomIcons/CustomIcons";
import { CardSumaryProps } from "./CardSumary.types";
import { Badge } from "../ui/badge";

export default function CardSumary(props: CardSumaryProps) {
  const { title, icon: Icon, count } = props;
  return (
    <article className='shadow-sm bg-background rounded-lg p-5 py-3 hover:shadow-lg transition'>
      <div className='flex gap-x-2 items-center'>
        <CustomIcon icon={Icon} />
        {title}
        <Badge
          variant='secondary'
          className='ml-auto bg-emerald-500/10 text-emerald-500'
        >
          {count}
        </Badge>
      </div>
    </article>
  );
}
