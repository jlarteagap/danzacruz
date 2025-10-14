// lib/validations/choreography-schema.ts
import * as Yup from "yup";

/**
 * Validación individual de una coreografía
 * Incluye reglas condicionales y mensajes contextuales
 */
const choreographySchema = Yup.object().shape({
  id: Yup.string().required(),

  category: Yup.string()
    .required("La categoría es obligatoria")
    .min(1, "Selecciona una categoría válida"),

  division: Yup.string()
    .required("La división es obligatoria")
    .when("category", {
      is: (val: string) => !!val,
      then: (schema) => schema.min(1, "Selecciona una división válida"),
    }),

  subdivision: Yup.string()
    .required("La subdivisión es obligatoria")
    .when("division", {
      is: (val: string) => !!val,
      then: (schema) => schema.min(1, "Selecciona una subdivisión válida"),
    }),

  modality: Yup.string()
    .oneOf(["solo", "duo", "trio", "group", "formation"], "Modalidad inválida")
    .required("La modalidad es obligatoria"),

  musicName: Yup.string()
    .required("El nombre de la música es obligatorio")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(150, "El nombre no puede exceder 150 caracteres")
    .trim(),

  musicFile: Yup.mixed()
    .nullable()
    .test("fileSize", "El archivo no debe superar 10MB", (value) => {
      if (!value) return true; // Opcional
      return (value as File).size <= 10 * 1024 * 1024; // 10MB
    })
    .test("fileType", "Solo se permiten archivos MP3, WAV o M4A", (value) => {
      if (!value) return true;
      const validTypes = [
        "audio/mpeg",
        "audio/wav",
        "audio/mp4",
        "audio/x-m4a",
      ];
      return validTypes.includes((value as File).type);
    }),

  choreographer: Yup.string()
    .required("El nombre del coreógrafo es obligatorio")
    .min(2, "Debe tener al menos 2 caracteres")
    .max(100, "No puede exceder 100 caracteres")
    .trim(),

  styleDetails: Yup.string()
    .required("Los detalles del estilo son obligatorios")
    .min(10, "Proporciona al menos 10 caracteres de descripción")
    .max(500, "La descripción no puede exceder 500 caracteres")
    .trim(),

  additionalInfo: Yup.string()
    .max(300, "La información adicional no puede exceder 300 caracteres")
    .trim()
    .nullable(),
});

/**
 * Schema principal del formulario de registro
 * Valida participante + array de coreografías
 */
export const registrationFormSchema = Yup.object().shape({
  participantName: Yup.string()
    .required("El nombre del participante es obligatorio")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres")
    .matches(
      /^[a-záéíóúñüA-ZÁÉÍÓÚÑÜ\s'-]+$/,
      "El nombre solo puede contener letras, espacios, guiones y apóstrofes"
    )
    .trim(),

  choreographies: Yup.array()
    .of(choreographySchema)
    .min(1, "Debes registrar al menos una coreografía")
    .max(5, "Máximo 5 coreografías por participante")
    .required("Las coreografías son obligatorias"),
});

/**
 * Valores iniciales para una nueva coreografía
 */
export const getEmptyChoreography = (): any => ({
  id: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  category: "",
  division: "",
  subdivision: "",
  modality: "solo",
  musicName: "",
  musicFile: null,
  choreographer: "",
  styleDetails: "",
  additionalInfo: "",
});

/**
 * Valores iniciales del formulario completo
 */
export const initialFormValues = {
  participantName: "",
  choreographies: [getEmptyChoreography()],
};

/**
 * Tipo inferido del schema para TypeScript
 */
export type RegistrationFormValues = Yup.InferType<
  typeof registrationFormSchema
>;
