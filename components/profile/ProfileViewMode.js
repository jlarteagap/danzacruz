"use client";
import { User, Phone, Calendar, Edit3 } from "lucide-react";

export default function ProfileViewMode({ user, onEdit }) {
  const profileFields = [
    {
      icon: User,
      label: "Nombre completo",
      value:
        `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
        "No especificado",
    },
    {
      icon: Phone,
      label: "Teléfono",
      value: user.phone || "No especificado",
    },
    {
      icon: Calendar,
      label: "Fecha de nacimiento",
      value: user.dateOfBirth
        ? new Date(user.dateOfBirth).toLocaleDateString("es-ES")
        : "No especificado",
    },
  ];

  return (
    <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
      <div className='bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white text-center'>
        <div className='w-20 h-20 bg-white bg-opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center'>
          <User className='w-10 h-10' aria-hidden='true' />
        </div>
        <h1 className='text-2xl font-bold'>Mi Perfil</h1>
        <p className='text-blue-100 mt-1'>Información personal</p>
      </div>

      <div className='p-6 space-y-6'>
        {profileFields.map(({ icon: Icon, label, value }, index) => (
          <div
            key={index}
            className='flex items-center space-x-4 p-4 bg-gray-50 rounded-lg'
          >
            <div className='flex-shrink-0'>
              <Icon className='w-5 h-5 text-gray-400' aria-hidden='true' />
            </div>
            <div className='flex-1'>
              <dt className='text-sm font-medium text-gray-500'>{label}</dt>
              <dd className='mt-1 text-sm text-gray-900'>{value}</dd>
            </div>
          </div>
        ))}

        <button
          onClick={onEdit}
          className='w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          aria-label='Editar información del perfil'
        >
          <Edit3 className='w-4 h-4' aria-hidden='true' />
          <span>Editar Perfil</span>
        </button>
      </div>
    </div>
  );
}
