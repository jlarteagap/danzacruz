// lib/validations/choreography-schema.ts
import * as Yup from "yup";

/**
 * Tipos TS derivados (útiles para el resto de la app)
 * - Choreography: tipo de una coreografía individual
 * - RegistrationFormValues: tipo del formulario
 */
export const choreographySchema = Yup.object({
  id: Yup.string().required(),
  choreographyName: Yup.string()
    .trim()
    .min(3, "El nombre de la coreografía es muy corto")
    .max(100, "El nombre de la coreografía no puede superar los 100 caracteres")
    .required("El nombre de la coreografía es obligatorio"),

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
    .required("La modalidad es obligatoria")
    .when("modalidad", {
      is: (val: string) => !!val,
      then: (schema) => schema.min(1, "Selecciona una modalidad válida"),
    }),

  musicName: Yup.string()
    .required("El nombre de la música es obligatorio")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(150, "El nombre no puede exceder 150 caracteres")
    .trim(),

  choreographer: Yup.string()
    .required("El nombre del coreógrafo es obligatorio")
    .min(2, "Debe tener al menos 2 caracteres")
    .max(100, "No puede exceder 100 caracteres")
    .trim(),

  styleDetails: Yup.string()
    .min(10, "Proporciona al menos 10 caracteres de descripción")
    .max(500, "La descripción no puede exceder 500 caracteres")
    .trim()
    .nullable(),

  additionalInfo: Yup.string()
    .max(300, "La información adicional no puede exceder 300 caracteres")
    .trim()
    .nullable(),
});

/**
 * Schema principal del formulario de registro
 */
export const registrationFormSchema = Yup.object({
  participantName: Yup.string()
    .required("El nombre del participante es obligatorio")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres")
    .matches(
      /^[a-záéíóúñüA-ZÁÉÍÓÚÑÜ\s'-]+$/,
      "El nombre solo puede contener letras, espacios, guiones y apóstrofes"
    )
    .trim(),

  participantEmail: Yup.string()
    .required("El correo electrónico es obligatorio")
    .email("Ingresa un correo electrónico válido")
    .max(100, "El correo no puede exceder 100 caracteres")
    .trim(),

  participantPhone: Yup.string()
    .required("El número de teléfono es obligatorio")
    .matches(
      /^\+?\d[\d\s\-()]{7,19}$/,
      "Ingresa un número de teléfono válido (8 dígitos, puede incluir +, espacios, guiones o paréntesis)"
    )
    .trim(),

  participantCity: Yup.string()
    .required("La ciudad es obligatoria")
    .min(2, "La ciudad debe tener al menos 2 caracteres")
    .max(100, "La ciudad no puede exceder 100 caracteres")
    .trim(),

  participantCountry: Yup.string()
    .required("El país es obligatorio")
    .min(2, "El país debe tener al menos 2 caracteres")
    .max(100, "El país no puede exceder 100 caracteres")
    .trim(),

  choreographies: Yup.array()
    .of(choreographySchema)
    .min(1, "Debes registrar al menos una coreografía")
    .max(5, "Máximo 5 coreografías por participante")
    .required("Las coreografías son obligatorias"),
});

/**
 * Tipos TypeScript inferidos desde Yup para seguridad
 */
export type RegistrationFormValues = Yup.InferType<
  typeof registrationFormSchema
>;

export type Choreography = RegistrationFormValues["choreographies"][number];

/**
 * Valores iniciales para una nueva coreografía
 */
export const getDefaultChoreography = (): Choreography => ({
  id: `temp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
  choreographyName: "",
  category: "",
  division: "pre-infantil",
  subdivision: "solo",
  modality: "solo",
  musicName: "",
  choreographer: "",
  styleDetails: "",
  additionalInfo: null,
});

/**
 * Valores iniciales del formulario completo (tipados explícitamente)
 */
export const initialFormValues: RegistrationFormValues = {
  participantName: "",
  participantEmail: "",
  participantPhone: "",
  participantCity: "",
  participantCountry: "",
  choreographies: [getDefaultChoreography()],
};

export default registrationFormSchema;
