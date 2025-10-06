export default async function Talleres() {
  return (
    <section>
      <div className='flex justify-between'>
        <h2 className='text-2xl'>Lista de participantes en talleres</h2>
        {/* <Button>Crear Talleres</Button> */}
      </div>
      <div className='grid gap-3 grid-cols-4 bg-white p-5 rounded-md shadow-sm my-3'>
        <div className='text-center'>Nombre</div>
        <div className='text-center'>Telefono</div>
        <div className='text-center'>Taller</div>
        <div className='text-center'>Acciones</div>
      </div>
    </section>
  );
}
