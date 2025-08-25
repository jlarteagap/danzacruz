// app/complete-profile/page.js
"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthRedirectHandler from "@/components/AuthRedirectHandler";

function CompleteProfileContent() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
    // Agregar más campos según necesites
  });

  useEffect(() => {
    // Redirigir si no está autenticado
    if (status === "unauthenticated") {
      router.push("/");
      return;
    }

    // Si ya tiene el perfil completo, redirigir al panel
    if (session?.user?.profileComplete) {
      router.push("/panel");
      return;
    }

    // Pre-llenar con datos existentes si los hay
    if (session?.user) {
      const nameParts = session.user.name?.split(" ") || [];
      setFormData((prev) => ({
        ...prev,
        firstName: session.user.firstName || nameParts[0] || "",
        lastName: session.user.lastName || nameParts.slice(1).join(" ") || "",
        // Otros campos existentes...
      }));
    }
  }, [session, status, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Actualizar usuario en Firebase
      const response = await fetch("/api/user/complete-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          ...formData,
          profileComplete: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar perfil");
      }

      // Actualizar la sesión
      await update({
        ...session,
        user: {
          ...session.user,
          ...formData,
          profileComplete: true,
        },
      });

      // Redirigir al panel
      router.push("/panel");
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Hubo un error al guardar tu perfil. Por favor intenta nuevamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Completa tu perfil
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Necesitamos algunos datos adicionales para personalizar tu
            experiencia
          </p>
        </div>

        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='rounded-md shadow-sm space-y-4'>
            <div>
              <label
                htmlFor='firstName'
                className='block text-sm font-medium text-gray-700'
              >
                Nombre
              </label>
              <input
                id='firstName'
                name='firstName'
                type='text'
                required
                className='mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                placeholder='Tu nombre'
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label
                htmlFor='lastName'
                className='block text-sm font-medium text-gray-700'
              >
                Apellido
              </label>
              <input
                id='lastName'
                name='lastName'
                type='text'
                required
                className='mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                placeholder='Tu apellido'
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label
                htmlFor='phone'
                className='block text-sm font-medium text-gray-700'
              >
                Teléfono
              </label>
              <input
                id='phone'
                name='phone'
                type='tel'
                required
                className='mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                placeholder='Tu número de teléfono'
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label
                htmlFor='dateOfBirth'
                className='block text-sm font-medium text-gray-700'
              >
                Fecha de nacimiento
              </label>
              <input
                id='dateOfBirth'
                name='dateOfBirth'
                type='date'
                required
                className='mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              disabled={isLoading}
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isLoading ? (
                <>
                  <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                  Guardando...
                </>
              ) : (
                "Completar perfil"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CompleteProfile() {
  return (
    <AuthRedirectHandler>
      <CompleteProfileContent />
    </AuthRedirectHandler>
  );
}
