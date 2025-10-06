import * as yup from "yup";

export const profileValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .required("El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "El nombre solo puede contener letras"),

  lastName: yup
    .string()
    .trim()
    .required("El apellido es requerido")
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido no puede exceder 50 caracteres")
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "El apellido solo puede contener letras"),

  phone: yup
    .string()
    .trim()
    .required("El teléfono es requerido")
    .matches(/^[\+]?[\d\s\-\(\)]+$/, "El formato del teléfono no es válido")
    .min(8, "El teléfono debe tener al menos 8 dígitos")
    .max(20, "El teléfono no puede exceder 20 caracteres"),

  city: yup
    .string()
    .trim()
    .required("La ciudad es requerida")
    .min(2, "La ciudad debe tener al menos 2 caracteres")
    .max(100, "La ciudad no puede exceder 100 caracteres")
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "La ciudad solo puede contener letras"),
  userRole: yup
    .string()
    .oneOf(["Director", "Representante de academia", "Participante"])
    .required("El rol de usuario es requerido"),
});
