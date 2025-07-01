import { useState } from "react";
import { Judge, JudgesFormData } from "../types/judges.types";

const INITIAL_JURADOS: Judge[] = [
  {
    id: 1,
    nombre: "María",
    apellido: "González",
    nacionalidad: "Española",
    trayectoria:
      "Directora de cine con más de 20 años de experiencia en el sector audiovisual. Ha dirigido múltiples documentales premiados internacionalmente.",
    fotoPerfil:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    habilitado: true,
  },
  {
    id: 2,
    nombre: "Carlos",
    apellido: "Rodríguez",
    nacionalidad: "Mexicana",
    trayectoria:
      "Crítico de cine y escritor especializado en cinematografía latinoamericana. Columnista en medios especializados durante 15 años.",
    fotoPerfil:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    habilitado: true,
  },
  {
    id: 3,
    nombre: "Ana",
    apellido: "Silva",
    nacionalidad: "Argentina",
    trayectoria:
      "Productora ejecutiva y fundadora de una casa productora independiente. Especialista en cine de autor y nuevos talentos.",
    fotoPerfil:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    habilitado: false,
  },
];
export const useJurados = () => {
  const [jurados, setJurados] = useState<Judge[]>(INITIAL_JURADOS);

  const addJurado = (juradoData: JudgesFormData): void => {
    const newJurado: Judge = {
      id: Date.now(),
      ...juradoData,
      habilitado: true,
    };
    setJurados((prev) => [...prev, newJurado]);
  };

  const updateJurado = (id: number, juradoData: JudgesFormData): void => {
    setJurados((prev) =>
      prev.map((jurado) =>
        jurado.id === id ? { ...jurado, ...juradoData } : jurado
      )
    );
  };

  const deleteJurado = (id: number): void => {
    setJurados((prev) => prev.filter((jurado) => jurado.id !== id));
  };

  const toggleJuradoStatus = (id: number): void => {
    setJurados((prev) =>
      prev.map((jurado) =>
        jurado.id === id
          ? { ...jurado, habilitado: !jurado.habilitado }
          : jurado
      )
    );
  };

  return {
    jurados,
    addJurado,
    updateJurado,
    deleteJurado,
    toggleJuradoStatus,
  };
};
