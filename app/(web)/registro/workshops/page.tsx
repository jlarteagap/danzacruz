import WorkshopRegisterForm from '@/components/WorkshopRegisterForm/WorkShopRegisterForm'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Página de Registro a los talleres',
  description:
    'Registre su participación en los talleres festival más importante del país'
}

export default function WorkshopsRegister() {
  return (
    <section className="container py-10">
      <div className="text-center">
        <h2 className="text-4xl uppercase font-semibold">Registro talleres</h2>
      </div>
      <div className="my-5">
        <div className="my-10 w-[650px] m-auto">
          <WorkshopRegisterForm />
        </div>
      </div>
    </section>
  )
}
