import { JudgesFormData, Judge } from "@/types/judges.types";
import { saveForm, updateRegister } from "../firebase";

const COLLECTION_NAME = "judges";
const getCurrentTimestamp = (): string => new Date().toISOString();

const createJudgeFromData = (data: JudgesFormData, docId: string): Judge => ({
  id: Number(docId),
  ...data,
  createdAt: getCurrentTimestamp(),
  updatedAt: getCurrentTimestamp(),
  status: false,
});

const createUpdatedJudge = (id: string, data: JudgesFormData): Judge => ({
  id: Number(id),
  ...data,
  updatedAt: getCurrentTimestamp(),
  createdAt: "", // Esto debería venir de la base de datos original
  status: false,
});

// Función para manejo de errores
const handleError = (operation: string, error: unknown): never => {
  console.error(`Error al ${operation} el jurado:`, error);
  throw new Error(`Error al ${operation} el jurado`);
};

// Función para validar docId
const validateDocId = (docId: string | any): string => {
  if (!docId) {
    throw new Error("No se pudo obtener el ID del documento creado");
  }
  return docId;
};

export const createJudge = async (data: JudgesFormData): Promise<Judge> => {
  try {
    const docId = await saveForm(data, COLLECTION_NAME);
    const validatedDocId = validateDocId(docId);
    return createJudgeFromData(data, validatedDocId);
  } catch (error) {
    return handleError("crear", error);
  }
};

export const updateJudge = async (
  id: string,
  data: JudgesFormData
): Promise<Judge> => {
  try {
    const updateData = {
      ...data,
      updatedAt: getCurrentTimestamp(),
    };

    await updateRegister(id, updateData, COLLECTION_NAME);
    return createUpdatedJudge(id, data);
  } catch (error) {
    return handleError("actualizar", error);
  }
};

// Exportación por defecto del servicio como objeto con funciones
export default {
  createJudge,
  updateJudge,
};
