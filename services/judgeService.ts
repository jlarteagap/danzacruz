import { JudgesFormData, Judge } from "@/types/judges.types";
import { saveForm, updateRegister } from "../firebase";

class JudgeService {
  private readonly COLLECTION_NAME = "judges";

  async createJudge(data: JudgesFormData): Promise<Judge> {
    // Implementa tu lógica de creación
    try {
      const docId = await saveForm(data, this.COLLECTION_NAME);
      if (!docId) {
        throw new Error("No se pudo obtener el ID del documento creado");
      }

      return {
        id: Number(docId),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: false,
      } as Judge;
    } catch (error) {
      console.error("Error al crear el jurado:", error);
      throw new Error("Error al crear el jurado");
    }
  }

  async updateJudge(id: string, data: JudgesFormData): Promise<Judge> {
    // Implementa tu lógica de actualización
    try {
      const updateData = {
        ...data,
        updatedAt: new Date().toISOString(),
      };

      await updateRegister(id, updateData, this.COLLECTION_NAME);

      // Retorna el objeto actualizado
      return {
        id: Number(id),
        ...updateData,
        // Mantener campos que no se actualizan
        createdAt: "", // Esto debería venir de la base de datos original
        status: false,
      } as Judge;
    } catch (error) {
      console.error("Error al actualizar el jurado:", error);
      throw new Error("Error al actualizar el jurado");
    }
  }
}
export const judgeService = new JudgeService();
