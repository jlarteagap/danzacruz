import { modalidades } from "./Modalidad.data";

export default function Modalidad() {
  return (
    <section className='py-20 bg-gradient-to-tr from-fuchsia-200 text-fuchsia-800'>
      <div className='container'>
        <div className='flex justify-center'>
          <h2 className='text-3xl font-semibold uppercase'>Modalidades</h2>
        </div>
        <div className='flex flex-col items-center my-10'>
          {modalidades.map((modalidad) => {
            return (
              <div>
                <div className='uppercase'>{modalidad}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
