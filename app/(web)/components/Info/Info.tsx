import { categories, division, modalidad, subDivision } from './Info.data'
import InfoSection from './InfoSection'
export default function InfoData() {
  return (
    <section className="py-40 bg-gradient-to-br from-fuchsia-200 ">
      <div className="container">
        <InfoSection list={modalidad} title="Forma de participación" />
        <InfoSection list={categories} title="Categorias" />
        <InfoSection list={division} title="División" />
        <InfoSection list={subDivision} title="Sub División" />
      </div>
    </section>
  )
}
