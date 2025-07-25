import { uploadFile } from "../firebase";

export const uploadImage = async (
  file: File,
  fileName: string,
  folder: string
): Promise<string> => {
  try {
    if (!file) {
      throw new Error("No se proporcionó un archivo para subir");
    }
    if (!fileName.trim()) {
      throw new Error("El nombre del archivo no puede estar vacío");
    }
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      throw new Error(
        "Tipo de archivo no permitido. Solo se permiten imágenes JPEG, PNG o WebP"
      );
    }
    const maxSize = 5 * 1024 * 1024; // 5MB en bytes
    if (file.size > maxSize) {
      throw new Error("El archivo es demasiado grande. Máximo 5MB permitido");
    }

    const sanitizedFileName = fileName
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, "-")
      .replace(/-+/g, "-");

    const imageUrl = await uploadFile(file, sanitizedFileName, folder);
    if (!imageUrl || typeof imageUrl !== "string") {
      throw new Error("No se pudo obtener la URL de la imagen subida");
    }
    return imageUrl;
  } catch (error) {
    return `Error al subir la imagen: ${error.message}`;
  }
};
