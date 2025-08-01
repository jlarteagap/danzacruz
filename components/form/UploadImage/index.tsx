import React, { useState, useRef } from "react";
import { useField } from "formik";
import { useFileUpload } from "@/hooks/useFileUpload";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadFieldProps {
  name: string;
  label?: string;
  currentImageUrl?: string;
  onImageUpload?: (imageUrl: string) => void;
  folder: string; // 🔧 Ahora es requerido para mayor claridad
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  name,
  label,
  currentImageUrl,
  onImageUpload,
  folder, // 🔧 Folder ahora es requerido desde el componente padre
}) => {
  const [field, meta, helpers] = useField(name);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    uploading,
    uploadedUrl,
    error,
    uploadFile,
    previewImage,
    clearError,
    resetUploadState,
  } = useFileUpload();

  // Generar nombre único para el archivo
  const generateFileName = (originalName: string): string => {
    const timestamp = Date.now();
    const extension = originalName.split(".").pop();
    return `judge_${timestamp}.${extension}`;
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Mostrar preview inmediatamente
      const preview = await previewImage(file);
      setPreviewUrl(preview);
      clearError(); // Limpiar errores previos

      // Generar nombre único y subir archivo
      const fileName = generateFileName(file.name);
      const uploadedImageUrl = await uploadFile(file, fileName, folder);

      if (uploadedImageUrl) {
        // Actualizar Formik
        helpers.setValue(uploadedImageUrl);

        // Callback opcional para el componente padre
        if (onImageUpload) {
          onImageUpload(uploadedImageUrl);
        }
      }
    } catch (error) {
      console.error("Error al procesar imagen:", error);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    helpers.setValue("");
    resetUploadState();

    // Limpiar input file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const displayImageUrl = uploadedUrl || currentImageUrl || previewUrl;
  const hasError = meta.touched && meta.error;

  return (
    <div className='space-y-3'>
      {label && (
        <label className='block text-sm font-medium text-gray-700'>
          {label}
        </label>
      )}

      <div className='relative'>
        {/* Área de imagen */}
        <div className='w-32 h-32 mx-auto border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 relative'>
          {displayImageUrl ? (
            <>
              <img
                src={displayImageUrl}
                alt='Preview'
                className='w-full h-full object-cover'
              />
              {/* Overlay con botón eliminar */}
              <div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center'>
                <Button
                  type='button'
                  variant='destructive'
                  size='sm'
                  onClick={handleRemoveImage}
                  disabled={uploading}
                >
                  <X className='h-4 w-4' />
                </Button>
              </div>
            </>
          ) : (
            <div className='flex flex-col items-center justify-center h-full text-gray-400'>
              <ImageIcon className='h-8 w-8 mb-2' />
              <span className='text-xs text-center'>Sin imagen</span>
            </div>
          )}
        </div>

        {/* Botón de carga */}
        <div className='mt-3 flex justify-center'>
          <Button
            type='button'
            variant='outline'
            size='sm'
            onClick={handleUploadClick}
            disabled={uploading}
            className='relative'
          >
            {uploading ? (
              <>
                <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                Subiendo...
              </>
            ) : (
              <>
                <Upload className='h-4 w-4 mr-2' />
                {displayImageUrl ? "Cambiar" : "Subir"} imagen
              </>
            )}
          </Button>
        </div>

        {/* Input file oculto */}
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          onChange={handleFileSelect}
          className='hidden'
        />
      </div>

      {/* Mensajes de error */}
      {error && <p className='text-sm text-red-600 text-center'>{error}</p>}

      {hasError && (
        <p className='text-sm text-red-600 text-center'>{meta.error}</p>
      )}

      {/* Estado de carga */}
      {uploading && (
        <div className='text-center'>
          <div className='inline-flex items-center text-sm text-blue-600'>
            <Loader2 className='h-4 w-4 mr-2 animate-spin' />
            Subiendo imagen...
          </div>
        </div>
      )}
    </div>
  );
};
