export default async function Participantes() {
  return (
    <section>
      <div className='grid gap-3 grid-cols-5 bg-white p-5 rounded-md shadow-sm my-3'>
        <div className='text-center'>Datos personales</div>
        <div className='text-center'>Participación</div>
        <div className='text-center'>Datos Coreografía</div>
        <div className='text-center'>Aclaraciones</div>
        <div className='text-center'>Acciones</div>
      </div>
    </section>
  );
}
