// components/forms/choreography-registration/participant-section.tsx
"use client";

import { Field, ErrorMessage } from "formik";
import { User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function ParticipantSection() {
  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <Label
          htmlFor='participantName'
          className='text-sm font-medium text-apple-gray-700 flex items-center gap-2'
        >
          <User className='h-4 w-4 text-brand-teal' />
          Nombre completo del participante
          <span className='text-red-500'>*</span>
        </Label>

        <Field name='participantName'>
          {({ field, meta }: any) => (
            <>
              <Input
                {...field}
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
          Nombre completo tal como aparece en el documento de identidad
        </p>
      </div>
    </div>
  );
}
