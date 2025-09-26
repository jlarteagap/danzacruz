import * as Yup from "yup";
import { JudgesFormData } from "@/types/judges.types";

export const judgeValidationSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .required("El nombre es requerido"),

  apellido: Yup.string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido no puede exceder 50 caracteres")
    .required("El apellido es requerido"),

  nacionalidad: Yup.string()
    .min(2, "La nacionalidad debe tener al menos 2 caracteres")
    .required("La nacionalidad es requerida"),

  fotoPerfil: Yup.string().url("Debe ser una URL válida").nullable(),

  trayectoria: Yup.string()
    .min(10, "La trayectoria debe tener al menos 10 caracteres")
    .max(1000, "La trayectoria no puede exceder 1000 caracteres")
    .required("La trayectoria es requerida"),
});

export const initialValues: JudgesFormData = {
  nombre: "",
  apellido: "",
  nacionalidad: "",
  fotoPerfil: "",
  trayectoria: "",
};
