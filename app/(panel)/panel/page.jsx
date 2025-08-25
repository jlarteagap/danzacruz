// app/panel/page.js
"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthRedirectHandler from "@/components/AuthRedirectHandler";

function PanelContent() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirigir si no está autenticado
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  if (!session) {
    return null; // Se redirigirá en el useEffect
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='bg-white overflow-hidden shadow rounded-lg'>
          <div className='px-4 py-5 sm:p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <h1 className='text-3xl font-bold text-gray-900'>
                  Panel de Usuario
                </h1>
                <p className='mt-2 text-gray-600'>
                  Bienvenido, {session.user.firstName || session.user.name}
                </p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className='bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors'
              >
                Cerrar Sesión
              </button>
            </div>

            <div className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              <div className='bg-blue-50 p-6 rounded-lg'>
                <h3 className='text-lg font-medium text-blue-900'>
                  Información Personal
                </h3>
                <div className='mt-4 space-y-2 text-sm text-blue-800'>
                  <p>
                    <strong>Nombre:</strong> {session.user.firstName}{" "}
                    {session.user.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {session.user.email}
                  </p>
                  <p>
                    <strong>Teléfono:</strong>{" "}
                    {session.user.phone || "No especificado"}
                  </p>
                  <p>
                    <strong>Rol:</strong> {session.user.role}
                  </p>
                </div>
              </div>

              <div className='bg-green-50 p-6 rounded-lg'>
                <h3 className='text-lg font-medium text-green-900'>
                  Estado del Perfil
                </h3>
                <div className='mt-4 text-sm text-green-800'>
                  <p>
                    <strong>Perfil Completo:</strong>
                    <span
                      className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                        session.user.profileComplete
                          ? "bg-green-200 text-green-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {session.user.profileComplete ? "Sí" : "No"}
                    </span>
                  </p>
                </div>
              </div>

              <div className='bg-purple-50 p-6 rounded-lg'>
                <h3 className='text-lg font-medium text-purple-900'>
                  Acciones
                </h3>
                <div className='mt-4'>
                  <button
                    onClick={() => router.push("/complete-profile")}
                    className='text-sm bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors'
                  >
                    Editar Perfil
                  </button>
                </div>
              </div>
            </div>

            {/* Debug info - remover en producción */}
            <div className='mt-8 bg-gray-100 p-4 rounded-lg'>
              <h3 className='text-sm font-medium text-gray-900 mb-2'>
                Debug Info:
              </h3>
              <pre className='text-xs text-gray-600 overflow-auto'>
                {JSON.stringify(
                  {
                    profileComplete: session.user.profileComplete,
                    role: session.user.role,
                    id: session.user.id,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PanelPage() {
  return (
    <AuthRedirectHandler>
      <PanelContent />
    </AuthRedirectHandler>
  );
}
