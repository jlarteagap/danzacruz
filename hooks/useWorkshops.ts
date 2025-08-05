import { useState, useEffect } from "react";
import {
  getWorkshops,
  updateWorkshop,
  deleteWorkshop,
} from "@/services/workshopService";

type Workshop = {
  // Define the properties of a workshop here, for example:
  id: string;
  name: string;
  status: boolean;
  // Add other relevant fields
};

export const useWorkshops = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadWorkshops = async () => {
    try {
      setLoading(true);
      setError(null);
      const workshopsFromDB = await getWorkshops();
      setWorkshops(workshopsFromDB.length > 0 ? workshopsFromDB : []);
    } catch (error) {
      console.error("Error al cargar workshops:", error);
      setError("Error al cargar los workshops desde la base de datos");
      // Mantener lista vacía en caso de error
      setWorkshops([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkshops();
  }, []);

  const addWorkshop = (workshopData) => {
    const newWorkshop = {
      id: Date.now().toString(), // Generar un ID único
      ...workshopData,
      status: true,
    };
    setWorkshops((prev) => [...prev, newWorkshop]);
  };
  const updateWorkshop = (id, workshopData) => {
    setWorkshops((prev) =>
      prev.map((workshop) =>
        workshop.id === id ? { ...workshop, ...workshopData } : workshop
      )
    );
  };
  const deleteWorkshop = async (id) => {
    const currentWorkshop = workshops.find((workshop) => workshop.id === id);
    if (!currentWorkshop) {
      console.error("Workshop not found:", id);
      return;
    }

    try {
      const updateData = {
        ...currentWorkshop,
        status: !currentWorkshop.status, // Toggle status
      };
      await updateWorkshop(id, updateData);
    } catch (error) {
      console.error("Error al eliminar el workshop:", error);
      setWorkshops((prev) =>
        prev.map((workshop) =>
          workshop.id === id
            ? { ...workshop, status: !workshop.status }
            : workshop
        )
      );
    }
  };
  const toggleWorkshopStatus = async (id) => {
    const currentWorkshop = workshops.find((workshop) => workshop.id === id);
    if (!currentWorkshop) {
      console.error("Workshop not found:", id);
      return;
    }
    setWorkshops((prev) =>
      prev.map((workshop) =>
        workshop.id === id
          ? { ...workshop, status: !workshop.status }
          : workshop
      )
    );

    try {
      const updateData = {
        ...currentWorkshop,
        status: !currentWorkshop.status,
      };
      await updateWorkshop(id, updateData);
    } catch (error) {
      console.error("Error al actualizar el workshop:", error);
    }
    setWorkshops((prev) =>
      prev.map((workshop) =>
        workshop.id === id
          ? { ...workshop, status: !workshop.status }
          : workshop
      )
    );
  };

  return {
    workshops,
    loading,
    error,
    loadWorkshops,
    addWorkshop,
    updateWorkshop,
    deleteWorkshop,
    toggleWorkshopStatus,
  };
};
