import { Button } from '@/components/ui/button'
import { ArrowUpRight, FileDown } from 'lucide-react'
export default function Page() {
  return (
    <>
      <div className="container flex justify-center items-center w-full h-screen">
        <div className="block mx-auto text-center">
          <h1 className="text-4xl sm:text-7xl font-bold">DANZACRUZ</h1>
          <span className="text-xl">Festival Internacional de danza</span>
        </div>
      </div>
      <section className="bg-slate-200">
        <div className="flex justify-center h-[200px] items-center gap-7">
          <div>
            <h3 className="">
              3 días de talleres, competencias y exhibiciones
            </h3>
            <p className="text-3xl font-semibold">
              ¡INSCRIBE TU GRUPO O SOLISTA HOY!
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <FileDown className="w-5 h-5 mr-2" stroke="1" />
              Convocatoria
            </Button>
            <Button>
              <ArrowUpRight className="w-5 h-5 mr-2" />
              Registrarte
            </Button>
          </div>
        </div>
      </section>
      <section className="bg-black">
        <div className="container text-white px-4 py-10">
          <div className="text-center my-10">
            <h2 className="text-3xl font-semibold">Talleres</h2>
            <p>
              Aprende de los mejores en cada género y estilo{' '}
              <span className="font-semibold">Danzacruz</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 md:row-span-3">
              <h3 className="text-2xl font-semibold mb-4 text-red-400">
                Fusión Contemporánea: Donde el Ballet Encuentra lo Urbano
              </h3>
              <p className="text-gray-600 mb-4">Instructora: María Sánchez</p>
              <p className="text-gray-700 mb-6">
                Explora cómo combinar la técnica clásica del ballet con los
                ritmos y movimientos de la danza urbana para crear un estilo
                único y dinámico. Este taller intensivo te llevará a través de
                un viaje de descubrimiento artístico, fusionando disciplinas
                aparentemente opuestas en una expresión coherente y emocionante.
              </p>
              <p className="text-gray-700 mb-6">Aprenderás:</p>
              <ul className="list-disc list-inside mb-6 text-gray-700">
                <li>Técnicas de transición entre estilos</li>
                <li>Improvisación guiada</li>
                <li>Creación de secuencias únicas</li>
              </ul>
              <p className="text-sm text-gray-500">Duración: 3 horas</p>
              <p className="text-sm text-gray-500">
                Nivel: Intermedio a Avanzado
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2  text-red-400">
                Storytelling a través del Movimiento
              </h3>
              <p className="text-gray-600 mb-4">Instructor: Carlos Ramírez</p>
              <p className="text-gray-700 mb-4">
                Aprende a transmitir emociones y narrar historias complejas
                utilizando solo el lenguaje corporal y el movimiento.
              </p>
              <p className="text-sm text-gray-500">
                Duración: 4 horas (2 sesiones de 2 horas)
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2  text-red-400">
                Ritmos Afro-Latinos: De la Tradición a la Innovación
              </h3>
              <p className="text-gray-600 mb-4">Instructora: Lucía Morales</p>
              <p className="text-gray-700 mb-4">
                Sumérgete en los ritmos tradicionales afro-latinos y descubre
                cómo incorporarlos en coreografías contemporáneas y fusiones
                innovadoras.
              </p>
              <p className="text-sm text-gray-500">Duración: 3 horas</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2  text-red-400">
                Técnica Alexander para Bailarines
              </h3>
              <p className="text-gray-600 mb-4">Instructor: David Lee</p>
              <p className="text-gray-700 mb-4">
                Mejora tu postura, previene lesiones y optimiza tu rendimiento
                en escena con esta reconocida técnica de reeducación corporal.
              </p>
              <p className="text-sm text-gray-500">Duración: 2 horas</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Panel de Jurados
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://picsum.photos/200/300/?photo"
                alt="María Rodríguez"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-lg font-semibold text-center">Argentina</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://picsum.photos/200/300/?photo"
                alt="Jean-Pierre Dubois"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-lg font-semibold text-center">Francia</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden p-4 relative">
              <div className="absolute bottom-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-sm z-10">
                Nacionalidad
              </div>
              <div className="w-40 h-40 mx-auto relative">
                <img
                  src="https://picsum.photos/200/300/?photo"
                  alt="Jurado"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://picsum.photos/200/300/?photo"
                alt="Carlos Mendoza"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-lg font-semibold text-center">México</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}