"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ParticipantsList from "./Participants/ParticipantList";
import ChoreographiesList from "./Choreographies/ChoreographyList";
import ProfileViewMode from "@/components/profile/ProfileViewMode";

type Tab = "participants" | "choreographies";

const UserPanel = ({
  user,
  onEditProfile,
}: {
  user: any;
  onEditProfile: () => void;
}) => {
  const [activeTab, setActiveTab] = useState<Tab>("participants");
  const { data: session } = useSession();

  return (
    <div className='flex h-screen bg-gray-50 overflow-auto p-6'>
      {/* Columna izquierda: Perfil */}
      <div className='w-full md:w-1/3 lg:w-1/4 pr-4'>
        <ProfileViewMode user={session?.user} onEdit={onEditProfile} />
      </div>

      {/* Columna derecha: Contenido */}
      <div className='flex-1 flex flex-col'>
        {/* Botones de selección */}
        <div className='flex gap-4 mb-6'>
          <button
            className={`flex-1 py-3 px-4 rounded-lg font-medium text-white transition ${
              activeTab === "participants"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("participants")}
          >
            Participantes
          </button>
          <button
            className={`flex-1 py-3 px-4 rounded-lg font-medium text-white transition ${
              activeTab === "choreographies"
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("choreographies")}
          >
            Coreografías
          </button>
        </div>

        {/* Contenido dinámico */}
        <div className='flex-1 overflow-auto'>
          {activeTab === "participants" && (
            <ParticipantsList user={session?.user} />
          )}
          {activeTab === "choreographies" && (
            <ChoreographiesList user={session?.user} />
          )}
          <div className='text-center text-gray-400 py-20'>
            No existen{" "}
            {activeTab === "participants" ? "Participantes" : "Coreografías"}{" "}
            registrados{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
