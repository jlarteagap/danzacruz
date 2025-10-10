"use client";

import { useState, useEffect } from "react";
import { ChevronRight, Menu, X } from "lucide-react";

// Navigation Items
const NAVIGATION_ITEMS = [
  { id: "inicio", label: "Inicio", icon: "🏠" },
  { id: "sobre", label: "Sobre DANZACRUZ", icon: "📖" },
  {
    id: "cap1",
    label: "Capítulo I",
    icon: "📚",
    subItems: [
      { id: "art1", label: "Art. 1: Categorías" },
      { id: "art2", label: "Art. 2: Fechas" },
      { id: "art3", label: "Art. 3: Modalidades" },
      { id: "duraciones", label: "Duraciones" },
    ],
  },
  {
    id: "cap2",
    label: "Capítulo II",
    icon: "📚",
    subItems: [
      { id: "reglamento-seleccion", label: "Selección" },
      { id: "reglamento-base", label: "Reglamento Base" },
      { id: "ensayos", label: "Ensayos" },
    ],
  },
  {
    id: "cap3",
    label: "Capítulo III",
    icon: "📚",
    subItems: [
      { id: "inscripciones", label: "Inscripciones" },
      { id: "talleres", label: "Talleres" },
    ],
  },
  { id: "evaluacion", label: "Cap. IV - Evaluación", icon: "📚" },
  { id: "calificacion", label: "Cap. V - Calificación", icon: "📚" },
  { id: "premiacion", label: "Cap. VI - Premiación", icon: "🏆" },
  { id: "observaciones", label: "Cap. VII - Observaciones", icon: "📚" },
  { id: "contacto", label: "Contacto", icon: "📞" },
];
export default function ConvocatoriaContent() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [expandedMenus, setExpandedMenus] = useState<string[]>([
    "cap1",
    "cap2",
    "cap3",
  ]);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown effect
  useEffect(() => {
    const eventDate = new Date("2025-11-06T18:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section]");
      let current = "inicio";

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("data-section") || "inicio";
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);

    const toggleMenu = (menuId: string) => {
      setExpandedMenus((prev) =>
        prev.includes(menuId)
          ? prev.filter((id) => id !== menuId)
          : [...prev, menuId]
      );
    };

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileOpen(false);
    }
  };
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className='fixed top-20 left-4 z-50 md:hidden w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors'
        aria-label='Toggle menu'
      >
        {isMobileOpen ? (
          <X className='w-6 h-6' />
        ) : (
          <Menu className='w-6 h-6' />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden'
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-80 bg-white border-r border-gray-200 z-40 overflow-y-auto transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className='p-6'>
          {/* Logo */}
          <div className='mb-6'>
            <div className='w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mb-3'>
              <span className='text-white font-bold text-xl'>DC</span>
            </div>
            <h1 className='text-center font-bold text-lg'>DANZACRUZ 2025</h1>
            <p className='text-center text-xs text-gray-500'>
              XXV Festival Internacional
            </p>
          </div>

          {/* Countdown Compact */}
          <div className='bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-3 mb-6'>
            <p className='text-xs text-gray-600 text-center mb-2'>
              Tiempo restante
            </p>
            <div className='flex justify-center gap-2 text-center'>
              <div>
                <div className='text-lg font-bold text-purple-600'>
                  {String(countdown.days).padStart(2, "0")}
                </div>
                <div className='text-xs text-gray-600'>días</div>
              </div>
              <div className='text-purple-600 font-bold'>:</div>
              <div>
                <div className='text-lg font-bold text-purple-600'>
                  {String(countdown.hours).padStart(2, "0")}
                </div>
                <div className='text-xs text-gray-600'>hrs</div>
              </div>
              <div className='text-purple-600 font-bold'>:</div>
              <div>
                <div className='text-lg font-bold text-purple-600'>
                  {String(countdown.minutes).padStart(2, "0")}
                </div>
                <div className='text-xs text-gray-600'>min</div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => scrollToSection("inscripciones")}
            className='w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center font-semibold rounded-lg hover:shadow-lg transition-all duration-300 text-sm mb-6'
          >
            📝 Inscribirse Ahora
          </button>

          {/* Navigation */}
          <nav className='space-y-1 text-sm'>
            {NAVIGATION_ITEMS.map((item) => (
              <div key={item.id}>
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleMenu(item.id)}
                      className='w-full flex items-center justify-between py-2 px-3 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
                    >
                      <span>
                        {item.icon} {item.label}
                      </span>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          expandedMenus.includes(item.id) ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                    {expandedMenus.includes(item.id) && (
                      <div className='pl-6 space-y-1 mt-1'>
                        {item.subItems.map((subItem) => (
                          <button
                            key={subItem.id}
                            onClick={() => scrollToSection(subItem.id)}
                            className={`w-full text-left py-2 px-3 rounded-lg text-xs transition-all ${
                              activeSection === subItem.id
                                ? "bg-purple-50 text-purple-600 font-semibold"
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left py-2 px-3 rounded-lg transition-all ${
                      activeSection === item.id
                        ? "bg-purple-50 text-purple-600 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item.icon} {item.label}
                  </button>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>
      {/* SOBRE DANZACRUZ */}
      <main className='md:ml-80 min-h-screen'>
        <div className='max-w-5xl mx-auto px-6 py-12'>
          <section data-section='sobre' className='mb-16 scroll-mt-8'>
            <h2 className='text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent'>
              Convocatoria
            </h2>

            <div className='prose prose-lg max-w-none'>
              <p className='text-lg text-gray-700 leading-relaxed mb-6'>
                Se invita a las escuelas de danza, grupos independientes,
                colegios, universidades y personas que tengan pasión por la
                danza al{" "}
                <strong>
                  XXV Festival Internacional DANZACRUZ 2025 – BODAS DE PLATA
                </strong>
                , que se llevará cabo del <strong>06 al 09 de noviembre</strong>{" "}
                del año en curso.
              </p>

              <p className='text-lg text-gray-700 leading-relaxed mb-6'>
                El Festival Internacional Danzacruz 2025, consolidado en el
                ambiente de la danza boliviana, se lleva adelante con la
                finalidad de incentivar a los bailarines, escuelas, academias y
                grupos independientes. Constantemente hace cambios en su
                estructura artística, invita a protagonistas de la danza como
                miembros del jurado y talleristas, y crea espacios para géneros
                especiales de este singular arte.
              </p>
            </div>

            {/* Objetivos */}
            <div className='mt-8'>
              <h3 className='text-2xl font-bold mb-4'>
                DANZACRUZ TIENE LOS SIGUIENTES OBJETIVOS:
              </h3>
              <ul className='space-y-4'>
                <li className='flex gap-3'>
                  <span className='text-purple-600 font-bold flex-shrink-0'>
                    •
                  </span>
                  <span className='text-gray-700'>
                    Promover la danza como disciplina a personas de todas las
                    edades por los beneficios que ésta trae para el desarrollo
                    cerebral al estimular su plasticidad, mejorar las
                    habilidades para procesar y elaborar información, promover
                    la regulación emocional y fomentar la conexión social. Estos
                    efectos hacen que la danza sea una herramienta valiosa para
                    el enriquecimiento y la salud del cerebro a lo largo de la
                    vida.
                  </span>
                </li>
                <li className='flex gap-3'>
                  <span className='text-purple-600 font-bold flex-shrink-0'>
                    •
                  </span>
                  <span className='text-gray-700'>
                    Incentivar la investigación histórica de costumbres y
                    expresiones artísticas de música y danza de los pueblos.
                  </span>
                </li>
                <li className='flex gap-3'>
                  <span className='text-purple-600 font-bold flex-shrink-0'>
                    •
                  </span>
                  <span className='text-gray-700'>
                    Fomentar los procesos de transformación de la danza
                    folklórica acorde con el desarrollo de las diferentes
                    disciplinas.
                  </span>
                </li>
                <li className='flex gap-3'>
                  <span className='text-purple-600 font-bold flex-shrink-0'>
                    •
                  </span>
                  <span className='text-gray-700'>
                    Proyectar a los nuevos profesionales de la danza en el medio
                    cultural y artístico.
                  </span>
                </li>
                <li className='flex gap-3'>
                  <span className='text-purple-600 font-bold flex-shrink-0'>
                    •
                  </span>
                  <span className='text-gray-700'>
                    Incentivar el turismo a través de la visita de participantes
                    y miembros del jurado nacional e internacional.
                  </span>
                </li>
                <li className='flex gap-3'>
                  <span className='text-purple-600 font-bold flex-shrink-0'>
                    •
                  </span>
                  <span className='text-gray-700'>
                    Proporcionar el intercambio cultural entre grupos de danza
                    folklórica integrando a todos los países participantes,
                    presentando la diversidad cultural que presenta nuestro
                    país.
                  </span>
                </li>
                <li className='flex gap-3'>
                  <span className='text-purple-600 font-bold flex-shrink-0'>
                    •
                  </span>
                  <span className='text-gray-700'>
                    Promover la creatividad en las artes escénicas, eso incluye
                    coreografía, música, canto y multimedia.
                  </span>
                </li>
                <li className='flex gap-3'>
                  <span className='text-purple-600 font-bold flex-shrink-0'>
                    •
                  </span>
                  <span className='text-gray-700'>
                    Brindar un ambiente propicio para la sana competencia y
                    creatividad de la juventud.
                  </span>
                </li>
                <li className='flex gap-3'>
                  <span className='text-purple-600 font-bold flex-shrink-0'>
                    •
                  </span>
                  <span className='text-gray-700'>
                    Propagar las presentaciones artísticas en ciudades cercanas
                    a la ciudad capital.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* CAPÍTULO I */}
          <section className='mb-16 scroll-mt-8'>
            <div className='bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 mb-8'>
              <h2 className='text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2'>
                CAPÍTULO I
              </h2>
              <p className='text-xl text-gray-700'>
                DE LAS CATEGORÍAS, MODALIDADES Y FECHAS
              </p>
            </div>

            {/* Artículo 1 */}
            <div data-section='art1' className='mb-12 scroll-mt-8'>
              <h3 className='text-2xl font-bold mb-4'>
                Artículo 1 – Las categorías para la competición serán las
                siguientes:
              </h3>

              <div className='grid md:grid-cols-2 gap-6 mb-6'>
                <div className='bg-white border border-gray-200 rounded-xl p-6'>
                  <h4 className='text-lg font-bold mb-4 text-purple-600'>
                    CATEGORÍA COLEGIOS:
                  </h4>
                  <div className='space-y-3'>
                    <div>
                      <p className='font-semibold'>Infantil:</p>
                      <p className='text-gray-600'>De 6 a 11 años y 11 meses</p>
                    </div>
                    <div>
                      <p className='font-semibold'>Juvenil:</p>
                      <p className='text-gray-600'>De 12 a 18 años</p>
                    </div>
                  </div>
                </div>

                <div className='bg-white border border-gray-200 rounded-xl p-6'>
                  <h4 className='text-lg font-bold mb-4 text-indigo-600'>
                    CATEGORÍA GENERAL:
                  </h4>
                  <div className='space-y-3'>
                    <div>
                      <p className='font-semibold'>Infantil:</p>
                      <p className='text-gray-600'>De 6 a 11 años y 11 meses</p>
                    </div>
                    <div>
                      <p className='font-semibold'>Juvenil:</p>
                      <p className='text-gray-600'>
                        De 12 a 17 años y 11 meses
                      </p>
                    </div>
                    <div>
                      <p className='font-semibold'>Adulto:</p>
                      <p className='text-gray-600'>De 18 años en adelante</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Artículo 2 - Fechas */}
            <div data-section='art2' className='mb-12 scroll-mt-8'>
              <h3 className='text-2xl font-bold mb-4'>
                Artículo 2 - DE LAS FECHAS Y HORAS DEL CONCURSO
              </h3>

              <div className='space-y-4'>
                <div className='bg-white border-l-4 border-purple-500 rounded-lg p-6'>
                  <h4 className='font-bold text-lg mb-2'>
                    📅 Día 1 del Festival: (06 de noviembre)
                  </h4>
                  <p className='text-gray-700 mb-2'>
                    Categoría Colegios y categoría General para los
                    participantes de Santa Cruz de la Sierra.
                  </p>
                  <p className='text-gray-700 mb-2'>
                    <strong>El Festival iniciará a las 18:00 horas.</strong>
                  </p>
                  <div className='mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded'>
                    <p className='text-sm text-blue-900'>
                      <strong>NOTA:</strong> En caso de que hubiere más
                      participantes de lo previsto, la organización informará en
                      los grupos para iniciar a las 15:00 horas de la fecha
                      estimada y así poder culminar en horarios pertinentes.
                    </p>
                  </div>
                </div>

                <div className='bg-white border-l-4 border-indigo-500 rounded-lg p-6'>
                  <h4 className='font-bold text-lg mb-2'>
                    📅 Día 2 del Festival: (07 de noviembre)
                  </h4>
                  <p className='text-gray-700'>
                    Categoría General para los participantes de las provincias
                    de Santa Cruz, otros departamentos e internacionales.
                  </p>
                </div>

                <div className='bg-white border-l-4 border-green-500 rounded-lg p-6'>
                  <h4 className='font-bold text-lg mb-2'>
                    📅 Día 3 del Festival: (08 de noviembre)
                  </h4>
                  <p className='text-gray-700 mb-2'>
                    <strong>Ambas Categorías.</strong>
                  </p>
                  <p className='text-gray-700'>
                    Los participantes que hayan obtenido un puntaje de{" "}
                    <strong>71 puntos o más</strong> durante los primeros tres
                    días del festival, competirán en la{" "}
                    <strong>Gran Final</strong>, con una nueva coreografía para
                    obtener el premio absoluto en su Categoría y Modalidad.
                  </p>
                </div>

                <div className='bg-white border-l-4 border-yellow-500 rounded-lg p-6'>
                  <h4 className='font-bold text-lg mb-2'>
                    📅 Día 4 del Festival: (09 de noviembre)
                  </h4>
                  <p className='text-gray-700 mb-2'>
                    <strong>Show de Gala.</strong>
                  </p>
                  <p className='text-gray-700 mb-2'>
                    Con grupos más destacados del festival, Musical: La vida de
                    los bailarines Urbanos, Cantante Invitado Especial y
                    Premiación
                  </p>
                  <p className='text-gray-700'>
                    <strong>Previsión de inicio:</strong> 19:00 Hrs.
                  </p>
                </div>
              </div>
            </div>

            {/* Artículo 3 - Modalidades */}
            <div data-section='art3' className='mb-12 scroll-mt-8'>
              <h3 className='text-2xl font-bold mb-4'>
                Artículo 3 – DE LAS MODALIDADES
              </h3>

              <div className='p-4 mb-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg'>
                <p>
                  <strong>⚠️ IMPORTANTE:</strong> Los participantes deberán
                  enviar un resumen escrito de su trabajo hasta el{" "}
                  <strong>20 de octubre</strong> al correo:{" "}
                  <a
                    href='mailto:chichomachine@yahoo.com'
                    className='underline font-semibold text-purple-600 hover:text-purple-800'
                  >
                    chichomachine@yahoo.com
                  </a>{" "}
                  para ser analizado por el jurado correspondiente.
                </p>
              </div>

              <div className='space-y-6'>
                {/* 3.1 Ballet Clásico */}
                <div className='bg-white border border-gray-200 rounded-xl p-6'>
                  <h4 className='text-xl font-bold mb-3 text-purple-600'>
                    3.1 BALLET CLÁSICO:
                  </h4>
                  <p className='text-gray-700 mb-4'>
                    Las coreografías de repertorio deben ser presentadas de
                    forma fiel. Las Variaciones: Pas-de-Deux, Gran Pas-de-Deux,
                    Pas-de-Trois, Conjunto y Grupo, deberán ser representadas
                    respetando la época, estilo y vestuario.
                  </p>
                  <p className='text-gray-700 mb-3'>
                    Variaciones o fragmentos del repertorio clásico
                    internacional deberán ser representadas con las siguientes
                    características:
                  </p>
                  <ul className='space-y-2 ml-6'>
                    <li className='flex gap-2'>
                      <span className='text-purple-600'>•</span>
                      <span className='text-gray-700'>
                        La categoría <strong>Infantil</strong> puede presentar
                        un Pas de Deux sin variaciones ni coda.
                      </span>
                    </li>
                    <li className='flex gap-2'>
                      <span className='text-purple-600'>•</span>
                      <span className='text-gray-700'>
                        La categoría <strong>Juvenil</strong> tanto de colegios
                        como general deberá usar zapatillas de punta de forma
                        obligatoria.{" "}
                        <strong>
                          La no observación de esta norma llevará a la
                          desclasificación.
                        </strong>
                      </span>
                    </li>
                  </ul>
                </div>

                {/* 3.2 Ballet Neo-Clásico */}
                <div className='bg-white border border-gray-200 rounded-xl p-6'>
                  <h4 className='text-xl font-bold mb-3 text-purple-600'>
                    3.2 BALLET NEO-CLÁSICO:
                  </h4>
                  <p className='text-gray-700'>
                    Serán inscritas las coreografías creadas o remontadas,
                    obedeciendo la técnica del Ballet Clásico, más no
                    necesariamente su narrativa. Vale decir que puede estar
                    basada en otras temáticas que no son de conocimiento de la
                    técnica ancestral del ballet.
                  </p>
                </div>

                {/* 3.3 Danza Moderna y Contemporánea */}
                <div className='bg-white border border-gray-200 rounded-xl p-6'>
                  <h4 className='text-xl font-bold mb-3 text-purple-600'>
                    3.3 DANZA MODERNA y DANZA CONTEMPORÁNEA:
                  </h4>
                  <p className='text-gray-700'>
                    Serán inscritas las categorías que incluyan en su
                    presentación fuerza de gravedad, trabajo de suelo, saltos,
                    referidas a las técnicas: Duncan, Graham, Hawkins, Limón,
                    Release, Horton, Humphery-Weidman, improvisación de
                    contacto, Laban, entre otros.
                  </p>
                </div>

                {/* 3.4 Jazz */}
                <div className='bg-white border border-gray-200 rounded-xl p-6'>
                  <h4 className='text-xl font-bold mb-3 text-purple-600'>
                    3.4 JAZZ:
                  </h4>
                  <p className='text-gray-700 mb-4'>
                    Serán inscritas en esta modalidad todas las líneas y
                    variaciones de Jazz desde el año 1995 en adelante (del
                    repertorio actual de jazz y de propia autoría). Tomando en
                    consideración los diferentes estilos:
                  </p>
                  <ul className='space-y-2 ml-6 mb-4'>
                    <li className='flex gap-2'>
                      <span className='text-purple-600'>•</span>
                      <span className='text-gray-700'>
                        <strong>Lyrical Jazz:</strong> Se caracteriza por tener
                        un contenido expresivo y emocional de la pieza musical
                        que se interpreta.
                      </span>
                    </li>
                    <li className='flex gap-2'>
                      <span className='text-purple-600'>•</span>
                      <span className='text-gray-700'>
                        <strong>Modern Jazz:</strong> Surge del aporte de la
                        danza contemporánea de los años 60 al Jazz.
                      </span>
                    </li>
                    <li className='flex gap-2'>
                      <span className='text-purple-600'>•</span>
                      <span className='text-gray-700'>
                        <strong>Street Jazz:</strong> Surge de la fusión del
                        Jazz con danzas populares urbanas o Street Dance.
                      </span>
                    </li>
                  </ul>
                  <div className='p-4 bg-blue-50 border-l-4 border-blue-500 rounded'>
                    <p className='text-sm text-gray-700'>
                      <strong>Observación:</strong> Toda representación o
                      reposición del repertorio de jazz o de alguna obra
                      específica debe ser acompañado del nombre del coreógrafo,
                      autor de la música y obra a la que representa mencionada
                      coreografía, seguido del nombre del coreógrafo repositor;
                      desvirtuando de esta forma el derecho de autor que en
                      algunas ocasiones es mal interpretado.
                    </p>
                  </div>
                </div>

                {/* 3.5 Musical */}
                <div className='bg-white border border-gray-200 rounded-xl p-6'>
                  <h4 className='text-xl font-bold mb-3 text-purple-600'>
                    3.5 MUSICAL:
                  </h4>
                  <p className='text-gray-700'>
                    Tratase de obras célebres del repertorio clásico de Jazz,
                    desde sus inicios hasta el año 1995 (Sweet Charity, The West
                    Side History, Chorus Line, Cats, entre otros).
                  </p>
                </div>

                {/* 3.6 Street Dance */}
                <div className='bg-white border border-gray-200 rounded-xl p-6'>
                  <h4 className='text-xl font-bold mb-3 text-purple-600'>
                    3.6 STREET DANCE:
                  </h4>
                  <p className='text-gray-700'>
                    Concursarán piezas coreográficas estructuradas en la base de
                    las "danzas callejeras" como ser: Breakdance, Step dance,
                    Funk, Acid, House, Rap, Techno, Reguetone, etc. También las
                    que conllevan técnicas y formatos relacionados a concursos
                    reconocidos como el WOD (World of Dance) y al HHI (Hip Hop
                    International).
                  </p>
                </div>

                {/* 3.7 Bailes Tropicales */}
                <div className='bg-white border border-gray-200 rounded-xl p-6'>
                  <h4 className='text-xl font-bold mb-3 text-purple-600'>
                    3.7 BAILES TROPICALES Y DE SALÓN:
                  </h4>
                  <p className='text-gray-700'>
                    Serán inscritas en esta modalidad todas las danzas populares
                    urbanas (Salsa, Cha cha chá, Mambo, Tango, Bolero, Rumba,
                    Samba, Gafiera, Axé, etc.). Serán incluidos también los
                    estilos del Ball Room.
                  </p>
                </div>

                {/* 3.8 Folklore Étnico */}
                <div className='bg-white border border-gray-200 rounded-xl p-6'>
                  <h4 className='text-xl font-bold mb-3 text-purple-600'>
                    3.8 FOLKLORE ÉTNICO Y DE RAÍZ:
                  </h4>
                  <p className='text-gray-700 mb-4'>
                    Serán inscritos todos los trabajos que tienen un estudio
                    profundo sin perder la esencia de cada danza, tales como:
                    Arete Guazú, Los Macheteros, Los Tobas, La Danza del Sol, La
                    Saya, Danzas Chaqueñas, etc. Sin proyección folklórica.
                  </p>

                  <div className='p-4 mb-4 bg-yellow-50 border-l-4 border-yellow-500 rounded'>
                    <p className='text-sm mb-2'>
                      <strong>Obs.:</strong> Todos los trabajos étnicos
                      culturales deben estar respaldados con una investigación
                      (por escrito) sobre la danza a presentarse, además hacer
                      llegar a los diferentes integrantes del jurado responsable
                      de dicha selección, una copia.
                    </p>
                  </div>

                  <p className='text-gray-700 mb-2'>
                    Competirán danzas del mismo género entre sí y no un género
                    contra otro. (Ejemplo: Competirán dos grupos de macheteros y
                    no un grupo de macheteros contra uno de Saya.)
                  </p>
                  <p className='text-gray-700 mb-4'>
                    En caso de que haya solamente un grupo representando a un
                    género, este hará una presentación cultural.
                  </p>

                  <div className='p-4 bg-blue-50 border-l-4 border-blue-500 rounded'>
                    <p className='text-sm'>
                      <strong>NOTA:</strong> La obra representada en toda su
                      idiosincrasia y sin alteración tendrá una duración máxima
                      de 10 minutos.
                    </p>
                  </div>
                </div>

                {/* 3.9 Folklore Nacional */}
                <div className='bg-white border border-gray-200 rounded-xl p-6'>
                  <h4 className='text-xl font-bold mb-3 text-purple-600'>
                    3.9 FOLKLORE NACIONAL E INTERNACIONAL POPULAR:
                  </h4>
                  <p className='text-gray-700 mb-4'>
                    Serán inscritos todos los trabajos que son parte del acervo
                    de cada país que demuestran una mínima proyección.
                  </p>

                  <div className='p-4 mb-4 bg-yellow-50 border-l-4 border-yellow-500 rounded'>
                    <p className='text-sm'>
                      <strong>Obs.:</strong> Las coreografías inscritas no
                      podrán ser alteradas para su presentación en el evento.
                      Además, no se aceptarán alteraciones de nombre de la
                      coreografía, tiempo y música.
                    </p>
                  </div>

                  <p className='text-gray-700 mb-3'>
                    <strong>
                      En Folklore Nacional competirán danzas de la misma región:
                    </strong>
                  </p>
                  <ul className='space-y-2 ml-6'>
                    <li className='flex gap-2'>
                      <span className='text-purple-600'>•</span>
                      <span className='text-gray-700'>
                        Danzas orientales (Santa Cruz, Beni y Pando)
                      </span>
                    </li>
                    <li className='flex gap-2'>
                      <span className='text-purple-600'>•</span>
                      <span className='text-gray-700'>
                        Danzas de los valles (Cochabamba, Chuquisaca y Tarija)
                      </span>
                    </li>
                    <li className='flex gap-2'>
                      <span className='text-purple-600'>•</span>
                      <span className='text-gray-700'>
                        Danzas andinas (La Paz, Oruro y Potosí)
                      </span>
                    </li>
                    <li className='flex gap-2'>
                      <span className='text-purple-600'>•</span>
                      <span className='text-gray-700'>Danzas Chaqueñas</span>
                    </li>
                  </ul>
                </div>

                {/* 4.0 Danzas Populares */}
                <div className='bg-white border border-gray-200 rounded-xl p-6'>
                  <h4 className='text-xl font-bold mb-3 text-purple-600'>
                    4.0 DANZAS POPULARES:
                  </h4>
                  <p className='text-gray-700'>
                    Dentro de las constantes innovaciones del Festival, este
                    año, se invita especialmente a los grupos de danzas de{" "}
                    <strong>Reguetón</strong> y <strong>Caporales</strong> como
                    modalidades independientes.
                  </p>
                </div>

                {/* 4.1 K-Pop */}
                <div className='bg-white border border-gray-200 rounded-xl p-6'>
                  <h4 className='text-xl font-bold mb-3 text-purple-600'>
                    4.1 K-Pop:
                  </h4>
                  <p className='text-gray-700'>
                    Todo lo relacionado al Korean Pop. En proyección y en puesta
                    en escena. Se evalúa la originalidad de la presentación y el
                    mayor de los parecidos entre personajes y performance.
                  </p>
                </div>

                {/* 4.2 Retro Dance */}
                <div className='bg-white border border-gray-200 rounded-xl p-6'>
                  <h4 className='text-xl font-bold mb-3 text-purple-600'>
                    4.2 Retro Dance:
                  </h4>
                  <p className='text-gray-700'>
                    Tratase de estilos clásicos de baile, que nacen entre los
                    80, 90 y 2000.
                  </p>
                </div>
              </div>
            </div>

            {/* Duración de Coreografías */}
            <div data-section='duraciones' className='mb-12 scroll-mt-8'>
              <h3 className='text-2xl font-bold mb-4'>
                DURACIÓN MÁXIMA DE LA COREOGRAFÍA
              </h3>
              <p className='text-gray-700 mb-4'>
                (excepto folklore étnico y de raíz)
              </p>

              <div className='p-4 mb-6 bg-blue-50 border-l-4 border-blue-500 rounded'>
                <p>
                  <strong>NOTA:</strong> La duración mínima de la coreografía
                  será 50% del tiempo asignado en el siguiente cuadro.
                </p>
              </div>

              <div className='space-y-6'>
                {/* Tabla Colegios */}
                <div>
                  <h4 className='font-bold text-lg mb-3'>COLEGIOS</h4>
                  <div className='overflow-x-auto'>
                    <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
                      <thead className='bg-gray-50'>
                        <tr>
                          <th className='px-6 py-3 text-left font-semibold border-b'>
                            Categoría
                          </th>
                          <th className='px-6 py-3 text-left font-semibold border-b'>
                            Solo
                          </th>
                          <th className='px-6 py-3 text-left font-semibold border-b'>
                            Dúo
                          </th>
                          <th className='px-6 py-3 text-left font-semibold border-b'>
                            Grupo
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className='border-b'>
                          <td className='px-6 py-4'>Infantil</td>
                          <td className='px-6 py-4'>1:30'</td>
                          <td className='px-6 py-4'>2'</td>
                          <td className='px-6 py-4'>4'</td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4'>Juvenil</td>
                          <td className='px-6 py-4'>1:30'</td>
                          <td className='px-6 py-4'>2'</td>
                          <td className='px-6 py-4'>6'</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Tabla General */}
                <div>
                  <h4 className='font-bold text-lg mb-3'>GENERAL</h4>
                  <div className='overflow-x-auto'>
                    <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
                      <thead className='bg-gray-50'>
                        <tr>
                          <th className='px-6 py-3 text-left font-semibold border-b'>
                            Categoría
                          </th>
                          <th className='px-6 py-3 text-left font-semibold border-b'>
                            Solo
                          </th>
                          <th className='px-6 py-3 text-left font-semibold border-b'>
                            Dúo
                          </th>
                          <th className='px-6 py-3 text-left font-semibold border-b'>
                            Grupo
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className='border-b'>
                          <td className='px-6 py-4'>Infantil</td>
                          <td className='px-6 py-4'>1:30'</td>
                          <td className='px-6 py-4'>2:00'</td>
                          <td className='px-6 py-4'>4'</td>
                        </tr>
                        <tr className='border-b'>
                          <td className='px-6 py-4'>Juvenil</td>
                          <td className='px-6 py-4'>2:00'</td>
                          <td className='px-6 py-4'>2:30'</td>
                          <td className='px-6 py-4'>5'</td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4'>Adulto</td>
                          <td className='px-6 py-4'>2'</td>
                          <td className='px-6 py-4'>3'</td>
                          <td className='px-6 py-4'>6'</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className='p-4 mt-6 bg-red-50 border-l-4 border-red-500 rounded'>
                <p className='font-semibold text-red-900'>
                  ⚠️ IMPORTANTE: Las coreografías que no respeten los tiempos
                  mínimos y máximos serán descalificadas.
                </p>
              </div>
            </div>
          </section>

          {/* CAPÍTULO II - REGLAMENTOS */}
          <section className='mb-16 scroll-mt-8'>
            <div className='bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 mb-8'>
              <h2 className='text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2'>
                CAPÍTULO II
              </h2>
              <p className='text-xl text-gray-700'>REGLAMENTOS</p>
            </div>

            {/* Reglamento de Selección */}
            <div
              data-section='reglamento-seleccion'
              className='mb-12 scroll-mt-8'
            >
              <h3 className='text-2xl font-bold mb-4'>
                REGLAMENTOS DE LA SELECCIÓN
              </h3>

              <div className='space-y-4'>
                <div className='bg-white border border-gray-200 rounded-xl p-6'>
                  <h4 className='font-bold mb-2'>Artículo 1</h4>
                  <p className='text-gray-700'>
                    Los participantes pertenecientes a provincias de la sede
                    entran a competición del evento, por indicación de sus
                    autoridades provinciales.
                  </p>
                </div>

                <div className='bg-white border border-gray-200 rounded-xl p-6'>
                  <h4 className='font-bold mb-2'>Artículo 2</h4>
                  <p className='text-gray-700 mb-3'>
                    Los participantes locales serán visitados por un supervisor
                    de la organización, quien podrá sugerir mejoras para una
                    buena participación.
                  </p>
                  <p className='text-gray-700'>
                    También se podrá optar por el envío de video al mail:{" "}
                    <a
                      href='mailto:jorgelarteagap@gmail.com'
                      className='text-purple-600 underline hover:text-purple-800'
                    >
                      jorgelarteagap@gmail.com
                    </a>{" "}
                    o al número del WhatsApp:{" "}
                    <a
                      href='https://wa.me/59177633551'
                      className='text-purple-600 underline hover:text-purple-800'
                    >
                      +591-77633551
                    </a>
                  </p>
                </div>

                <div className='bg-white border border-gray-200 rounded-xl p-6'>
                  <h4 className='font-bold mb-2'>Artículo 3</h4>
                  <p className='text-gray-700'>
                    Los participantes nacionales e internacionales podrán enviar
                    sus videos al mail:{" "}
                    <a
                      href='mailto:jorgelarteagap@gmail.com'
                      className='text-purple-600 underline hover:text-purple-800'
                    >
                      jorgelarteagap@gmail.com
                    </a>{" "}
                    o al número del WhatsApp:{" "}
                    <a
                      href='https://wa.me/59177633551'
                      className='text-purple-600 underline hover:text-purple-800'
                    >
                      +591-77633551
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Reglamento Base */}
            <div data-section='reglamento-base' className='mb-12 scroll-mt-8'>
              <h3 className='text-2xl font-bold mb-4'>
                REGLAMENTO BASE DEL CONCURSO, ENSAYOS, MUESTRA
              </h3>

              <h4 className='font-bold text-lg mb-4'>
                Artículo 1 - DE LAS NORMAS TÉCNICAS SOBRE EL CONCURSO:
              </h4>

              <div className='space-y-4'>
                <div className='bg-white border-l-4 border-purple-500 rounded-lg p-4'>
                  <p className='text-gray-700'>
                    En todas las modalidades del Festival, la participación de
                    cada grupo queda limitada a un número máximo de{" "}
                    <strong>50 integrantes en total</strong> y{" "}
                    <strong>30 sobre escenario</strong> (en el lapso de la
                    coreografía podrán hacer intercambio de integrantes siempre
                    y cuando estén como máximo 30 personas bailando sobre el
                    escenario), podrán ingresar en su totalidad los 50
                    integrantes, solo 15 segundos al comienzo y 15 segundos
                    antes del final.
                  </p>
                </div>

                <div className='bg-white border-l-4 border-purple-500 rounded-lg p-4'>
                  <p className='text-gray-700'>
                    En la modalidad de colegios y la categoría infantil general,{" "}
                    <strong>
                      el coreógrafo no podrá intervenir en la coreografía, de
                      ninguna manera.
                    </strong>
                  </p>
                </div>

                <div className='bg-white border-l-4 border-purple-500 rounded-lg p-4'>
                  <p className='text-gray-700'>
                    En caso de problemas técnicos, habrá{" "}
                    <strong>1 minuto de tolerancia</strong> (pasado ese lapso se
                    suspende la presentación coreográfica y pasa el concursante
                    para su presentación más adelante o al final del programa).
                  </p>
                </div>

                <div className='bg-white border-l-4 border-purple-500 rounded-lg p-4'>
                  <p className='text-gray-700'>
                    Serán permitidos elementos escénicos simples y prácticos que
                    quedarán a cargo del grupo participante. El grupo tendrá{" "}
                    <strong>
                      un minuto, antes y otro después de la presentación
                    </strong>{" "}
                    para el montaje y desalojo de escenografía.
                  </p>
                </div>

                <div className='bg-white border-l-4 border-red-500 rounded-lg p-4'>
                  <p className='text-gray-700 font-semibold'>
                    🚫 No está permitido el uso de Símbolos Patrios, ni
                    vestuario que muestren siglas políticas.
                  </p>
                </div>

                <div className='bg-white border-l-4 border-purple-500 rounded-lg p-4'>
                  <p className='text-gray-700'>
                    Se sugiere la presencia de un responsable técnico en la
                    cabina de luz, sonido y video durante la presentación del
                    grupo.
                  </p>
                </div>

                <div className='bg-white border-l-4 border-purple-500 rounded-lg p-4'>
                  <p className='text-gray-700 mb-2'>
                    Los participantes deben traer en{" "}
                    <strong>dos archivos MP3 y WAV</strong> para cada música que
                    va ser ejecutada siendo una para el ensayo y otra para la
                    presentación.
                  </p>
                  <p className='text-gray-700'>
                    Si desean pueden traer imágenes de fondo en un flash memory
                    o USB (sin virus) para las pantallas LED, este material debe
                    ser enviado de manera impostergable al coordinador de las
                    presentaciones con el tiempo máximo de{" "}
                    <strong>1 semana antes del evento</strong>, caso contrario
                    no podrán participar del festival.
                  </p>
                </div>

                <div className='bg-white border-l-4 border-purple-500 rounded-lg p-4'>
                  <p className='text-gray-700'>
                    Cada participante o grupo deberá llegar{" "}
                    <strong>una hora antes</strong> del horario de su
                    presentación.
                  </p>
                </div>

                <div className='bg-white border-l-4 border-purple-500 rounded-lg p-4'>
                  <p className='text-gray-700'>
                    <strong>De la ocupación de los camerinos:</strong> Deberán
                    ser desocupados después de la presentación del grupo, de
                    modo que puedan ser utilizados por el grupo siguiente. La
                    organización no se responsabilizará por objetos dejados en
                    los camerinos, ni de los accesorios utilizados en la danza.
                  </p>
                </div>

                <div className='bg-white border-l-4 border-yellow-500 rounded-lg p-4'>
                  <p className='text-gray-700 mb-2'>
                    En caso de querer utilizar pirotecnia, se autoriza el uso de
                    gerbs, fuego controlado, papel picado que no sea metalizado,
                    solo a través de personal profesional.
                  </p>
                  <p className='text-gray-600 text-sm'>
                    (Referencia Fire Show 70877218 prof. Julio César)
                  </p>
                </div>

                <div className='bg-white border-l-4 border-red-500 rounded-lg p-4'>
                  <p className='text-gray-700 font-semibold'>
                    🚫 En ningún caso se permitirá el uso de fuego no
                    controlado, aceites, agua o elementos relativos, porque
                    entorpecen el normal desenvolvimiento del evento y se
                    consideran peligrosos para el escenario.
                  </p>
                </div>

                <div className='bg-white border-l-4 border-red-500 rounded-lg p-4'>
                  <p className='text-gray-700'>
                    No podrá haber cambios de última hora, ni en la modalidad,
                    categoría y lista de los concursantes. Además, no habrá
                    adición de nuevas coreografías en el concurso, ni la
                    partición de una coreografía de un tiempo mayor al
                    establecido en la convocatoria, en dos o más coreografías.
                  </p>
                </div>

                <div className='bg-white border-l-4 border-purple-500 rounded-lg p-4'>
                  <p className='text-gray-700'>
                    Los grupos participantes deberán presentarse de acuerdo con
                    su ficha de inscripción con respecto a su contenido, idea,
                    puesto en escena, vestuario y música. El trabajo
                    coreográfico no podrá ser cambiado, no deberá aumentar el
                    número de participantes, se podrá disminuir, pero con debida
                    explicación para que el jurado y la organización lo
                    contemple.
                  </p>
                </div>

                <div className='bg-white border-l-4 border-purple-500 rounded-lg p-4'>
                  <p className='text-gray-700'>
                    Todos los grupos y participantes en general deberán hacer
                    saber el origen de su trabajo con una breve información
                    técnica, acerca del trabajo a presentar sobre el escenario.
                    (Ej.: Nombre del: coreógrafo, ensayador, repositor, etc.)
                  </p>
                </div>

                <div className='p-4 bg-red-50 border-l-4 border-red-500 rounded'>
                  <p className='font-semibold text-red-900'>
                    ⚠️ Obs.: Cualquier falta a las anteriores observaciones
                    serán suficiente para la descalificación del participante o
                    los participantes.
                  </p>
                </div>
              </div>
            </div>

            {/* Premio del Público */}
            <div data-section='premio-publico' className='mb-12 scroll-mt-8'>
              <h3 className='text-2xl font-bold mb-4'>
                Artículo 2 - DE LAS NORMAS DEL PREMIO POR VOTACIÓN DEL PÚBLICO
              </h3>

              <div className='bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6'>
                <p className='text-gray-700 mb-4'>
                  El público podrá votar por el (solista, dúo, trío o grupo)
                  concursante de su preferencia hasta{" "}
                  <strong>
                    cinco minutos después de la finalización de la última
                    presentación
                  </strong>{" "}
                  de la primera y segunda noche, en la página de{" "}
                  <strong>Danzacruz.com</strong>
                </p>
                <p className='text-gray-700 mb-4'>
                  Todos los votos serán recabados por una persona de la
                  organización y serán contabilizados.
                </p>
                <p className='text-gray-700'>
                  En la gran final el <strong>día 09 de noviembre</strong> el
                  solista, dúo, trío o grupo ganador será premiado como el
                  favorito del público con un reconocimiento especial en los 25
                  años del festival.{" "}
                  <strong>Premio especial en sus Bodas de Plata.</strong>
                </p>
              </div>
            </div>

            {/* Ensayos */}
            <div data-section='ensayos' className='mb-12 scroll-mt-8'>
              <h3 className='text-2xl font-bold mb-4'>Artículo 3 - ENSAYOS</h3>

              <div className='bg-white border border-gray-200 rounded-xl p-6'>
                <p className='text-gray-700 mb-4'>
                  El orden de ensayo en escenario será elaborado por la
                  organización del Festival. El grupo que no ensaye en el
                  horario asignado perderá su turno.
                </p>
                <p className='text-gray-700 mb-4'>
                  Cada participante tendrá{" "}
                  <strong>1 oportunidad de ensayo</strong>, más{" "}
                  <strong>2 minutos</strong> para reconocimiento de escenario u
                  algún otro detalle (aclaración técnica).
                </p>
                <div className='p-4 bg-blue-50 border-l-4 border-blue-500 rounded'>
                  <p>
                    <strong>Horario general de ensayos:</strong> 9:00 a 14:00 de
                    los días <strong>6, 7 y 8 de octubre.</strong>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CAPÍTULO III - INSCRIPCIONES */}
          <section data-section='inscripciones' className='mb-16 scroll-mt-8'>
            <div className='bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 mb-8'>
              <h2 className='text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2'>
                CAPÍTULO III
              </h2>
              <p className='text-xl text-gray-700'>
                DE LAS INSCRIPCIONES, PRECIOS Y PLAZOS
              </p>
            </div>

            <div className='space-y-8'>
              {/* Artículo 1 - Colegios y Universidades */}
              <div className='bg-white border border-gray-200 rounded-xl p-6'>
                <h3 className='text-xl font-bold mb-4'>
                  Artículo 1 – Para participantes de Colegios y Universidades
                </h3>
                <p className='text-gray-700 mb-4'>
                  Se les entregará <strong>100 entradas</strong> (que tienen un
                  valor de <strong>Bs. 25 por entrada</strong>) como inscripción
                  por coreografía (válidas para el día de su presentación
                  clasificatoria), las cuales deberán ser canceladas a la
                  organización hasta el día{" "}
                  <strong>jueves 30 de octubre.</strong>
                </p>
                <p className='text-gray-700'>
                  Además, recibirán <strong>50 entradas más de cortesía</strong>{" "}
                  de parte de la organización de las cuales serán para el día de
                  la presentación de su agrupación.
                </p>
              </div>

              {/* Grupos Independientes */}
              <div className='bg-white border border-gray-200 rounded-xl p-6'>
                <h3 className='text-xl font-bold mb-4'>
                  Grupos Independientes y Escuelas de Danza
                </h3>
                <p className='text-gray-700 mb-4'>
                  Los grupos independientes y escuelas de danza deberán
                  confirmar su participación efectuando un depósito:
                </p>
                <ul className='space-y-2 ml-6 mb-4'>
                  <li className='flex gap-2'>
                    <span className='text-purple-600'>•</span>
                    <span className='text-gray-700'>
                      <strong>Grupos de 4 a 15 personas:</strong> Bs. 60 por
                      bailarín por presentación
                    </span>
                  </li>
                  <li className='flex gap-2'>
                    <span className='text-purple-600'>•</span>
                    <span className='text-gray-700'>
                      <strong>Grupos de 16 a 50 personas:</strong> Bs. 50 por
                      bailarín por presentación
                    </span>
                  </li>
                </ul>
                <p className='text-gray-600 text-sm'>
                  Incluye: certificado de participación.
                </p>
              </div>

              {/* Solistas, Dúos, Tríos */}
              <div className='bg-white border border-gray-200 rounded-xl p-6'>
                <h3 className='text-xl font-bold mb-4'>
                  Solistas, Dúos y Tríos
                </h3>
                <ul className='space-y-2'>
                  <li className='flex gap-2'>
                    <span className='text-purple-600'>•</span>
                    <span className='text-gray-700'>
                      <strong>Solistas:</strong> Bs. 250 (doscientos cincuenta
                      bolivianos)
                    </span>
                  </li>
                  <li className='flex gap-2'>
                    <span className='text-purple-600'>•</span>
                    <span className='text-gray-700'>
                      <strong>Dúo:</strong> Bs. 100 (cien bolivianos) por
                      bailarín
                    </span>
                  </li>
                  <li className='flex gap-2'>
                    <span className='text-purple-600'>•</span>
                    <span className='text-gray-700'>
                      <strong>Trío:</strong> Bs. 80 (ochenta bolivianos) por
                      bailarín
                    </span>
                  </li>
                </ul>
              </div>

              {/* Tabla de Costos */}
              <div>
                <h3 className='text-xl font-bold mb-4'>
                  Tabla Completa de Costos
                </h3>
                <div className='overflow-x-auto'>
                  <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th className='px-6 py-3 text-left font-semibold border-b'>
                          Concursantes
                        </th>
                        <th className='px-6 py-3 text-left font-semibold border-b'>
                          Valor Participación
                        </th>
                        <th className='px-6 py-3 text-left font-semibold border-b'>
                          Observación
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className='border-b'>
                        <td className='px-6 py-4'>
                          Grupo Independiente 4-15 personas
                        </td>
                        <td className='px-6 py-4'>Bs. 60.00</td>
                        <td className='px-6 py-4'>Por participante</td>
                      </tr>
                      <tr className='border-b'>
                        <td className='px-6 py-4'>
                          Grupo Independiente 16-50 personas
                        </td>
                        <td className='px-6 py-4'>Bs. 50.00</td>
                        <td className='px-6 py-4'>Por participante</td>
                      </tr>
                      <tr className='border-b'>
                        <td className='px-6 py-4'>
                          Escuelas de Danza 4-15 personas
                        </td>
                        <td className='px-6 py-4'>Bs. 50.00</td>
                        <td className='px-6 py-4'>Por participante</td>
                      </tr>
                      <tr className='border-b'>
                        <td className='px-6 py-4'>
                          Escuelas de Danza 16-50 personas
                        </td>
                        <td className='px-6 py-4'>Bs. 60.00</td>
                        <td className='px-6 py-4'>Por participante</td>
                      </tr>
                      <tr className='border-b'>
                        <td className='px-6 py-4'>Solistas</td>
                        <td className='px-6 py-4'>Bs. 250.00</td>
                        <td className='px-6 py-4'>-</td>
                      </tr>
                      <tr className='border-b'>
                        <td className='px-6 py-4'>Dúo</td>
                        <td className='px-6 py-4'>Bs. 100.00</td>
                        <td className='px-6 py-4'>Por participante</td>
                      </tr>
                      <tr>
                        <td className='px-6 py-4'>Trío</td>
                        <td className='px-6 py-4'>Bs. 80.00</td>
                        <td className='px-6 py-4'>Por participante</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className='mt-4 space-y-2 text-sm text-gray-600'>
                  <p>
                    • La credencial tendrá un costo de <strong>Bs. 10</strong>
                  </p>
                  <p>
                    • Todos los participantes recibirán un certificado de
                    participación.
                  </p>
                  <p>
                    • El coordinador/director o coreógrafo queda exento de pago,
                    se le dotará de una polera de participación (una persona por
                    escuela, agrupación o grupo independiente)
                  </p>
                </div>
              </div>

              {/* Requerimientos para Inscripción */}
              <div className='bg-white border border-gray-200 rounded-xl p-6'>
                <h3 className='text-xl font-bold mb-4'>
                  Requerimientos para la Inscripción:
                </h3>
                <ul className='space-y-3'>
                  <li className='flex gap-3'>
                    <span className='text-purple-600 font-bold'>a)</span>
                    <span className='text-gray-700'>
                      Foto digital reciente de cada integrante medida 3x4, con
                      el detalle del nombre completo.
                    </span>
                  </li>
                  <li className='flex gap-3'>
                    <span className='text-purple-600 font-bold'>b)</span>
                    <span className='text-gray-700'>
                      Cédula de identidad (carnet de identidad) o certificado de
                      nacimiento, de cada integrante del grupo (escaneada).
                    </span>
                  </li>
                  <li className='flex gap-3'>
                    <span className='text-purple-600 font-bold'>c)</span>
                    <div className='text-gray-700'>
                      <p className='mb-2'>
                        Los participantes internacionales, nacionales y de
                        provincia y otros, pueden inscribirse haciendo un
                        depósito en el{" "}
                        <strong>Banco Mercantil Santa Cruz:</strong>
                      </p>
                      <div className='bg-gray-50 rounded-lg p-4 mt-2 space-y-2'>
                        <p>
                          <strong>Cuenta No.:</strong> 4028108924
                        </p>
                        <p>
                          <strong>A nombre de:</strong> Jesús Adhemar Añez
                          Peinado
                        </p>
                        <p className='text-sm'>
                          O solicitar el QR correspondiente al WhatsApp{" "}
                          <a
                            href='https://wa.me/59175553576'
                            className='text-purple-600 underline hover:text-purple-800'
                          >
                            +591 75553576
                          </a>
                        </p>
                        <p className='text-sm mt-2'>
                          Para cálculos en moneda extranjera y gastos bancarios
                          por favor dirigirse a través de WhatsApp al número{" "}
                          <a
                            href='https://wa.me/59175553576'
                            className='text-purple-600 underline hover:text-purple-800'
                          >
                            +591 75553576
                          </a>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className='flex gap-3'>
                    <span className='text-purple-600 font-bold'>d)</span>
                    <span className='text-gray-700'>
                      Todos los participantes, de provincia, otros departamentos
                      e internacionales, que se inscriban mediante depósito
                      bancario deben enviar su comprobante de depósito junto a
                      su ficha de inscripción debidamente llenada al WhatsApp al
                      número{" "}
                      <a
                        href='https://wa.me/59177633551'
                        className='text-purple-600 underline hover:text-purple-800'
                      >
                        +591 77633551
                      </a>
                    </span>
                  </li>
                  <li className='flex gap-3'>
                    <span className='text-purple-600 font-bold'>e)</span>
                    <div className='text-gray-700'>
                      <p className='font-semibold mb-2'>Observaciones:</p>
                      <ul className='space-y-2 ml-4'>
                        <li className='flex gap-2'>
                          <span>•</span>
                          <span>
                            Serán aceptadas solamente fichas correctamente
                            llenadas, dactilografiadas o digitadas correctamente
                            con todos los datos completos.
                          </span>
                        </li>
                        <li className='flex gap-2'>
                          <span>•</span>
                          <span>
                            Si la ficha de inscripción no estuviera acompañada
                            del comprobante del depósito o su cancelación no
                            llegará en el plazo determinado, el participante
                            quedará automáticamente fuera de concurso.
                          </span>
                        </li>
                        <li className='flex gap-2'>
                          <span>•</span>
                          <span>
                            Los organizadores se reservan el derecho de
                            admisión, inscripción y de algún cambio efectuado a
                            última hora.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>

                <div className='p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded mt-6'>
                  <p className='mb-2 font-semibold'>
                    Disminución de participantes:
                  </p>
                  <p className='text-sm mb-2'>
                    En caso de existir disminución en el número de participantes
                    de un grupo deberá justificar por escrito el cambio, hasta
                    el inicio de su ensayo. No obstante, la disminución de un
                    bailarín, el grupo podrá concursar, más el bailarín no podrá
                    entrar en competencia, no recibirá credencial ni
                    certificado.
                  </p>
                  <p className='text-sm'>
                    La alteración del elenco sólo podrá ser realizada en
                    coreografías de conjunto y de grupo, no así en, solos, dúos
                    o tríos.
                  </p>
                </div>

                <div className='mt-4 bg-purple-50 rounded-lg p-4'>
                  <p className='text-gray-700'>
                    El pago de la inscripción dará derecho al libre acceso a las
                    presentaciones, muestras, competiciones, talleres especiales
                    gratuitos y espectáculos.
                  </p>
                </div>
              </div>

              {/* Opción de Sugerencias */}
              <div className='bg-white border border-gray-200 rounded-xl p-6'>
                <h3 className='text-xl font-bold mb-4'>
                  f) Opción a recibir sugerencias sobre su coreografía:
                </h3>
                <p className='text-gray-700'>
                  Los participantes que deseen que su coreografía sea observada
                  y recibir sugerencias para mejorar su trabajo, pueden enviarlo
                  filmado, sin necesidad de usar vestuario, a{" "}
                  <a
                    href='mailto:chichomachine@yahoo.com'
                    className='text-purple-600 underline hover:text-purple-800'
                  >
                    chichomachine@yahoo.com
                  </a>{" "}
                  o al WhatsApp hasta el <strong>30 de septiembre.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Talleres */}
          <section data-section='talleres' className='mb-16 scroll-mt-8'>
            <div className='bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 mb-8'>
              <h3 className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2'>
                Artículo 2 - TALLERES O WORKSHOP
              </h3>
              <p className='text-xl text-gray-700'>
                Tendremos talleres gratuitos
              </p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
              {[
                { icon: "🎵", title: "Ritmos Tropicales" },
                { icon: "🎭", title: "Folklore" },
                { icon: "💪", title: "Preparación Física para Bailarines" },
                { icon: "🩰", title: "Ballet Clásico" },
                { icon: "🇧🇷", title: "Ritmos Brasileños" },
                { icon: "💡", title: "Iluminación para Escenarios" },
              ].map((taller, index) => (
                <div
                  key={index}
                  className='bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow'
                >
                  <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4'>
                    <span className='text-2xl'>{taller.icon}</span>
                  </div>
                  <h4 className='font-bold mb-2'>{taller.title}</h4>
                </div>
              ))}
            </div>

            <div className='bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6'>
              <p className='font-bold text-lg mb-2'>🎓 CUPOS LIMITADOS</p>
              <p className='text-gray-700 mb-2'>
                Se entregará certificado de participación.
              </p>
              <p className='text-gray-600 text-sm'>
                Se irán actualizando los diferentes talleres en nuestras redes
                sociales.
              </p>
            </div>
          </section>
          {/* CAPÍTULO IV - Evaluación */}
          <section data-section='evaluacion' className='mb-16 scroll-mt-8'>
            <div className='bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 mb-8'>
              <h2 className='text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2'>
                CAPÍTULO IV
              </h2>
              <p className='text-xl text-gray-700'>CRITERIO DE EVALUACIÓN</p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {[
                "Coreografía",
                "Movimiento Escenográfico",
                "Presencia Escénica",
                "Vestuario",
                "Factor Sorpresa",
                "Creatividad",
                "Originalidad",
                "Musicalización",
                "Compaginación de Video",
                "Barra",
              ].map((criterio, index) => (
                <div
                  key={index}
                  className='bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow'
                >
                  <span className='text-purple-600 font-semibold'>
                    {criterio}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* CAPÍTULO V - Calificación */}
          <section data-section='calificacion' className='mb-16 scroll-mt-8'>
            <div className='bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 mb-8'>
              <h2 className='text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2'>
                CAPÍTULO V
              </h2>
              <p className='text-xl text-gray-700'>
                DE LA CALIFICACIÓN Y RESULTADOS
              </p>
            </div>

            <div className='space-y-6'>
              <div className='bg-white border border-gray-200 rounded-xl p-6'>
                <h3 className='font-bold text-lg mb-3'>Artículo 1</h3>
                <p className='text-gray-700'>
                  Los trabajos presentados serán analizados por un cuerpo de
                  jurado, compuesto por personalidades de la danza de nivel
                  nacional e internacional. Los componentes de la comisión del
                  jurado no podrán tener ningún vínculo profesional o personal,
                  directo o indirecto con los grupos que se presenten.
                </p>
              </div>

              <div className='bg-white border border-gray-200 rounded-xl p-6'>
                <h3 className='font-bold text-lg mb-4'>
                  Artículo 2 - La calificación o puntuación de los trabajos
                  llevará el siguiente criterio:
                </h3>
                <div className='space-y-4'>
                  <div className='border-l-4 border-yellow-500 pl-4'>
                    <p className='font-bold text-lg text-yellow-600'>
                      1er Lugar
                    </p>
                    <p className='text-gray-700'>
                      Los participantes que obtengan la media arriba de 9.1 a 10
                      puntos
                    </p>
                  </div>
                  <div className='border-l-4 border-gray-400 pl-4'>
                    <p className='font-bold text-lg text-gray-600'>2do Lugar</p>
                    <p className='text-gray-700'>
                      Los participantes que obtengan la media arriba de 8.1 a
                      9.0 puntos
                    </p>
                  </div>
                  <div className='border-l-4 border-orange-500 pl-4'>
                    <p className='font-bold text-lg text-orange-600'>
                      3er Lugar
                    </p>
                    <p className='text-gray-700'>
                      Los participantes que obtengan la media arriba de 7.1 a
                      8.0 puntos
                    </p>
                  </div>
                </div>
                <div className='p-4 bg-blue-50 border-l-4 border-blue-500 rounded mt-4'>
                  <p className='text-sm'>
                    <strong>Obs.:</strong> Puntaje Menor a 7.1 puntos se tomará
                    como desierto (sin premiación).
                  </p>
                </div>
              </div>

              <div className='bg-white border border-gray-200 rounded-xl p-6'>
                <h3 className='font-bold text-lg mb-3'>Artículo 3</h3>
                <p className='text-gray-700'>
                  La divulgación de los resultados para el público se dará
                  durante las noches del Festival además en el panel de
                  información de la Escuela de Danza Fama Machine y en la página
                  Web:{" "}
                  <a
                    href='https://www.danzacruz.com'
                    className='text-purple-600 underline hover:text-purple-800'
                  >
                    www.danzacruz.com
                  </a>{" "}
                  y fan page de Facebook: Danzacruz.
                </p>
              </div>
            </div>
          </section>

          {/* CAPÍTULO VI - Premiación */}
          <section data-section='premiacion' className='mb-16 scroll-mt-8'>
            <div className='bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 mb-8'>
              <h2 className='text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2'>
                CAPÍTULO VI
              </h2>
              <p className='text-xl text-gray-700'>DE LA PREMIACIÓN</p>
            </div>

            <div className='grid md:grid-cols-2 gap-6 mb-8'>
              {/* Solista */}
              <div className='bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-xl p-6'>
                <div className='text-4xl mb-3'>🥇</div>
                <h3 className='text-xl font-bold mb-4'>
                  GANADOR ABSOLUTO SOLISTA
                  <br />
                  CATEGORÍA GENERAL
                </h3>
                <ul className='space-y-2 text-sm mb-4'>
                  <li>✓ Pase directo y gratuito a Danzacruz 2026</li>
                  <li>✓ 15 entradas de ingreso al evento Danzacruz 2026</li>
                  <li>✓ Bs. 400 en efectivo</li>
                </ul>
                <p className='text-xs text-gray-600 mb-2'>
                  El premio en efectivo será válido con 15 participantes como
                  mínimo
                </p>
                <p className='font-bold text-yellow-700'>
                  Valor total del premio: Bs. 775 (setecientos setenta y cinco
                  Bolivianos)
                </p>
              </div>

              {/* Dúo */}
              <div className='bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-xl p-6'>
                <div className='text-4xl mb-3'>🏆</div>
                <h3 className='text-xl font-bold mb-4'>
                  GANADOR ABSOLUTO DÚO
                  <br />
                  CATEGORÍA GENERAL
                </h3>
                <ul className='space-y-2 text-sm mb-4'>
                  <li>✓ Pase directo y gratuito a Danzacruz 2026</li>
                  <li>✓ 20 entradas de ingreso al evento Danzacruz 2026</li>
                  <li>✓ Bs. 600 en efectivo</li>
                </ul>
                <p className='text-xs text-gray-600 mb-2'>
                  El premio en efectivo será válido con 10 dúos participantes
                  como mínimo
                </p>
                <p className='font-bold text-purple-700'>
                  Valor total del premio: Bs. 1,100 (Un mil cien Bolivianos)
                </p>
              </div>

              {/* Trío */}
              <div className='bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6'>
                <div className='text-4xl mb-3'>🎖️</div>
                <h3 className='text-xl font-bold mb-4'>
                  GANADOR ABSOLUTO TRÍO
                  <br />
                  CATEGORÍA GENERAL
                </h3>
                <ul className='space-y-2 text-sm mb-4'>
                  <li>✓ Pase directo y gratuito a Danzacruz 2026</li>
                  <li>✓ 30 entradas de ingreso al evento Danzacruz 2026</li>
                  <li>✓ Bs. 800 en efectivo</li>
                </ul>
                <p className='text-xs text-gray-600 mb-2'>
                  El premio en efectivo será válido con 10 tríos participantes
                  como mínimo
                </p>
                <p className='font-bold text-blue-700'>
                  Valor total del premio: Bs. 1,550 (Un mil quinientos cincuenta
                  Bolivianos)
                </p>
              </div>

              {/* Grupo Chico */}
              <div className='bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-6'>
                <div className='text-4xl mb-3'>👥</div>
                <h3 className='text-xl font-bold mb-4'>
                  GANADOR ABSOLUTO GRUPO CHICO
                  <br />
                  CATEGORÍA GENERAL
                </h3>
                <ul className='space-y-2 text-sm mb-4'>
                  <li>✓ Pase directo y gratuito a Danzacruz 2026</li>
                  <li>✓ 40 entradas de ingreso al evento Danzacruz 2026</li>
                  <li>✓ Bs. 1,400 en efectivo</li>
                </ul>
                <p className='text-xs text-gray-600 mb-2'>
                  El premio en efectivo será válido con 15 grupos participantes
                  como mínimo
                </p>
                <p className='font-bold text-green-700'>
                  Valor total del premio: Bs. 2,400 (Dos mil cuatrocientos
                  Bolivianos)
                </p>
              </div>

              {/* Grupo Grande */}
              <div className='bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-xl p-6'>
                <div className='text-4xl mb-3'>🎭</div>
                <h3 className='text-xl font-bold mb-4'>
                  GANADOR ABSOLUTO GRUPO GRANDE
                  <br />
                  CATEGORÍA GENERAL
                </h3>
                <ul className='space-y-2 text-sm mb-4'>
                  <li>✓ Pase directo y gratuito a Danzacruz 2026</li>
                  <li>✓ 50 entradas de ingreso al evento Danzacruz 2026</li>
                  <li>✓ Bs. 3,300 en efectivo</li>
                </ul>
                <p className='text-xs text-gray-600 mb-2'>
                  El premio en efectivo será válido con 15 grupos participantes
                  como mínimo
                </p>
                <p className='font-bold text-red-700'>
                  Valor total del premio: Bs. 4,505 (Cuatro mil quinientos
                  cincuenta Bolivianos)
                </p>
              </div>

              {/* Colegios */}
              <div className='bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-xl p-6'>
                <div className='text-4xl mb-3'>🏫</div>
                <h3 className='text-xl font-bold mb-4'>
                  GANADOR ABSOLUTO
                  <br />
                  COLEGIOS
                </h3>
                <ul className='space-y-2 text-sm mb-4'>
                  <li>✓ Bs. 5,000 en efectivo</li>
                </ul>
                <p className='text-xs text-gray-600'>
                  El premio en efectivo será válido con 10 colegios
                  participantes como mínimo
                </p>
              </div>
            </div>

            {/* Premios Especiales */}
            <div className='bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8 mb-8'>
              <h3 className='text-2xl font-bold mb-6 text-center'>
                PREMIACIÓN ESPECIAL
              </h3>
              <p className='text-center text-gray-700 mb-6'>
                Serán premiados de manera especial:
              </p>
              <div className='grid md:grid-cols-3 gap-4'>
                {[
                  { icon: "⭐", title: "Mejor Bailarín" },
                  { icon: "⭐", title: "Mejor Bailarina" },
                  { icon: "🎨", title: "Mejor Coreografía" },
                  { icon: "👗", title: "Mejor Vestuario" },
                  { icon: "🎬", title: "Mejor Producción" },
                  { icon: "🎥", title: "Mejor Compaginación de Video" },
                ].map((premio, index) => (
                  <div
                    key={index}
                    className='text-center bg-white rounded-lg p-4'
                  >
                    <div className='text-3xl mb-2'>{premio.icon}</div>
                    <p className='font-semibold'>{premio.title}</p>
                  </div>
                ))}
              </div>
              <div className='text-center bg-yellow-100 rounded-lg p-4 mt-4'>
                <div className='text-3xl mb-2'>📣</div>
                <p className='font-semibold'>
                  Premio Sorpresa a la Mejor Barra por Noche
                </p>
              </div>
            </div>

            {/* Proyección Internacional */}
            <div className='bg-white border-l-4 border-purple-500 rounded-lg p-6 mb-8'>
              <h4 className='font-bold text-lg mb-3 flex items-center gap-2'>
                <span className='text-2xl'>🌍</span>
                Proyección Internacional
              </h4>
              <p className='text-gray-700'>
                <strong>NOTA:</strong> Los trabajos coreográficos DESTACADOS,
                serán sugeridos al CID (CONSEJO INTERNACIONAL DE LA DANZA) que
                tiene su base en Grecia, para que puedan participar por nuestro
                país, en varios festivales MUNDIALES DE DANZA, que se realizan
                en diferentes países. Haciendo notar que el festival y sus
                organizadores son parte de este ente que tiene a más de 155
                países asociados.
              </p>
            </div>

            {/* Sistema de Premiación */}
            <div className='bg-white border border-gray-200 rounded-xl p-6'>
              <h4 className='font-bold text-lg mb-4'>Sistema de Premiación</h4>
              <p className='text-gray-700 mb-4'>
                a) Finalizando la última noche del evento, se darán a conocer a
                los primeros lugares del festival y se premiará a los
                participantes nacionales e internacionales, exceptuando a los
                participantes locales y regionales que serán premiados 1 semana
                después.
              </p>
              <ul className='space-y-2'>
                <li className='flex gap-2'>
                  <span className='text-yellow-600 font-bold'>🥇</span>
                  <span>
                    <strong>1er Lugar:</strong> Trofeo y Certificados
                  </span>
                </li>
                <li className='flex gap-2'>
                  <span className='text-gray-400 font-bold'>🥈</span>
                  <span>
                    <strong>2do Lugar:</strong> Medalla y Certificados
                  </span>
                </li>
                <li className='flex gap-2'>
                  <span className='text-orange-600 font-bold'>🥉</span>
                  <span>
                    <strong>3er Lugar:</strong> Certificados
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* CAPÍTULO VII - Observaciones Generales */}
          <section data-section='observaciones' className='mb-16 scroll-mt-8'>
            <div className='bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 mb-8'>
              <h2 className='text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2'>
                CAPÍTULO VII
              </h2>
              <p className='text-xl text-gray-700'>
                DE LAS OBSERVACIONES GENERALES
              </p>
            </div>

            <div className='space-y-6'>
              <div className='bg-white border border-gray-200 rounded-xl p-6'>
                <p className='text-gray-700'>
                  Cada participante deberá llenar sus inscripciones
                  (cursos/concurso), llenado todos los datos y enviando su ficha
                  de inscripción a través de WhatsApp al número{" "}
                  <a
                    href='https://wa.me/59175095094'
                    className='text-purple-600 underline hover:text-purple-800'
                  >
                    +591 75095094
                  </a>
                </p>
              </div>

              <div className='bg-white border border-gray-200 rounded-xl p-6'>
                <h4 className='font-bold text-lg mb-3'>DEL JURADO</h4>
                <p className='text-gray-700'>
                  Los trabajos que se presentan en el evento, serán analizados
                  por un cuerpo de jurado, personalidades de la danza con mucha
                  experiencia en el medio artístico. En esta versión el cuerpo
                  de jurado estará dirigido por un jurador (jefe de jurados)
                  quien reúne, las pautas generales según últimas
                  actualizaciones sobre evaluaciones de danza a nivel
                  internacional.
                </p>
              </div>

              <div className='bg-white border-l-4 border-purple-500 rounded-lg p-6'>
                <h4 className='font-bold text-lg mb-3'>USO DE IMÁGENES</h4>
                <p className='text-gray-700'>
                  El Festival Internacional Danzacruz se reserva el derecho de
                  utilizar las imágenes de las coreografías, jurado, coreógrafos
                  y público con fines promocionales o comerciales. Todos los
                  participantes ceden estos derechos a la organización de forma
                  permanente e irrevocable, sin límite de tiempo y lugar.
                </p>
              </div>

              <div className='bg-white border-l-4 border-red-500 rounded-lg p-6'>
                <h4 className='font-bold text-lg mb-3'>
                  DESCARGA DE RESPONSABILIDAD
                </h4>
                <p className='text-gray-700 mb-3'>
                  El Festival Internacional Danzacruz deslinda toda
                  responsabilidad de las posibles lesiones que pudieran suceder
                  durante los ensayos, reconocimiento de piso y concurso. De la
                  misma manera no se hace responsable de objetos perdidos,
                  hurtados o robados.
                </p>
                <p className='text-gray-700'>
                  Los concursantes si así lo desearan deberán adquirir un seguro
                  contra accidentes.
                </p>
              </div>

              <div className='bg-white border border-gray-200 rounded-xl p-6'>
                <h4 className='font-bold text-lg mb-3'>
                  DE LOS REQUISITOS PARA ENTRAR EN CONCURSO
                </h4>
                <p className='text-gray-700'>
                  Adicionalmente a los requisitos técnicos expuestos
                  anteriormente, todos los concursantes deberán tener la
                  cancelación de su participación hasta el día{" "}
                  <strong>30 de octubre</strong> del año en curso.
                </p>
              </div>
            </div>
          </section>

          {/* CONTACTO */}
          <section data-section='contacto' className='mb-16 scroll-mt-8'>
            <div className='bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 mb-8'>
              <h2 className='text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2'>
                Contacto
              </h2>
              <p className='text-xl text-gray-700'>
                Estamos aquí para resolver todas tus dudas
              </p>
            </div>

            <div className='grid md:grid-cols-2 gap-8'>
              {/* Información de Contacto */}
              <div className='bg-white rounded-2xl p-8 border border-gray-200'>
                <h3 className='text-2xl font-bold mb-6'>
                  Información de Contacto
                </h3>
                <div className='space-y-6'>
                  <div className='flex items-start gap-4'>
                    <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0'>
                      <span className='text-white text-xl'>📧</span>
                    </div>
                    <div>
                      <p className='font-semibold mb-1'>Email General</p>
                      <a
                        href='mailto:chichomachine@yahoo.com'
                        className='text-purple-600 hover:underline'
                      >
                        chichomachine@yahoo.com
                      </a>
                    </div>
                  </div>

                  <div className='flex items-start gap-4'>
                    <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0'>
                      <span className='text-white text-xl'>📱</span>
                    </div>
                    <div>
                      <p className='font-semibold mb-1'>
                        WhatsApp - Inscripciones
                      </p>
                      <a
                        href='https://wa.me/59177633551'
                        className='text-purple-600 hover:underline'
                      >
                        +591 77633551
                      </a>
                    </div>
                  </div>

                  <div className='flex items-start gap-4'>
                    <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0'>
                      <span className='text-white text-xl'>📱</span>
                    </div>
                    <div>
                      <p className='font-semibold mb-1'>WhatsApp - Consultas</p>
                      <a
                        href='https://wa.me/59175553576'
                        className='text-purple-600 hover:underline'
                      >
                        +591 75553576
                      </a>
                    </div>
                  </div>

                  <div className='flex items-start gap-4'>
                    <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0'>
                      <span className='text-white text-xl'>📱</span>
                    </div>
                    <div>
                      <p className='font-semibold mb-1'>WhatsApp - Fichas</p>
                      <a
                        href='https://wa.me/59175095094'
                        className='text-purple-600 hover:underline'
                      >
                        +591 75095094
                      </a>
                    </div>
                  </div>

                  <div className='flex items-start gap-4'>
                    <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0'>
                      <span className='text-white text-xl'>🌐</span>
                    </div>
                    <div>
                      <p className='font-semibold mb-1'>Sitio Web</p>
                      <a
                        href='https://www.danzacruz.com'
                        className='text-purple-600 hover:underline'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        www.danzacruz.com
                      </a>
                    </div>
                  </div>

                  <div className='flex items-start gap-4'>
                    <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0'>
                      <span className='text-white text-xl'>📍</span>
                    </div>
                    <div>
                      <p className='font-semibold mb-1'>Ubicación</p>
                      <p className='text-gray-600'>
                        Santa Cruz de la Sierra, Bolivia
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fechas Importantes */}
              <div className='bg-white rounded-2xl p-8 border border-gray-200'>
                <h3 className='text-2xl font-bold mb-6'>Fechas Importantes</h3>
                <div className='space-y-4'>
                  <div className='border-l-4 border-purple-500 pl-4'>
                    <p className='font-semibold text-purple-600'>
                      20 de Octubre
                    </p>
                    <p className='text-sm text-gray-600'>
                      Envío de resumen de trabajos
                    </p>
                  </div>
                  <div className='border-l-4 border-purple-500 pl-4'>
                    <p className='font-semibold text-purple-600'>
                      30 de Septiembre
                    </p>
                    <p className='text-sm text-gray-600'>
                      Envío de videos para sugerencias
                    </p>
                  </div>
                  <div className='border-l-4 border-purple-500 pl-4'>
                    <p className='font-semibold text-purple-600'>
                      30 de Octubre
                    </p>
                    <p className='text-sm text-gray-600'>
                      Fecha límite de inscripciones y pagos
                    </p>
                  </div>
                  <div className='border-l-4 border-indigo-500 pl-4'>
                    <p className='font-semibold text-indigo-600'>
                      6, 7 y 8 de Octubre
                    </p>
                    <p className='text-sm text-gray-600'>
                      Ensayos (9:00 a 14:00 hrs)
                    </p>
                  </div>
                  <div className='border-l-4 border-green-500 pl-4'>
                    <p className='font-semibold text-green-600'>
                      06 de Noviembre
                    </p>
                    <p className='text-sm text-gray-600'>
                      Día 1 - Colegios y participantes locales
                    </p>
                  </div>
                  <div className='border-l-4 border-green-500 pl-4'>
                    <p className='font-semibold text-green-600'>
                      07 de Noviembre
                    </p>
                    <p className='text-sm text-gray-600'>
                      Día 2 - Provincias e internacionales
                    </p>
                  </div>
                  <div className='border-l-4 border-green-500 pl-4'>
                    <p className='font-semibold text-green-600'>
                      08 de Noviembre
                    </p>
                    <p className='text-sm text-gray-600'>Día 3 - Gran Final</p>
                  </div>
                  <div className='border-l-4 border-yellow-500 pl-4'>
                    <p className='font-semibold text-yellow-600'>
                      09 de Noviembre
                    </p>
                    <p className='text-sm text-gray-600'>
                      Día 4 - Show de Gala y Premiación
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Final */}
            <div className='mt-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white text-center'>
              <h3 className='text-3xl font-bold mb-4'>
                ¿Listo para participar?
              </h3>
              <p className='text-xl mb-6 opacity-90'>
                Únete a la celebración de las Bodas de Plata del festival más
                importante de danza en Bolivia
              </p>
              <a
                href='https://wa.me/59177633551'
                className='inline-block px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105'
                target='_blank'
                rel='noopener noreferrer'
              >
                Contactar por WhatsApp
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
