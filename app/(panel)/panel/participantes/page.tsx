export default async function Participantes() {
  return (
    <section>
      <div className='flex justify-between'>
        <h2 className='text-2xl'>Lista de participantes</h2>
        {/* <ExportToExcel
          data={initialData}
          fileName="Lista de Participantes"
          sheetName="Participantes"
        /> */}
      </div>
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
