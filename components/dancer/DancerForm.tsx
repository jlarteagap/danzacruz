// components/DancerForm.tsx
"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddDancer } from "@/hooks/useDancers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  FileText,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface DancerFormProps {
  choreographyId: string;
}

/**
 * Schema de validación con Yup
 */
const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre es demasiado largo")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo se permiten letras y espacios")
    .required("El nombre y apellido son requeridos"),
  document: Yup.string()
    .trim()
    .min(5, "Debe tener al menos 5 caracteres")
    .max(20, "Documento demasiado largo")
    .required("El CI o teléfono es requerido"),
});

/**
 * Campo de formulario reutilizable con validación visual
 */
const FormField: React.FC<{
  id: string;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  error?: string;
  touched?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}> = ({
  id,
  label,
  placeholder,
  icon,
  value,
  error,
  touched,
  onChange,
  onBlur,
  disabled,
}) => {
  const hasError = touched && error;
  const isValid = touched && !error && value.length > 0;

  return (
    <div className='space-y-2'>
      <Label htmlFor={id} className='text-sm font-medium text-neutral-700'>
        {label}
      </Label>

      <div className='relative'>
        {/* Icono izquierdo */}
        <div className='absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400'>
          {icon}
        </div>

        {/* Input */}
        <Input
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          aria-invalid={!!hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          className={`
            pl-10 pr-10 h-11 rounded-xl border-neutral-200
            transition-all duration-200
            focus:ring-2 focus:ring-offset-0
            ${
              hasError
                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                : isValid
                ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                : "focus:border-neutral-900 focus:ring-neutral-200"
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        />

        {/* Icono de validación derecho */}
        {isValid && (
          <div className='absolute right-3 top-1/2 -translate-y-1/2 text-green-500'>
            <CheckCircle2 className='h-4 w-4' />
          </div>
        )}

        {hasError && (
          <div className='absolute right-3 top-1/2 -translate-y-1/2 text-red-500'>
            <AlertCircle className='h-4 w-4' />
          </div>
        )}
      </div>

      {/* Mensaje de error */}
      {hasError && (
        <p
          id={`${id}-error`}
          role='alert'
          className='text-xs text-red-600 flex items-center gap-1.5 mt-1.5'
        >
          <AlertCircle className='h-3 w-3 shrink-0' />
          {error}
        </p>
      )}

      {/* Hint text */}
      {!hasError && !isValid && (
        <p className='text-xs text-neutral-500'>
          {id === "fullName"
            ? "Ingresa el nombre completo del bailarín"
            : "Ingresa el CI o número de teléfono"}
        </p>
      )}
    </div>
  );
};

/**
 * Formulario principal para agregar bailarines
 */
export default function DancerForm({ choreographyId }: DancerFormProps) {
  const mutation = useAddDancer(choreographyId);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      document: "",
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        await mutation.mutateAsync({
          fullName: values.fullName.trim(),
          document: values.document.trim(),
        });
        resetForm();
      } catch (error) {
        console.error("Error al agregar bailarín:", error);
      }
    },
  });

  const isFormValid = formik.isValid && formik.dirty;
  const isSubmitting = mutation.isPending;

  return (
    <form onSubmit={formik.handleSubmit} className='space-y-5' noValidate>
      {/* Campo: Nombre completo */}
      <FormField
        id='fullName'
        label='Nombre y Apellido'
        placeholder='Ej. Ana María Pérez'
        icon={<User className='h-4 w-4' />}
        value={formik.values.fullName}
        error={formik.errors.fullName}
        touched={formik.touched.fullName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={isSubmitting}
      />

      {/* Campo: Documento */}
      <FormField
        id='document'
        label='CI o Teléfono'
        placeholder='Ej. 7763355 o 77633551'
        icon={<FileText className='h-4 w-4' />}
        value={formik.values.document}
        error={formik.errors.document}
        touched={formik.touched.document}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={isSubmitting}
      />

      {/* Botón de envío */}
      <div className='flex items-center justify-end gap-3 pt-2'>
        {/* Botón reset (opcional) */}
        {formik.dirty && (
          <Button
            type='button'
            variant='ghost'
            onClick={() => formik.resetForm()}
            disabled={isSubmitting}
            className='text-neutral-600 hover:text-neutral-900'
          >
            Cancelar
          </Button>
        )}

        {/* Botón submit */}
        <Button
          type='submit'
          disabled={!isFormValid || isSubmitting}
          className={`
            min-w-[160px] h-11 rounded-xl font-semibold
            transition-all duration-200
            ${
              isFormValid && !isSubmitting
                ? "bg-neutral-900 hover:bg-neutral-800 text-white shadow-lg hover:shadow-xl"
                : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
            }
          `}
        >
          {isSubmitting ? (
            <span className='flex items-center gap-2'>
              <Loader2 className='h-4 w-4 animate-spin' />
              Agregando...
            </span>
          ) : (
            <span className='flex items-center gap-2'>
              <CheckCircle2 className='h-4 w-4' />
              Agregar bailarín
            </span>
          )}
        </Button>
      </div>

      {/* Contador de caracteres (opcional) */}
      {formik.values.fullName.length > 0 && (
        <div className='flex justify-between text-xs text-neutral-500 pt-1'>
          <span>{formik.values.fullName.length} / 100 caracteres</span>
        </div>
      )}
    </form>
  );
}
