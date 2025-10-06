import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full text-center'>
        <div className='bg-white p-8 rounded-lg shadow'>
          <h1 className='text-2xl font-bold text-red-600 mb-4'>
            Acceso Denegado
          </h1>
          <p className='text-gray-600 mb-6'>
            No tienes permisos para acceder a esta página.
          </p>
          <Link
            href='/'
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
