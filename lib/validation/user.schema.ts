// lib/validation/user.schema.ts
import * as Yup from "yup";
import { USER_ROLES } from "@/types/user.types";

export const updateRoleSchema = Yup.object({
  newRole: Yup.string()
    .oneOf(Object.values(USER_ROLES), "Rol inválido")
    .required("El rol es requerido"),
});

export type UpdateRoleFormValues = Yup.InferType<typeof updateRoleSchema>;
