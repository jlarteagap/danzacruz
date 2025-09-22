// UserPanel.tsx
"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import ParticipantsList from "./Participants/ParticipantList";
import ChoreographiesList from "./Choreographies/ChoreographyList";
import ProfileViewMode from "@/components/profile/ProfileViewMode";
import { useDataInitializer } from "@/hooks/useDataContext";

type Tab = "participants" | "choreographies";

interface UserPanelProps {
  user: any;
  onEditProfile?: () => void;
}

const UserPanel = ({ user, onEditProfile }: UserPanelProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("participants");
  const { data: session } = useSession();

  // Initialize data when component mounts
  useDataInitializer();

  const handleEditProfile = () => {
    if (onEditProfile) {
      onEditProfile();
    }
  };

  return (
    <div className='flex bg-gray-50 p-6'>
      {/* Columna derecha: Contenido */}
      <div className='flex-1 flex flex-col'>
        {/* Botones de selección */}
        <div className='flex gap-4 mb-6'>
          <button
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === "participants"
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
            onClick={() => setActiveTab("participants")}
            aria-pressed={activeTab === "participants"}
            role='tab'
          >
            Participantes
          </button>
          <button
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === "choreographies"
                ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
            onClick={() => setActiveTab("choreographies")}
            aria-pressed={activeTab === "choreographies"}
            role='tab'
          >
            Coreografías
          </button>
        </div>

        {/* Contenido dinámico */}
        <div
          className='flex-1'
          role='tabpanel'
          aria-labelledby={`${activeTab}-tab`}
        >
          {activeTab === "participants" && (
            <ParticipantsList user={session?.user} />
          )}
          {activeTab === "choreographies" && (
            <ChoreographiesList user={session?.user} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
