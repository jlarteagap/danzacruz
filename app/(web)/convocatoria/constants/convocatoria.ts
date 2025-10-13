// constants/convocatoria.ts
export const FESTIVAL_INFO = {
  name: "DANZACRUZ",
  edition: "XXV",
  year: 2025,
  subtitle: "Festival Internacional de Danza",
  theme: "Bodas de Plata",
  slogan: "En el año del Bicentenario, 25 años proyectando Bolivia al mundo",
  dates: {
    start: "2025-11-06",
    end: "2025-11-09",
    eventTime: "2025-11-06T18:00:00",
  },
  location: {
    city: "Santa Cruz de la Sierra",
    country: "Bolivia",
  },
} as const;

export const CONTACT_INFO = {
  emails: {
    general: "chichomachine@yahoo.com",
    coordination: "jorgelarteagap@gmail.com",
  },
  whatsapp: {
    inscriptions: "+59177633551",
    queries: "+59175553576",
    forms: "+59175095094",
  },
  website: "https://www.danzacruz.com",
  bankAccount: {
    bank: "Banco Mercantil Santa Cruz",
    accountNumber: "4028108924",
    accountHolder: "Jesús Adhemar Añez Peinado",
  },
} as const;

export const DEADLINES = [
  { date: "30 de Septiembre", description: "Envío de videos para sugerencias" },
  { date: "20 de Octubre", description: "Envío de resumen de trabajos" },
  {
    date: "30 de Octubre",
    description: "Fecha límite de inscripciones y pagos",
  },
  { date: "9, 10 y 11 de Octubre", description: "Ensayos (9:00 a 14:00 hrs)" },
] as const;

export const FESTIVAL_DAYS = [
  {
    day: 1,
    date: "06 de noviembre",
    title: "Día 1 del Festival",
    description:
      "Categoría Colegios y categoría General para los participantes de Santa Cruz de la Sierra.",
    time: "18:00 horas",
    color: "purple",
  },
  {
    day: 2,
    date: "07 de noviembre",
    title: "Día 2 del Festival",
    description:
      "Categoría General para los participantes de las provincias de Santa Cruz, otros departamentos e internacionales.",
    color: "indigo",
  },
  {
    day: 3,
    date: "08 de noviembre",
    title: "Día 3 del Festival - GRAN FINAL",
    description:
      "Participantes con 71 puntos o más competirán con nueva coreografía para el premio absoluto.",
    color: "green",
  },
  {
    day: 4,
    date: "09 de noviembre",
    title: "Día 4 del Festival - Show de Gala",
    description: "Grupos destacados, Musical, Cantante Invitado y Premiación",
    time: "19:00 Hrs.",
    color: "yellow",
  },
] as const;

export const CATEGORIES = {
  colegios: {
    name: "CATEGORÍA COLEGIOS",
    groups: [
      { name: "Infantil", ageRange: "De 6 a 11 años y 11 meses" },
      { name: "Juvenil", ageRange: "De 12 a 18 años" },
    ],
  },
  general: {
    name: "CATEGORÍA GENERAL",
    groups: [
      { name: "Infantil", ageRange: "De 6 a 11 años y 11 meses" },
      { name: "Juvenil", ageRange: "De 12 a 17 años y 11 meses" },
      { name: "Adulto", ageRange: "De 18 años en adelante" },
    ],
  },
} as const;

