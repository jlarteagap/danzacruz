import { AwardIcon } from 'lucide-react'
import { awardsCategory, awardsData } from './Awards.data'

export default function Awards() {
  return (
    <section className="bg-slate-500 text-slate-200 py-10">
      <div className="flex justify-center items-center">
        <AwardIcon strokeWidth={3} />
        <h2 className="text-4xl uppercase font-semibold">Premios</h2>
      </div>
      <div className="flex justify-center flex-col md:flex-row md:justify-around my-10">
        {awardsData.map(award => {
          return (
            <div className="text-center mb-5" key={award.place}>
              <div className="text-3xl uppercase font-semibold">
                {award.place}
              </div>
              <div className="text-2xl font-semibold">{award.trophy}</div>
              <div>{award.certificade}</div>
            </div>
          )
        })}
      </div>

      <div className="container grid grid-cols-3 gap-5">
        {awardsCategory.map(category => {
          return (
            <div className="shadow-sm rounded-lg p-5" key={category.category}>
              <h3 className="text-xl font-semibold my-3">
                {category.category}
              </h3>
              <div className="font-semibold">{category.award}</div>
              <ul>
                {category.plus.map(item => {
                  return (
                    <li key={item} className="ml-5">
                      {item}
                    </li>
                  )
                })}
              </ul>
              <div className="text-sm text-slate-300">{category.obs}</div>
              {category.value}
            </div>
          )
        })}
      </div>
    </section>
  )
}
