import { CheckCheckIcon } from 'lucide-react'

export default function InfoSection({
  list,
  title
}: {
  list: string[]
  title: string
}) {
  return (
    <div className="flex gap-5 mb-10">
      <div className="w-1/2">
        <h3 className="text-3xl font-bold uppercase">{title}</h3>
      </div>
      <div className="w-1/2">
        <ul>
          {list.map((item, index) => {
            return (
              <li key={index} className="flex items-start lg:col-span-1">
                <div className="flex-shrink-0">
                  <CheckCheckIcon className="text-fuchsia-600" />
                </div>
                <p className="ml-3 leading-5">{item}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
