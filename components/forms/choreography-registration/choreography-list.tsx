// components/forms/choreography-registration/choreography-list.tsx
"use client";

import { FieldArray, FormikProps } from "formik";
import { Plus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChoreographySection } from "./choreography-section";
import {
  getEmptyChoreography,
  type RegistrationFormValues,
} from "@/lib/validation/choreography-schema";

interface ChoreographyListProps {
  formik: FormikProps<RegistrationFormValues>;
}

const MAX_CHOREOGRAPHIES = 5;

export function ChoreographyList({ formik }: ChoreographyListProps) {
  const { values, errors } = formik;
  const choreographiesCount = values.choreographies.length;
  const canAddMore = choreographiesCount < MAX_CHOREOGRAPHIES;

  return (
    <FieldArray name='choreographies'>
      {({ push, remove }) => (
        <div className='space-y-6'>
          {/* Choreographies */}
          {values.choreographies.map((_, index) => (
            <ChoreographySection
              key={`choreo-${index}`}
              index={index}
              onRemove={
                choreographiesCount > 1 ? () => remove(index) : undefined
              }
              showRemove={choreographiesCount > 1}
            />
          ))}

          {/* Error Summary */}
          {typeof errors.choreographies === "string" && (
            <Alert className='border-red-400 bg-red-50'>
              <AlertCircle className='h-5 w-5 text-red-600' />
              <AlertDescription className='ml-2 text-red-800'>
                {errors.choreographies}
              </AlertDescription>
            </Alert>
          )}

          {/* Add Choreography Button */}
          <div className='flex flex-col items-center gap-4 pt-4'>
            {canAddMore ? (
              <>
                <Button
                  type='button'
                  onClick={() => push(getEmptyChoreography())}
                  variant='outline'
                  size='lg'
                  className='w-full sm:w-auto border-2 border-dashed border-brand-teal/40 bg-brand-teal/5 hover:bg-brand-teal/10 hover:border-brand-teal text-apple-gray-900 transition-all duration-200'
                >
                  <Plus className='h-5 w-5 mr-2' />
                  Agregar otra coreografía
                </Button>
                <p className='text-sm text-apple-gray-500'>
                  {choreographiesCount} de {MAX_CHOREOGRAPHIES} coreografías
                  agregadas
                </p>
              </>
            ) : (
              <Alert className='border-brand-yellow/40 bg-brand-yellow/10'>
                <AlertCircle className='h-5 w-5 text-yellow-700' />
                <AlertDescription className='ml-2 text-yellow-800'>
                  Has alcanzado el máximo de {MAX_CHOREOGRAPHIES} coreografías
                  por participante
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      )}
    </FieldArray>
  );
}
