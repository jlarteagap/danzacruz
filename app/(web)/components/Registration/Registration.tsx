import { benefitsData, registrationData } from './Registration.data'

export default function Registration() {
  return (
    <section className="text-fuchsia-800">
      <div className="container mt-10 py-10">
        <div className="flex justify-center mb-10">
          <h2 className="text-4xl uppercase font-semibold">Inscripciones</h2>
        </div>
        <div className="flex justify-around flex-col md:flex-row">
          {registrationData.map(price => {
            return (
              <div
                className="flex flex-col items-center mb-10"
                key={price.price}
              >
                <div className="text-4xl font-bold hover:text-fuchsia-600 hover:transition-all">
                  {price.price}
                </div>
                <div className="text-xl">{price.name}</div>
                <div className="text-sm text-slate-500">{price.desc}</div>
              </div>
            )
          })}
        </div>
        <div className="flex flex-col my-10 py-10">
          <div className="flex justify-center mb-10">
            <h3 className="text-2xl uppercase text-center">
              Beneficios de Inscripción
            </h3>
          </div>
          <div className="flex flex-col items-center w-[80%] md:w-1/2 m-auto gap-2">
            {benefitsData.map(benefit => {
              return (
                <div
                  className="flex justify-center items-center text-sm text-center"
                  key={benefit}
                >
                  <p className="text-slate-500">{benefit}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
