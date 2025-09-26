import { useState, useCallback } from "react";
import { uploadImage } from "@/services/uploadImageService";

interface FileUploadState {
  uploading: boolean;
  uploadedUrl: string | null;
  error: string | null;
}

interface FileValidation {
  maxSize?: number; // en bytes
  allowedTypes?: string[];
}

const DEFAULT_VALIDATION: FileValidation = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
};

export const useFileUpload = (
  validation: FileValidation = DEFAULT_VALIDATION
) => {
  const [uploadState, setUploadState] = useState<FileUploadState>({
    uploading: false,
    uploadedUrl: null,
    error: null,
  });

  // Función para validar archivo
  const validateFile = useCallback(
    (file: File): string | null => {
      if (!file) {
        return "No se ha seleccionado ningún archivo";
      }

      // Validar tamaño
      if (validation.maxSize && file.size > validation.maxSize) {
        const maxSizeMB = validation.maxSize / (1024 * 1024);
        return `El archivo es demasiado grande. Máximo ${maxSizeMB}MB permitido`;
      }

      // Validar tipo
      if (
        validation.allowedTypes &&
        !validation.allowedTypes.includes(file.type)
      ) {
        const allowedExtensions = validation.allowedTypes
          .map((type) => type.split("/")[1])
          .join(", ");
        return `Tipo de archivo no permitido. Solo se permiten: ${allowedExtensions}`;
      }

      return null;
    },
    [validation]
  );

  // 🔧 FUNCIÓN CORREGIDA - Cambié uploadFile por uploadImage
  const uploadFile = useCallback(
    async (
      file: File,
      fileName: string,
      folder: string
    ): Promise<string | null> => {
      // Validar parámetros requeridos
      if (!folder || folder.trim() === "") {
        setUploadState((prev) => ({
          ...prev,
          error: "La carpeta de destino es requerida",
          uploading: false,
        }));
        return null;
      }

      // Validar archivo
      const validationError = validateFile(file);
      if (validationError) {
        setUploadState((prev) => ({
          ...prev,
          error: validationError,
          uploading: false,
        }));
        return null;
      }

      // Iniciar carga
      setUploadState({
        uploading: true,
        uploadedUrl: null,
        error: null,
      });

      try {
        // ✅ CORRECCIÓN: Usar uploadImage en lugar de uploadFile
        const uploadedUrl = await uploadImage(file, fileName, folder);

        setUploadState({
          uploading: false,
          uploadedUrl,
          error: null,
        });

        return uploadedUrl;
      } catch (error) {
        console.error("Error al subir archivo:", error);
        setUploadState({
          uploading: false,
          uploadedUrl: null,
          error:
            error instanceof Error
              ? error.message
              : "Error al subir el archivo",
        });
        return null;
      }
    },
    [validateFile]
  );

  // Función para resetear el estado
  const resetUploadState = useCallback(() => {
    setUploadState({
      uploading: false,
      uploadedUrl: null,
      error: null,
    });
  }, []);

  // Función para limpiar solo el error
  const clearError = useCallback(() => {
    setUploadState((prev) => ({ ...prev, error: null }));
  }, []);

  // Función para previsualizar imagen antes de subir
  const previewImage = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith("image/")) {
        reject(new Error("El archivo no es una imagen"));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.onerror = () => {
        reject(new Error("Error al leer el archivo"));
      };
      reader.readAsDataURL(file);
    });
  }, []);

  return {
    // Estado
    uploading: uploadState.uploading,
    uploadedUrl: uploadState.uploadedUrl,
    error: uploadState.error,

    // Funciones principales
    uploadFile,

    // Funciones de utilidad
    validateFile,
    previewImage,
    resetUploadState,
    clearError,
  };
};
