// components/forms/choreography-registration/choreography-section.tsx
"use client";

import { Field, ErrorMessage } from "formik";
import {
  Music,
  User,
  FileText,
  Info,
  Theater,
  Loader2,
  Trash2,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  useCategories,
  useDivisions,
  useSubdivisions,
} from "@/hooks/use-choreography-registration";
import { useState } from "react";

import {
  SUBDIVISION_OPTIONS,
  MODALITIES,
} from "@/services/api/choreography.service";
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
  const [uploadedFileName, setUploadedFileName] = useState<string>("");

  const { data: categories, isLoading: loadingCategories } = useCategories();
  const { data: divisions, isLoading: loadingDivisions } =
    useDivisions(selectedCategory);
  const { data: subdivisions, isLoading: loadingSubdivisions } =
    useSubdivisions(selectedDivision);

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
      </div>{" "}
      <div className='space-y-2'>
        <Label
          htmlFor={`${prefix}.choreographyName`}
          className='text-sm font-medium text-apple-gray-700 flex items-center gap-2'
        >
          <Theater className='h-4 w-4 text-brand-teal' />
          Nombre de la coreografía <span className='text-red-500'>*</span>
        </Label>
        <Field name={`${prefix}.choreographyName`}>
          {({ field, meta }: any) => (
            <>
              <Input
                {...field}
                value={field.value || ""}
                placeholder='Ej: Tradición Viva'
                className={`${
                  meta.touched && meta.error ? "border-red-400" : ""
                }`}
              />
              <ErrorMessage name={`${prefix}.choreographyName`}>
                {(msg) => (
                  <p className='mt-1 text-sm text-red-600' role='alert'>
                    {msg}
                  </p>
                )}
              </ErrorMessage>
            </>
          )}
        </Field>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Nombre de la Coreografía */}

        {/* Category */}
        <div className='flex flex-col gap-4'>
          <div className='space-y-2'>
            <Label
              htmlFor={`${prefix}.category`}
              className='text-sm font-medium text-apple-gray-700'
            >
              Categoría <span className='text-red-500'>*</span>
            </Label>
            <Field name={`${prefix}.category`}>
              {({ field, form, meta }: any) => (
                <>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      form.setFieldValue(`${prefix}.category`, value);
                      setSelectedCategory(value);
                      // Reset dependent fields
                      form.setFieldValue(`${prefix}.division`, "");
                      form.setFieldValue(`${prefix}.subdivision`, "");
                      setSelectedDivision("");
                    }}
                    disabled={loadingCategories}
                  >
                    <SelectTrigger
                      className={`w-full ${
                        meta.touched && meta.error ? "border-red-400" : ""
                      }`}
                    >
                      <SelectValue placeholder='Selecciona una categoría' />
                    </SelectTrigger>
                    <SelectContent className='bg-white'>
                      {loadingCategories ? (
                        <div className='flex items-center justify-center p-4'>
                          <Loader2 className='h-5 w-5 animate-spin text-brand-teal' />
                        </div>
                      ) : (
                        (Array.isArray(categories) ? categories : []).map(
                          (cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.name}
                            </SelectItem>
                          )
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <ErrorMessage name={`${prefix}.category`}>
                    {(msg) => (
                      <p className='mt-1 text-sm text-red-600' role='alert'>
                        {msg}
                      </p>
                    )}
                  </ErrorMessage>
                </>
              )}
            </Field>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          {/* Division */}
          <div className='space-y-2'>
            <Label
              htmlFor={`${prefix}.division`}
              className='text-sm font-medium text-apple-gray-700'
            >
              División <span className='text-red-500'>*</span>
            </Label>
            <Field name={`${prefix}.division`}>
              {({ field, form, meta }: any) => (
                <>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      form.setFieldValue(`${prefix}.division`, value);
                      setSelectedDivision(value);
                      form.setFieldValue(`${prefix}.subdivision`, "");
                    }}
                    disabled={!selectedCategory || loadingDivisions}
                  >
                    <SelectTrigger
                      className={`w-full ${
                        meta.touched && meta.error ? "border-red-400" : ""
                      }`}
                    >
                      <SelectValue placeholder='Selecciona una división' />
                    </SelectTrigger>
                    <SelectContent className='bg-white'>
                      {loadingDivisions ? (
                        <div className='flex items-center justify-center p-4'>
                          <Loader2 className='h-5 w-5 animate-spin text-brand-teal' />
                        </div>
                      ) : (
                        (Array.isArray(divisions) ? divisions : []).map(
                          (div) => (
                            <SelectItem key={div.value} value={div.value}>
                              {div.name}
                            </SelectItem>
                          )
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <ErrorMessage name={`${prefix}.division`}>
                    {(msg) => (
                      <p className='mt-1 text-sm text-red-600' role='alert'>
                        {msg}
                      </p>
                    )}
                  </ErrorMessage>
                </>
              )}
            </Field>
          </div>

          {/* Subdivision */}
          <div className='space-y-2'>
            <Label
              htmlFor={`${prefix}.subdivision`}
              className='text-sm font-medium text-apple-gray-700'
            >
              Subdivisión <span className='text-red-500'>*</span>
            </Label>
            <Field name={`${prefix}.subdivision`}>
              {({ field, form, meta }: any) => (
                <>
                  <Select
                    value={field.value}
                    onValueChange={(value) =>
                      form.setFieldValue(`${prefix}.subdivision`, value)
                    }
                  >
                    <SelectTrigger
                      className={`w-full ${
                        meta.touched && meta.error ? "border-red-400" : ""
                      }`}
                    >
                      <SelectValue placeholder='Selecciona una subdivisión' />
                    </SelectTrigger>
                    <SelectContent className='bg-white'>
                      {SUBDIVISION_OPTIONS.map((mod) => (
                        <SelectItem key={mod.value} value={mod.value}>
                          {mod.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ErrorMessage name={`${prefix}.subdivision`}>
                    {(msg) => (
                      <p className='mt-1 text-sm text-red-600' role='alert'>
                        {msg}
                      </p>
                    )}
                  </ErrorMessage>
                </>
              )}
            </Field>
          </div>

          {/* Modality */}
          <div className='space-y-2'>
            <Label
              htmlFor={`${prefix}.modality`}
              className='text-sm font-medium text-apple-gray-700'
            >
              Modalidad <span className='text-red-500'>*</span>
            </Label>
            <Field name={`${prefix}.modality`}>
              {({ field, form, meta }: any) => (
                <>
                  <Select
                    value={field.value}
                    onValueChange={(value) =>
                      form.setFieldValue(`${prefix}.modality`, value)
                    }
                  >
                    <SelectTrigger
                      className={`w-full ${
                        meta.touched && meta.error ? "border-red-400" : ""
                      }`}
                    >
                      <SelectValue placeholder='Selecciona modalidad' />
                    </SelectTrigger>
                    <SelectContent className='bg-white'>
                      {MODALITIES.map((mod) => (
                        <SelectItem key={mod.value} value={mod.value}>
                          {mod.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ErrorMessage name={`${prefix}.modality`}>
                    {(msg) => (
                      <p className='mt-1 text-sm text-red-600' role='alert'>
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
      {/* Music Name */}
      <div className='space-y-2'>
        <Label
          htmlFor={`${prefix}.musicName`}
          className='text-sm font-medium text-apple-gray-700 flex items-center gap-2'
        >
          <Music className='h-4 w-4 text-brand-teal' />
          Nombre de la música o canción <span className='text-red-500'>*</span>
        </Label>
        <Field name={`${prefix}.musicName`}>
          {({ field, meta }: any) => (
            <>
              <Input
                {...field}
                placeholder='Ej: Swan Lake - Tchaikovsky'
                className={`${
                  meta.touched && meta.error ? "border-red-400" : ""
                }`}
              />
              <ErrorMessage name={`${prefix}.musicName`}>
                {(msg) => (
                  <p className='mt-1 text-sm text-red-600' role='alert'>
                    {msg}
                  </p>
                )}
              </ErrorMessage>
            </>
          )}
        </Field>
      </div>
      {/* Choreographer */}
      <div className='space-y-2'>
        <Label
          htmlFor={`${prefix}.choreographer`}
          className='text-sm font-medium text-apple-gray-700 flex items-center gap-2'
        >
          <User className='h-4 w-4 text-brand-teal' />
          Profesor o coreógrafo <span className='text-red-500'>*</span>
        </Label>
        <Field name={`${prefix}.choreographer`}>
          {({ field, meta }: any) => (
            <>
              <Input
                {...field}
                placeholder='Ej: Ana Martínez'
                className={`${
                  meta.touched && meta.error ? "border-red-400" : ""
                }`}
              />
              <ErrorMessage name={`${prefix}.choreographer`}>
                {(msg) => (
                  <p className='mt-1 text-sm text-red-600' role='alert'>
                    {msg}
                  </p>
                )}
              </ErrorMessage>
            </>
          )}
        </Field>
      </div>
      {/* Style Details */}
      <div className='space-y-2'>
        <Label
          htmlFor={`${prefix}.styleDetails`}
          className='text-sm font-medium text-apple-gray-700 flex items-center gap-2'
        >
          <FileText className='h-4 w-4 text-brand-teal' />
          Detalles del estilo o modalidad{" "}
          <span className='text-red-500'>*</span>
        </Label>
        <Field name={`${prefix}.styleDetails`}>
          {({ field, meta }: any) => (
            <>
              <Textarea
                {...field}
                placeholder='Describe el estilo, técnica o características principales de la coreografía...'
                rows={4}
                className={`${
                  meta.touched && meta.error ? "border-red-400" : ""
                }`}
              />
              <ErrorMessage name={`${prefix}.styleDetails`}>
                {(msg) => (
                  <p className='mt-1 text-sm text-red-600' role='alert'>
                    {msg}
                  </p>
                )}
              </ErrorMessage>
            </>
          )}
        </Field>
      </div>
      {/* Additional Info */}
      <div className='space-y-2'>
        <Label
          htmlFor={`${prefix}.additionalInfo`}
          className='text-sm font-medium text-apple-gray-700 flex items-center gap-2'
        >
          <Info className='h-4 w-4 text-brand-teal' />
          Información adicional (opcional)
        </Label>
        <Field name={`${prefix}.additionalInfo`}>
          {({ field }: any) => (
            <Textarea
              {...field}
              value={field.value ?? ""} // <-- evita null
              placeholder='Cualquier información relevante adicional...'
              rows={3}
            />
          )}
        </Field>
      </div>
    </div>
  );
}
