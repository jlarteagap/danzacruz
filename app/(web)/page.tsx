import Cta from '@/components/CTA/cta'

import Hero from './components/Hero'
import WorkshopSection from './components/Workshop/Workshop'
import InfoData from './components/Info/Info'
import Modalidad from './components/Modalidad/Modalidad'
import Registration from './components/Registration/Registration'
import Awards from './components/Awards/Awards'
import Times from './components/Times/Times'
import Judges from './components/Judges/Judges'

export default function Page() {
  return (
    <>
      <Hero />
      <Cta />
      <WorkshopSection />
      <InfoData />
      <Modalidad />
      <Registration />
      <Awards />
      <Times />
      <Judges />
    </>
  )
}
