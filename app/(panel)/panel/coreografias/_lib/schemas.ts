import * as Yup from "yup";

export const choreographyEditSchema = Yup.object().shape({
  choreographyName: Yup.string()
    .required("El nombre de la coreografía es requerido")
    .min(3, "Debe tener al menos 3 caracteres")
    .max(100, "Máximo 100 caracteres"),

  category: Yup.string().required("La categoría es requerida"),

  division: Yup.string().required("La división es requerida"),

  subdivision: Yup.string().required("La subdivisión es requerida"),

  modality: Yup.string().required("La modalidad es requerida"),

  musicName: Yup.string()
    .required("El nombre de la música es requerido")
    .min(2, "Debe tener al menos 2 caracteres")
    .max(150, "Máximo 150 caracteres"),

  choreographer: Yup.string()
    .required("El nombre del coreógrafo es requerido")
    .min(3, "Debe tener al menos 3 caracteres")
    .max(100, "Máximo 100 caracteres"),

  styleDetails: Yup.string()
    .min(5, "Debe tener al menos 5 caracteres")
    .max(500, "Máximo 500 caracteres"),

  additionalInfo: Yup.string().nullable().max(1000, "Máximo 1000 caracteres"),
});

export type ChoreographyEditFormValues = Yup.InferType<
  typeof choreographyEditSchema
>;
