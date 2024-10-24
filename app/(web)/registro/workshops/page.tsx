import WorkshopRegisterForm from '@/components/WorkshopRegisterForm/WorkShopRegisterForm'

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
