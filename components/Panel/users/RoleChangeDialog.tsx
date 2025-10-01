// app/dashboard/usuarios/components/RoleChangeDialog.tsx
"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import { User, USER_ROLES, UserRole } from "@/types/user.types";
import { useUpdateUserRole } from "@/hooks/useUpdateUserRole";
import {
  updateRoleSchema,
  UpdateRoleFormValues,
} from "@/lib/validation/user.schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Shield } from "lucide-react";

interface Props {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ROLE_LABELS: Record<UserRole, string> = {
  [USER_ROLES.ADMIN]: "Administrador",
  [USER_ROLES.JURADO]: "Jurado",
  [USER_ROLES.COORDINADOR]: "Coordinador",
  [USER_ROLES.USER]: "Usuario",
};

const ROLE_COLORS: Record<UserRole, string> = {
  [USER_ROLES.ADMIN]: "text-red-600 bg-red-50",
  [USER_ROLES.JURADO]: "text-purple-600 bg-purple-50",
  [USER_ROLES.COORDINADOR]: "text-blue-600 bg-blue-50",
  [USER_ROLES.USER]: "text-gray-600 bg-gray-50",
};

export function RoleChangeDialog({ user, open, onOpenChange }: Props) {
  const { mutate: updateRole, isPending } = useUpdateUserRole();

  if (!user) return null;

  const initialValues: UpdateRoleFormValues = {
    newRole: (user.role as UserRole) ?? USER_ROLES.USER,
  };

  const handleSubmit = (values: UpdateRoleFormValues) => {
    updateRole(
      {
        userId: user.id,
        newRole: values.newRole as UserRole,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md bg-white'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Shield className='h-5 w-5 text-primary' />
            Cambiar Rol de Usuario
          </DialogTitle>
          <DialogDescription>
            Modifica el rol y permisos del usuario en el sistema
          </DialogDescription>
        </DialogHeader>

        <div className='flex items-center gap-3 py-4 px-1'>
          <Avatar className='h-12 w-12'>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className='bg-gradient-to-br from-blue-500 to-purple-600 text-white'>
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className='flex-1 min-w-0'>
            <p className='font-medium text-sm truncate'>{user.name}</p>
            <p className='text-xs text-muted-foreground truncate'>
              {user.email}
            </p>
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={updateRoleSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form className='space-y-6'>
              <div className='space-y-2'>
                <Label htmlFor='role' className='text-sm font-medium'>
                  Rol del usuario
                </Label>
                <Select
                  value={values.newRole}
                  onValueChange={(value) => setFieldValue("newRole", value)}
                  disabled={isPending}
                >
                  <SelectTrigger
                    id='role'
                    className='w-full'
                    aria-invalid={!!(errors.newRole && touched.newRole)}
                  >
                    <SelectValue placeholder='Seleccionar rol' />
                  </SelectTrigger>
                  <SelectContent className='bg-white'>
                    {Object.entries(ROLE_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        <div className='flex items-center gap-2'>
                          <span
                            className={`inline-flex h-2 w-2 rounded-full ${
                              ROLE_COLORS[value as UserRole]
                            }`}
                          />
                          {label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.newRole && touched.newRole && (
                  <p className='text-xs text-red-600'>{errors.newRole}</p>
                )}
              </div>

              <div className='flex gap-3 pt-2'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => onOpenChange(false)}
                  disabled={isPending}
                  className='flex-1'
                >
                  Cancelar
                </Button>
                <Button
                  type='submit'
                  disabled={isPending || values.newRole === user.role}
                  className='flex-1'
                >
                  {isPending ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Guardando...
                    </>
                  ) : (
                    "Guardar cambios"
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
