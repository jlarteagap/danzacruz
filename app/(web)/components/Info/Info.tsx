import { categories, division, modalidad, subDivision } from './Info.data'
import InfoSection from './InfoSection'
export default function InfoData() {
  return (
    <section className="py-40 bg-gradient-to-br from-fuchsia-200 ">
      <div className="container flex gap-5 flex-col md:flex-row">
        <InfoSection list={modalidad} title="Forma de participación" />
        <InfoSection list={categories} title="Categorías" />
        <InfoSection list={division} title="División" />
        <InfoSection list={subDivision} title="Sub División" />
      </div>
    </section>
  )
}
