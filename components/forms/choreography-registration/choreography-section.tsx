// components/forms/choreography-registration/choreography-section.tsx
"use client";
import { useState } from "react";
import { Field } from "formik";
import { Music, User, FileText, Info, Theater, Trash2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  FormFieldWrapper,
  CategorySelect,
  DivisionSelect,
  SubdivisionSelect,
  ModalitySelect,
} from "@/components/forms/shared";

interface ChoreographySectionProps {
  index: number;
  onRemove?: () => void;
  showRemove: boolean;
}

export function ChoreographySection({
  index,
  onRemove,
  showRemove,
}: ChoreographySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDivision, setSelectedDivision] = useState<string>("");

  const prefix = `choreographies[${index}]`;

  return (
    <div className='space-y-6 p-6 bg-apple-gray-50 rounded-xl border-2 border-apple-gray-200 animate-slide-up'>
      {/* Header with remove button */}
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold text-apple-gray-900 flex items-center gap-2'>
          <Music className='h-5 w-5 text-brand-yellow' />
          Coreografía {index + 1}
        </h3>
        {showRemove && onRemove && (
          <Button
            type='button'
            variant='ghost'
            size='sm'
            onClick={onRemove}
            className='text-red-600 hover:text-red-700 hover:bg-red-50'
          >
            <Trash2 className='h-4 w-4 mr-2' />
            Eliminar
          </Button>
        )}
      </div>
      <div className='space-y-2'>
        <Field name={`${prefix}.choreographyName`}>
          {({ field, meta }: any) => (
            <FormFieldWrapper
              name={`${prefix}.choreographyName`}
              label='Nombre de la coreografía'
              error={meta.error}
              touched={meta.touched}
              required
              icon={<Theater className='h-4 w-4 text-brand-teal' />}
            >
              <Input
                {...field}
                value={field.value || ""}
                placeholder='Ej: Tradición Viva'
                className={meta.touched && meta.error ? "border-red-400" : ""}
              />
            </FormFieldWrapper>
          )}
        </Field>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Nombre de la Coreografía */}

        {/* Category */}
        <div className='flex flex-col gap-4'>
          <Field name={`${prefix}.category`}>
            {({ field, form, meta }: any) => (
              <FormFieldWrapper
                name={`${prefix}.category`}
                label='Categoría'
                error={meta.error}
                touched={meta.touched}
                required
              >
                <CategorySelect
                  name={`${prefix}.category`}
                  error={!!(meta.touched && meta.error)}
                  onValueChange={(value) => {
                    setSelectedCategory(value);
                    // Reset dependientes
                    form.setFieldValue(`${prefix}.division`, "");
                    form.setFieldValue(`${prefix}.subdivision`, "");
                    setSelectedDivision("");
                  }}
                />
              </FormFieldWrapper>
            )}
          </Field>
        </div>
        <div className='flex flex-col gap-4'>
          {/* Division */}

          <Field name={`${prefix}.division`}>
            {({ field, form, meta }: any) => (
              <FormFieldWrapper
                name={`${prefix}.division`}
                label='División'
                error={meta.error}
                touched={meta.touched}
                required
              >
                <DivisionSelect
                  name={`${prefix}.division`}
                  categoryValue={selectedCategory}
                  error={!!(meta.touched && meta.error)}
                  onValueChange={(value) => {
                    setSelectedDivision(value);
                    form.setFieldValue(`${prefix}.subdivision`, "");
                  }}
                />
              </FormFieldWrapper>
            )}
          </Field>

          {/* Subdivision */}
          <Field name={`${prefix}.subdivision`}>
            {({ field, form, meta }: any) => (
              <FormFieldWrapper
                name={`${prefix}.subdivision`}
                label='Subdivisión'
                error={meta.error}
                touched={meta.touched}
                required
              >
                <SubdivisionSelect
                  name={`${prefix}.subdivision`}
                  error={!!(meta.touched && meta.error)}
                />
              </FormFieldWrapper>
            )}
          </Field>

          {/* Modality */}

          <Field name={`${prefix}.modality`}>
            {({ field, form, meta }: any) => (
              <FormFieldWrapper
                name={`${prefix}.modality`}
                label='Modalidad'
                error={meta.error}
                touched={meta.touched}
                required
              >
                <ModalitySelect
                  name={`${prefix}.modality`}
                  error={!!(meta.touched && meta.error)}
                />
              </FormFieldWrapper>
            )}
          </Field>
        </div>
      </div>
      {/* Music Name */}

      <Field name={`${prefix}.musicName`}>
        {({ field, meta }: any) => (
          <FormFieldWrapper
            name={`${prefix}.musicName`}
            label='Nombre de la música o canción'
            error={meta.error}
            touched={meta.touched}
            required
            icon={<Music className='h-4 w-4 text-brand-teal' />}
          >
            <Input
              {...field}
              placeholder='Ej: Swan Lake - Tchaikovsky'
              className={meta.touched && meta.error ? "border-red-400" : ""}
            />
          </FormFieldWrapper>
        )}
      </Field>

      {/* Choreographer */}

      <Field name={`${prefix}.choreographer`}>
        {({ field, meta }: any) => (
          <FormFieldWrapper
            name={`${prefix}.choreographer`}
            label='Profesor o coreógrafo'
            error={meta.error}
            touched={meta.touched}
            required
            icon={<User className='h-4 w-4 text-brand-teal' />}
          >
            <Input
              {...field}
              placeholder='Ej: Ana Martínez'
              className={meta.touched && meta.error ? "border-red-400" : ""}
            />
          </FormFieldWrapper>
        )}
      </Field>

      {/* Style Details */}

      <Field name={`${prefix}.styleDetails`}>
        {({ field, meta }: any) => (
          <FormFieldWrapper
            name={`${prefix}.styleDetails`}
            label='Detalles del estilo o modalidad'
            error={meta.error}
            touched={meta.touched}
            required
            icon={<FileText className='h-4 w-4 text-brand-teal' />}
          >
            <Textarea
              {...field}
              placeholder='Describe el estilo, técnica o características principales de la coreografía...'
              rows={4}
              className={meta.touched && meta.error ? "border-red-400" : ""}
            />
          </FormFieldWrapper>
        )}
      </Field>

      {/* Additional Info */}

      <Field name={`${prefix}.additionalInfo`}>
        {({ field }: any) => (
          <FormFieldWrapper
            name={`${prefix}.additionalInfo`}
            label='Información adicional'
            description='Opcional'
            icon={<Info className='h-4 w-4 text-brand-teal' />}
          >
            <Textarea
              {...field}
              value={field.value ?? ""}
              placeholder='Cualquier información relevante adicional...'
              rows={3}
            />
          </FormFieldWrapper>
        )}
      </Field>
    </div>
  );
}
