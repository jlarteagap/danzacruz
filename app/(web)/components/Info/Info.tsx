import { categories, division, modalidad, subDivision } from './Info.data'
import InfoSection from './InfoSection'
export default function InfoData() {
  return (
    <section className="py-40 bg-black text-white">
      <div className="container">
        <InfoSection list={modalidad} title="Forma de participación" />
        <InfoSection list={categories} title="Catetorias" />
        <InfoSection list={division} title="División" />
        <InfoSection list={subDivision} title="Sub División" />
      </div>
    </section>
  )
}
