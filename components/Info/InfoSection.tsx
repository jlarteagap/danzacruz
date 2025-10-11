import { CheckCircle, Sparkles, Users, Award, Trophy } from "lucide-react";

const icons = {
  "Forma de participación": Sparkles,
  Categorías: Users,
  División: Award,
  "Sub División": Trophy,
};

export default function InfoSection({
  list,
  title,
  index,
  isActive,
  onHover,
  onLeave,
}: {
  list: string[];
  title: string;
  index: number;
  isActive: boolean;
  onHover: (index: number) => void;
  onLeave: () => void;
}) {
  const IconComponent = icons[title] || Sparkles;

  return (
    <div
      className={`relative overflow-hidden rounded-3xl transition-all duration-700 ease-out transform ${
        isActive
          ? "bg-white/90 backdrop-blur-xl shadow-2xl scale-105 border border-white/20"
          : "bg-white/40 backdrop-blur-md shadow-lg hover:shadow-xl border border-white/10"
      } ${isActive ? "" : ""}`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
    >
      {/* Gradiente de fondo animado - Reemplazado fuchsia/purple/pink por teal/cyan/yellow */}
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${
          isActive ? "opacity-100" : ""
        }`}
        style={{
          backgroundImage: isActive
            ? "linear-gradient(135deg, rgba(99, 247, 223, 0.1) 0%, rgba(45, 212, 191, 0.05) 50%, rgba(253, 247, 112, 0.1) 100%)"
            : "none",
        }}
      />

      <div className='relative p-8 lg:p-5'>
        {/* Header con icono - Reemplazado fuchsia/purple por teal/cyan (#63f7df) */}
        <div className='flex items-center gap-4 mb-8'>
          <div
            className={`p-3 rounded-2xl transition-all duration-500 ${
              isActive ? "shadow-lg" : "bg-teal-100"
            }`}
            style={
              isActive
                ? {
                    background:
                      "linear-gradient(135deg, #63f7df 0%, #2dd4bf 100%)",
                  }
                : {}
            }
          >
            <IconComponent
              size={24}
              className={`transition-colors duration-500 ${
                isActive ? "text-neutral-900" : "text-teal-600"
              }`}
            />
          </div>
          <h3
            className={`text-xl lg:text-2xl font-semibold transition-colors duration-500 ${
              isActive ? "text-teal-900" : "text-teal-800"
            }`}
          >
            {title}
          </h3>
        </div>

        {/* Lista de elementos - Reemplazado fuchsia por teal */}
        <div className='space-y-4'>
          {list.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className='flex items-center gap-4 group'
              style={{
                animationDelay: `${itemIndex * 100}ms`,
                opacity: isActive ? 1 : 0.8,
              }}
            >
              <div
                className={`flex-shrink-0 transition-all duration-300 ${
                  isActive ? "scale-110" : "group-hover:scale-105"
                }`}
              >
                <CheckCircle
                  size={20}
                  className={`transition-colors duration-300 ${
                    isActive
                      ? "text-teal-600"
                      : "text-teal-400 group-hover:text-teal-600"
                  }`}
                />
              </div>
              <p
                className={`text-base lg:text-lg leading-relaxed transition-all duration-300 ${
                  isActive
                    ? "text-gray-800 font-medium"
                    : "text-gray-700 group-hover:text-gray-900"
                }`}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Efecto de brillo en hover */}
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-700 ${
          isActive ? "opacity-100" : ""
        } bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full`}
        style={{
          animation: isActive ? "shimmer 2s infinite" : "none",
        }}
      />
    </div>
  );
}
