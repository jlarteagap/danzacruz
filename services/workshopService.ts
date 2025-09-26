import { JudgesFormData } from "@/types/judges.types";
import {
  saveForm,
  updateRegister,
  getSubscribers,
  deleteRegister,
} from "../firebase";

const COLLECTION_NAME = "workshops";
const getCurrentTimestamp = (): string => new Date().toISOString();

const createWorkshopFromData = (data: JudgesFormData, docId: string) => ({
  id: docId,
  ...data,
  createdAt: getCurrentTimestamp(),
  updatedAt: getCurrentTimestamp(),
  status: false,
});

const createUpdatedWorkshop = (id: string, data: any) => ({
  id: id,
  ...data,
  updatedAt: getCurrentTimestamp(),
  createdAt: "", // Esto debería venir de la base de datos original
  status: false,
});

// Función para validar docId
const validateDocId = (docId: string | any): string => {
  if (!docId) {
    throw new Error("No se pudo obtener el ID del documento creado");
  }
  return docId;
};

export const createWorkShop = async (data: any): Promise<any> => {
  try {
    const docId = await saveForm(data, COLLECTION_NAME);
    const validatedDocId = validateDocId(docId);
    return createWorkshopFromData(data, validatedDocId);
  } catch (error) {
    console.error("Error creating workshop:", error);
    throw new Error("Error creating workshop");
  }
};

export const updateWorkshop = async (id: string, data: any): Promise<any> => {
  try {
    const updateData = {
      ...data,
      updatedAt: getCurrentTimestamp(),
    };
    await updateRegister(id, updateData, COLLECTION_NAME);
    return createUpdatedWorkshop(id, data);
  } catch (error) {
    console.error("Error updating workshop:", error);
    throw new Error("Error updating workshop");
  }
};

export const getWorkshops = async () => {
  try {
    const workshopsSnapshot = await getSubscribers(COLLECTION_NAME);
    const workshopsData = workshopsSnapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return workshopsData;
  } catch (error) {
    console.error("Error getting workshops:", error);
    throw new Error("Error getting workshops");
  }
};

export const deleteWorkshop = async (id: string): Promise<void> => {
  try {
    await deleteRegister(id, COLLECTION_NAME);
  } catch (error) {
    console.error("Error deleting workshop:", error);
    throw new Error("Error deleting workshop");
  }
};

export default {
  createWorkShop,
  updateWorkshop,
  getWorkshops,
  deleteWorkshop,
};
