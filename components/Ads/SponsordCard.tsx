export default function SponsorCard({
  sponsor,
  index,
  isActive,
  onHover,
  onLeave,
  type = "sponsor",
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer ${
        isActive
          ? "bg-white shadow-2xl scale-110 border-2 border-fuchsia-200/50"
          : "bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl border border-white/20"
      }`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Gradiente de fondo sutil */}
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${
          isActive ? "opacity-10" : "group-hover:opacity-5"
        } ${
          type === "sponsor"
            ? "bg-gradient-to-br from-fuchsia-500 to-purple-600"
            : "bg-gradient-to-br from-green-500 to-blue-600"
        }`}
      />

      {/* Contenedor de la imagen */}
      <div className='relative p-6 lg:p-8'>
        <div
          className={`relative overflow-hidden rounded-xl transition-all duration-500 ${
            isActive ? "shadow-lg" : "group-hover:shadow-md"
          }`}
        >
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            className={`w-full h-24 lg:h-32 object-contain transition-all duration-500 ${
              isActive ? "scale-105" : "group-hover:scale-102"
            }`}
            style={{
              filter: isActive ? "brightness(1.1)" : "brightness(1)",
              transition: "all 0.3s ease",
            }}
          />

          {/* Overlay con nombre en hover */}
          <div
            className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
              isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <span className='text-white font-semibold text-sm lg:text-base text-center px-2'>
              {sponsor.name}
            </span>
          </div>
        </div>
      </div>

      {/* Efecto shimmer */}
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-700 ${
          isActive ? "opacity-100" : ""
        } bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-full`}
        style={{
          animation: isActive ? "shimmer 2s infinite" : "none",
        }}
      />

      {/* Indicador de esquina */}
      <div
        className={`absolute top-3 right-3 w-3 h-3 rounded-full transition-all duration-300 ${
          type === "sponsor"
            ? isActive
              ? "bg-fuchsia-500 shadow-lg shadow-fuchsia-500/50"
              : "bg-fuchsia-200"
            : isActive
            ? "bg-green-500 shadow-lg shadow-green-500/50"
            : "bg-green-200"
        }`}
      />
    </div>
  );
}