export const MODALIDADES = [
  {
    id: "3.1",
    title: "BALLET CLÁSICO",
    description:
      "Las coreografías de repertorio deben ser presentadas de forma fiel. Las Variaciones: Pas-de-Deux, Gran Pas-de-Deux, Pas-de-Trois.",
    notes: [
      "La categoría Infantil puede presentar un Pas de Deux sin variaciones ni coda.",
      "La categoría Juvenil deberá usar zapatillas de punta de forma obligatoria. La no observación llevará a la desclasificación.",
    ],
  },
  {
    id: "3.2",
    title: "BALLET NEO-CLÁSICO",
    description:
      "Coreografías creadas o remontadas con técnica del Ballet Clásico, pero con narrativas contemporáneas.",
  },
  {
    id: "3.3",
    title: "DANZA MODERNA Y CONTEMPORÁNEA",
    description:
      "Técnicas: Duncan, Graham, Hawkins, Limón, Release, Horton, Humphery-Weidman, improvisación de contacto, Laban.",
  },
  {
    id: "3.4",
    title: "JAZZ",
    description:
      "Todas las líneas desde 1995: Lyrical Jazz, Modern Jazz, Street Jazz.",
    subtypes: [
      { name: "Lyrical Jazz", description: "Contenido expresivo y emocional" },
      { name: "Modern Jazz", description: "Fusión con contemporánea años 60" },
      { name: "Street Jazz", description: "Fusión con danzas urbanas" },
    ],
  },
  {
    id: "3.5",
    title: "MUSICAL",
    description:
      "Obras célebres del repertorio clásico de Jazz hasta 1995 (Sweet Charity, West Side Story, Chorus Line, Cats).",
  },
  {
    id: "3.6",
    title: "STREET DANCE",
    description:
      "Breakdance, Step dance, Funk, Acid, House, Rap, Techno, Reguetón. Formatos WOD (World of Dance) y HHI (Hip Hop International).",
  },
  {
    id: "3.7",
    title: "BAILES TROPICALES Y DE SALÓN",
    description:
      "Salsa, Cha cha chá, Mambo, Tango, Bolero, Rumba, Samba, Gafiera, Axé. Estilos Ball Room.",
  },
  {
    id: "3.8",
    title: "FOLKLORE ÉTNICO Y DE RAÍZ",
    description:
      "Arete Guazú, Macheteros, Tobas, Danza del Sol, La Saya, Danzas Chaqueñas. Sin proyección folklórica.",
    specialNotes: [
      "Requiere investigación escrita respaldatoria",
      "Competencia por mismo género",
      "Duración máxima: 10 minutos",
    ],
  },
  {
    id: "3.9",
    title: "FOLKLORE NACIONAL E INTERNACIONAL",
    description: "Acervo de cada país con proyección mínima.",
    regions: [
      "Danzas orientales (Santa Cruz, Beni y Pando)",
      "Danzas de los valles (Cochabamba, Chuquisaca y Tarija)",
      "Danzas andinas (La Paz, Oruro y Potosí)",
      "Danzas Chaqueñas",
    ],
  },
  {
    id: "4.0",
    title: "DANZAS POPULARES",
    description: "Reguetón y Caporales como modalidades independientes.",
  },
  {
    id: "4.1",
    title: "K-POP",
    description:
      "Korean Pop. Evaluación de originalidad y parecido entre personajes y performance.",
  },
  {
    id: "4.2",
    title: "RETRO DANCE",
    description: "Estilos clásicos de los 80, 90 y 2000.",
  },
] as const;

export const DURACIONES = {
  colegios: [
    { categoria: "Infantil", solo: "1:30'", duo: "2'", grupo: "4'" },
    { categoria: "Juvenil", solo: "1:30'", duo: "2'", grupo: "6'" },
  ],
  general: [
    { categoria: "Infantil", solo: "1:30'", duo: "2:00'", grupo: "4'" },
    { categoria: "Juvenil", solo: "2:00'", duo: "2:30'", grupo: "5'" },
    { categoria: "Adulto", solo: "2'", duo: "3'", grupo: "6'" },
  ],
} as const;

export const PRECIOS = [
  {
    tipo: "Grupo Independiente 4-15 personas",
    valor: "Bs. 60.00",
    obs: "Por participante",
  },
  {
    tipo: "Grupo Independiente 16-50 personas",
    valor: "Bs. 50.00",
    obs: "Por participante",
  },
  {
    tipo: "Escuelas de Danza 4-15 personas",
    valor: "Bs. 50.00",
    obs: "Por participante",
  },
  {
    tipo: "Escuelas de Danza 16-50 personas",
    valor: "Bs. 60.00",
    obs: "Por participante",
  },
  { tipo: "Solistas", valor: "Bs. 250.00", obs: "-" },
  { tipo: "Dúo", valor: "Bs. 100.00", obs: "Por participante" },
  { tipo: "Trío", valor: "Bs. 80.00", obs: "Por participante" },
] as const;

