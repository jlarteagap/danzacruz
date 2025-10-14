// components/forms/choreography-registration/choreography-list.tsx
'use client';

import { FieldArray, FormikProps } from 'formik';
import { Plus, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ChoreographySection } from './choreography-section';
import { getEmptyChoreography, type RegistrationFormValues } from '@/lib/validations/choreography-schema';

interface ChoreographyListProps {
  formik: FormikProps<RegistrationFormValues>;
}

const MAX_CHOREOGRAPHIES = 5;

export function ChoreographyList({ formik }: ChoreographyListProps) {
  const { values, errors } = formik;
  const choreographiesCount = values.choreographies.length;
  const canAddMore = choreographiesCount < MAX_CHOREOGRAPHIES;

  return (
    <FieldArray name="choreographies">
      {({ push, remove }) => (
        <div className="space-y-6">
          {/* Choreographies */}
          {values.choreographies.map((_, index) => (
            <ChoreographySection
              key={`choreo-${index}`}
              index={index}
              onRemove={choreographiesCount > 1 ? () => remove(index) : undefined}
              showRemove={choreographiesCount > 1}
            />
          ))}

          {/* Error Summary */}
          {typeof errors.choreographies === 'string' && (
            <Alert className="border-red-400 bg-red-50">
              <AlertCircle className="h-5 w-