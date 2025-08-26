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

  dateOfBirth: yup
    .date()
    .required("La fecha de nacimiento es requerida")
    .max(new Date(), "La fecha no puede ser futura")
    .test("age", "Debes ser mayor de 13 años", function (value) {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        return age - 1 >= 13;
      }
      return age >= 13;
    }),
});
