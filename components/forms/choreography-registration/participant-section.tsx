// components/forms/choreography-registration/participant-section.tsx
"use client";

import { Field, ErrorMessage } from "formik";
import { User, Mail, Phone, MapPin, Globe } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function ParticipantSection() {
  return (
    <div className='space-y-6'>
      {/* Nombre */}
      <div className='space-y-2'>
        <Label
          htmlFor='participantName'
          className='text-sm font-medium text-apple-gray-700 flex items-center gap-2'
        >
          <User className='h-4 w-4 text-brand-teal' />
          Nombre completo del Colegio | Universidad | Grupo o Compañía
          <span className='text-red-500'>*</span>
        </Label>

        <Field name='participantName'>
          {({ field, meta }: any) => (
            <>
              <Input
                {...field}
                value={field.value || ""}
                id='participantName'
                type='text'
                placeholder='Ej: María González'
                className={`
                  w-full px-4 py-3 rounded-xl border-2 
                  bg-white text-apple-gray-900 placeholder:text-apple-gray-400
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-brand-teal/20
                  ${
                    meta.touched && meta.error
                      ? "border-red-400 focus:border-red-500"
                      : "border-apple-gray-200 focus:border-brand-teal"
                  }
                `}
                aria-invalid={meta.touched && meta.error ? "true" : "false"}
                aria-describedby={
                  meta.touched && meta.error
                    ? "participantName-error"
                    : undefined
                }
              />

              <ErrorMessage name='participantName'>
                {(msg) => (
                  <p
                    id='participantName-error'
                    className='mt-2 text-sm text-red-600 flex items-center gap-1 animate-slide-up'
                    role='alert'
                  >
                    <span className='inline-block w-1 h-1 bg-red-600 rounded-full' />
                    {msg}
                  </p>
                )}
              </ErrorMessage>
            </>
          )}
        </Field>

        <p className='text-xs text-apple-gray-500 mt-1'>
          Nombre completo de cómo participará en el evento. Si es un Colegio,
          Grupo o Compañía, colocar el nombre oficial.
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Email */}
        <div className='space-y-2'>
          <Label
            htmlFor='participantEmail'
            className='text-sm font-medium text-apple-gray-700 flex items-center gap-2'
          >
            <Mail className='h-4 w-4 text-brand-teal' />
            Correo electrónico
            <span className='text-red-500'>*</span>
          </Label>

          <Field name='participantEmail'>
            {({ field, meta }: any) => (
              <>
                <Input
                  {...field}
                  id='participantEmail'
                  type='email'
                  placeholder='Ej: contacto@colegio.com'
                  className={`
                  w-full px-4 py-3 rounded-xl border-2 
                  bg-white text-apple-gray-900 placeholder:text-apple-gray-400
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-brand-teal/20
                  ${
                    meta.touched && meta.error
                      ? "border-red-400 focus:border-red-500"
                      : "border-apple-gray-200 focus:border-brand-teal"
                  }
                `}
                  aria-invalid={meta.touched && meta.error ? "true" : "false"}
                  aria-describedby={
                    meta.touched && meta.error
                      ? "participantEmail-error"
                      : undefined
                  }
                />

                <ErrorMessage name='participantEmail'>
                  {(msg) => (
                    <p
                      id='participantEmail-error'
                      className='mt-2 text-sm text-red-600 flex items-center gap-1 animate-slide-up'
                      role='alert'
                    >
                      <span className='inline-block w-1 h-1 bg-red-600 rounded-full' />
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
              </>
            )}
          </Field>

          <p className='text-xs text-apple-gray-500 mt-1'>
            Se usará para enviar confirmaciones y notificaciones del evento.
          </p>
        </div>

        {/* Teléfono */}
        <div className='space-y-2'>
          <Label
            htmlFor='participantPhone'
            className='text-sm font-medium text-apple-gray-700 flex items-center gap-2'
          >
            <Phone className='h-4 w-4 text-brand-teal' />
            Número de teléfono
            <span className='text-red-500'>*</span>
          </Label>

          <Field name='participantPhone'>
            {({ field, meta }: any) => (
              <>
                <Input
                  {...field}
                  id='participantPhone'
                  type='tel'
                  placeholder='Ej: +591 70000000'
                  className={`
                  w-full px-4 py-3 rounded-xl border-2 
                  bg-white text-apple-gray-900 placeholder:text-apple-gray-400
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-brand-teal/20
                  ${
                    meta.touched && meta.error
                      ? "border-red-400 focus:border-red-500"
                      : "border-apple-gray-200 focus:border-brand-teal"
                  }
                `}
                  aria-invalid={meta.touched && meta.error ? "true" : "false"}
                  aria-describedby={
                    meta.touched && meta.error
                      ? "participantPhone-error"
                      : undefined
                  }
                />

                <ErrorMessage name='participantPhone'>
                  {(msg) => (
                    <p
                      id='participantPhone-error'
                      className='mt-2 text-sm text-red-600 flex items-center gap-1 animate-slide-up'
                      role='alert'
                    >
                      <span className='inline-block w-1 h-1 bg-red-600 rounded-full' />
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
              </>
            )}
          </Field>

          <p className='text-xs text-apple-gray-500 mt-1'>
            Incluye el código de país si corresponde. Ejemplo: +591 70000000
          </p>
        </div>
      </div>

      {/* Ciudad y País */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Ciudad */}
        <div className='space-y-2'>
          <Label
            htmlFor='participantCity'
            className='text-sm font-medium text-apple-gray-700 flex items-center gap-2'
          >
            <MapPin className='h-4 w-4 text-brand-teal' />
            Ciudad
            <span className='text-red-500'>*</span>
          </Label>

          <Field name='participantCity'>
            {({ field, meta }: any) => (
              <>
                <Input
                  {...field}
                  id='participantCity'
                  type='text'
                  placeholder='Ej: Santa Cruz'
                  className={`
              w-full px-4 py-3 rounded-xl border-2 
              bg-white text-apple-gray-900 placeholder:text-apple-gray-400
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-brand-teal/20
              ${
                meta.touched && meta.error
                  ? "border-red-400 focus:border-red-500"
                  : "border-apple-gray-200 focus:border-brand-teal"
              }
            `}
                />

                <ErrorMessage name='participantCity'>
                  {(msg) => (
                    <p
                      className='mt-2 text-sm text-red-600 flex items-center gap-1 animate-slide-up'
                      role='alert'
                    >
                      <span className='inline-block w-1 h-1 bg-red-600 rounded-full' />
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
              </>
            )}
          </Field>
        </div>

        {/* País */}
        <div className='space-y-2'>
          <Label
            htmlFor='participantCountry'
            className='text-sm font-medium text-apple-gray-700 flex items-center gap-2'
          >
            <Globe className='h-4 w-4 text-brand-teal' />
            País
            <span className='text-red-500'>*</span>
          </Label>

          <Field name='participantCountry'>
            {({ field, meta }: any) => (
              <>
                <Input
                  {...field}
                  id='participantCountry'
                  type='text'
                  placeholder='Ej: Bolivia'
                  className={`
              w-full px-4 py-3 rounded-xl border-2 
              bg-white text-apple-gray-900 placeholder:text-apple-gray-400
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-brand-teal/20
              ${
                meta.touched && meta.error
                  ? "border-red-400 focus:border-red-500"
                  : "border-apple-gray-200 focus:border-brand-teal"
              }
            `}
                />

                <ErrorMessage name='participantCountry'>
                  {(msg) => (
                    <p
                      className='mt-2 text-sm text-red-600 flex items-center gap-1 animate-slide-up'
                      role='alert'
                    >
                      <span className='inline-block w-1 h-1 bg-red-600 rounded-full' />
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
              </>
            )}
          </Field>
        </div>
      </div>
    </div>
  );
}
