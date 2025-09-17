"use client";

import { useState, useEffect } from "react";
import { initialValues, validate } from "@/components/UserPanel/utils";
import { apiSave, apiGet } from "@/lib/api";
import { Participant } from "@/components/UserPanel/types";
import { useSession } from "next-auth/react";

export const useParticipantForm = (user: string) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: session, status } = useSession();

  console.log();

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const data = await apiGet("participants", user);
        setParticipants(data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  const handleSubmit = async (
    values: any,
    { resetForm }: any,
    user: any,
    onClose: () => void
  ) => {
    try {
      setIsLoading(true);
      const currentYear = new Date().getFullYear();
      const payload = {
        ...values,
        year: currentYear,
        userId: user.id, // assuming user object has an id property
      };

      const data = await apiSave("participants", payload);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error al registrar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    initialValues,
    validate,
    handleSubmit,
    isLoading,
    category,
    participants,
    setCategory,
  };
};
