import { Gift, Ticket, DollarSign } from "lucide-react";

export default function CategoryCard({
  category,
  index,
  isActive,
  onHover,
  onLeave,
}) {
  const IconComponent = category.icon;

  return (
    <div
      className={`relative overflow-hidden rounded-3xl transition-all duration-500 cursor-pointer ${
        isActive
          ? "bg-white/95 shadow-2xl scale-105 border-2 border-white/50"
          : "bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl border border-white/20"
      }`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Gradiente de fondo */}
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${
          isActive ? "opacity-10" : ""
        } bg-gradient-to-br ${category.color}`}
      />

      <div className='relative p-6 lg:p-8'>
        {/* Header */}
        <div className='flex items-start gap-4 mb-6'>
          <div
            className={`p-3 rounded-xl transition-all duration-500 flex-shrink-0 ${
              isActive
                ? `bg-gradient-to-br ${category.color} shadow-lg`
                : "bg-gray-100"
            }`}
          >
            <IconComponent
              size={24}
              className={`transition-colors duration-500 ${
                isActive ? "text-white" : "text-gray-600"
              }`}
            />
          </div>
          <div className='flex-1'>
            <h3
              className={`text-lg lg:text-xl font-bold leading-tight transition-colors duration-500 ${
                isActive ? "text-gray-900" : "text-gray-800"
              }`}
            >
              {category.category}
            </h3>
          </div>
        </div>

        {/* Premio principal */}
        <div
          className={`p-4 rounded-xl mb-6 transition-all duration-300 ${
            isActive
              ? "bg-gradient-to-r from-fuchsia-50 to-purple-50"
              : "bg-gray-50"
          }`}
        >
          <h4 className='font-semibold text-gray-900 mb-2 flex items-center gap-2'>
            <Ticket size={16} className='text-fuchsia-600' />
            Premio Principal
          </h4>
          <p className='text-gray-700 text-sm'>{category.award}</p>
        </div>

        {/* Beneficios adicionales */}
        <div className='space-y-3 mb-6'>
          <h4 className='font-semibold text-gray-900 text-sm flex items-center gap-2'>
            <Gift size={16} className='text-green-600' />
            Beneficios Adicionales
          </h4>
          {category.plus.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                isActive ? "bg-white/60" : "bg-gray-50/80"
              }`}
            >
              <div className='w-2 h-2 bg-green-500 rounded-full flex-shrink-0' />
              <span className='text-gray-700 text-sm font-medium'>{item}</span>
            </div>
          ))}
        </div>

        {/* Valor del premio */}
        {category.value && (
          <div
            className={`p-3 rounded-lg mb-4 text-center transition-all duration-300 ${
              isActive
                ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                : "bg-green-100 text-green-800"
            }`}
          >
            <div className='flex items-center justify-center gap-2'>
              <DollarSign size={16} />
              <span className='font-bold text-sm uppercase'>
                {category.value}
              </span>
            </div>
          </div>
        )}

        {/* Observaciones */}
        <div className='text-xs text-gray-500 italic bg-gray-50/50 p-3 rounded-lg'>
          {category.obs}
        </div>
      </div>
    </div>
  );
}