export const PREMIOS = [
  {
    id: "solista",
    title: "GANADOR ABSOLUTO SOLISTA",
    subtitle: "CATEGORÍA GENERAL",
    icon: "🥇",
    color: "yellow",
    prizes: [
      "Pase directo y gratuito a Danzacruz 2026",
      "15 entradas de ingreso al evento Danzacruz 2026",
      "Bs. 400 en efectivo",
    ],
    condition:
      "El premio en efectivo será válido con 15 participantes como mínimo",
    total: "Bs. 775 (setecientos setenta y cinco Bolivianos)",
  },
  {
    id: "duo",
    title: "GANADOR ABSOLUTO DÚO",
    subtitle: "CATEGORÍA GENERAL",
    icon: "🏆",
    color: "purple",
    prizes: [
      "Pase directo y gratuito a Danzacruz 2026",
      "20 entradas de ingreso al evento Danzacruz 2026",
      "Bs. 600 en efectivo",
    ],
    condition:
      "El premio en efectivo será válido con 10 dúos participantes como mínimo",
    total: "Bs. 1,100 (Un mil cien Bolivianos)",
  },
  {
    id: "trio",
    title: "GANADOR ABSOLUTO TRÍO",
    subtitle: "CATEGORÍA GENERAL",
    icon: "🎖️",
    color: "blue",
    prizes: [
      "Pase directo y gratuito a Danzacruz 2026",
      "30 entradas de ingreso al evento Danzacruz 2026",
      "Bs. 800 en efectivo",
    ],
    condition:
      "El premio en efectivo será válido con 10 tríos participantes como mínimo",
    total: "Bs. 1,550 (Un mil quinientos cincuenta Bolivianos)",
  },
  {
    id: "grupo-chico",
    title: "GANADOR ABSOLUTO GRUPO CHICO",
    subtitle: "CATEGORÍA GENERAL",
    icon: "👥",
    color: "green",
    prizes: [
      "Pase directo y gratuito a Danzacruz 2026",
      "40 entradas de ingreso al evento Danzacruz 2026",
      "Bs. 1,400 en efectivo",
    ],
    condition:
      "El premio en efectivo será válido con 15 grupos participantes como mínimo",
    total: "Bs. 2,400 (Dos mil cuatrocientos Bolivianos)",
  },
  {
    id: "grupo-grande",
    title: "GANADOR ABSOLUTO GRUPO GRANDE",
    subtitle: "CATEGORÍA GENERAL",
    icon: "🎭",
    color: "red",
    prizes: [
      "Pase directo y gratuito a Danzacruz 2026",
      "50 entradas de ingreso al evento Danzacruz 2026",
      "Bs. 3,300 en efectivo",
    ],
    condition:
      "El premio en efectivo será válido con 15 grupos participantes como mínimo",
    total: "Bs. 4,505 (Cuatro mil quinientos cincuenta Bolivianos)",
  },
  {
    id: "colegios",
    title: "GANADOR ABSOLUTO",
    subtitle: "COLEGIOS",
    icon: "🏫",
    color: "orange",
    prizes: ["Bs. 5,000 en efectivo"],
    condition:
      "El premio en efectivo será válido con 10 colegios participantes como mínimo",
    total: "",
  },
] as const;

export const PREMIOS_ESPECIALES = [
  { icon: "⭐", title: "Mejor Bailarín" },
  { icon: "⭐", title: "Mejor Bailarina" },
  { icon: "🎨", title: "Mejor Coreografía" },
  { icon: "👗", title: "Mejor Vestuario" },
  { icon: "🎬", title: "Mejor Producción" },
  { icon: "🎥", title: "Mejor Compaginación de Video" },
] as const;

export const TALLERES = [
  { icon: "🎵", title: "Ritmos Tropicales" },
  { icon: "🎭", title: "Folklore" },
  { icon: "💪", title: "Preparación Física para Bailarines" },
  { icon: "🩰", title: "Ballet Clásico" },
  { icon: "🇧🇷", title: "Ritmos Brasileños" },
  { icon: "💡", title: "Iluminación para Escenarios" },
] as const;

export const CRITERIOS_EVALUACION = [
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
] as const;

export const NAVIGATION_ITEMS = [
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
] as const;
