"use client";
import React from "react";
import { Timer } from "lucide-react";

// Reemplazado purple por teal (color principal #63f7df)
const typeColors = {
  solo: "bg-blue-100 text-blue-700 border-blue-200",
  duo: "bg-teal-100 text-teal-700 border-teal-200", // Era: purple-100/700/200
  grupo: "bg-green-100 text-green-700 border-green-200",
};

const typeIcons = {
  solo: "👤",
  duo: "👥",
  grupo: "👫👬👭",
};

export default function TimesCard({
  title,
  data,
  index,
  isActive,
  onHover,
  onLeave,
}: {
  title: string;
  data: {
    category: string;
    time: string;
    type: "solo" | "duo" | "grupo";
    color: string;
    bgColor?: string;
    icon?: React.ElementType;
    description?: string;
    times?: Array<{
      category: string;
      time: string;
      type: "solo" | "duo" | "grupo";
    }>;
  };
  index: number;
  isActive: boolean;
  onHover: (index: number) => void;
  onLeave: () => void;
}) {
  const IconComponent = data.icon;

  return (
    <div
      className={`flex-shrink-0 snap-start w-[85%] sm:w-auto relative overflow-hidden rounded-3xl transition-all duration-500 ease-out
        ${
          isActive
            ? `bg-gradient-to-br ${data.bgColor} shadow-2xl scale-105 border-2 border-white/50`
            : "bg-white/90 backdrop-blur-xl shadow-lg hover:shadow-xl border border-white/20"
        }`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Gradiente de fondo */}
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${
          isActive ? "opacity-10" : ""
        } bg-gradient-to-br ${data.color}`}
      />

      <div className='relative p-6 sm:p-8 lg:p-10'>
        {/* Header */}
        <div className='flex items-center gap-4 mb-4 sm:mb-6'>
          <div
            className={`p-3 sm:p-4 rounded-2xl transition-all duration-500 ${
              isActive
                ? `bg-gradient-to-br ${data.color} shadow-lg`
                : "bg-gray-100"
            }`}
          >
            {IconComponent && (
              <IconComponent
                size={24}
                className={`transition-colors duration-500 ${
                  isActive ? "text-white" : "text-gray-600"
                }`}
              />
            )}
          </div>
          <div>
            <h3
              className={`text-lg sm:text-2xl lg:text-3xl font-bold transition-colors duration-500 ${
                isActive ? "text-gray-900" : "text-gray-800"
              }`}
            >
              {title}
            </h3>
            <p className='text-xs sm:text-sm text-gray-600 mt-1'>
              {data.description}
            </p>
          </div>
        </div>

        {/* Lista de tiempos */}
        <div className='space-y-3 sm:space-y-4'>
          {data.times?.map((timeData, timeIndex) => (
            <div
              key={timeIndex}
              className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 rounded-xl transition-all duration-300
                ${
                  isActive
                    ? "bg-white/60 shadow-sm"
                    : "bg-gray-50/50 hover:bg-white/40"
                }
              `}
              style={{ animationDelay: `${timeIndex * 50 + 200}ms` }}
            >
              <div className='flex items-center gap-3 mb-2 sm:mb-0'>
                <span className='text-lg'>{typeIcons[timeData.type]}</span>
                <div>
                  <h4
                    className={`font-semibold transition-colors duration-300 ${
                      isActive ? "text-gray-900" : "text-gray-700"
                    }`}
                  >
                    {timeData.category}
                  </h4>
                  <div
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${
                      typeColors[timeData.type]
                    }`}
                  >
                    <span className='capitalize'>{timeData.type}</span>
                  </div>
                </div>
              </div>

              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-bold text-sm transition-all duration-300
                ${
                  isActive
                    ? `bg-gradient-to-r ${data.color} text-white shadow-md`
                    : "bg-gray-200 text-gray-700"
                }
              `}
              >
                <Timer size={16} />
                {timeData.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Efecto shimmer */}
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-700 ${
          isActive ? "opacity-100" : ""
        } bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full`}
        style={{ animation: isActive ? "shimmer 2s infinite" : "none" }}
      />
    </div>
  );
}
