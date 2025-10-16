// components/forms/choreography-registration/form-actions.tsx
"use client";

import { FormikProps } from "formik";
import { Loader2, Send, RotateCcw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDraftRecovery } from "@/hooks/use-choreography-registration";
import { type RegistrationFormValues } from "@/lib/validation/choreography-schema";
import { useEffect } from "react";

interface FormActionsProps {
  isLoading: boolean;
  isSuccess: boolean;
  formik: FormikProps<RegistrationFormValues>;
}

export function FormActions({
  isLoading,
  isSuccess,
  formik,
}: FormActionsProps) {
  const { saveDraft } = useDraftRecovery(formik.values);
  const { values, errors, touched, isValid, resetForm } = formik;

  // Auto-save draft every 30 seconds
  useEffect(() => {
    if (isSuccess) return;

    const interval = setInterval(() => {
      if (
        values.participantName ||
        values.choreographies.some((c) => c.musicName)
      ) {
        saveDraft();
      }
    }, 30000); // 30 segundos

    return () => clearInterval(interval);
  }, [values, isSuccess, saveDraft]);

  const hasErrors = Object.keys(errors).length > 0;
  const hasTouched = Object.keys(touched).length > 0;

  return (
    <div className='sticky bottom-6 z-40'>
      <div className='bg-white rounded-2xl shadow-apple-lg border-2 border-apple-gray-200 p-6 animate-slide-up'>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
          {/* Left side - Info */}
          <div className='flex items-center gap-3'>
            {hasTouched && (
              <button
                type='button'
                onClick={saveDraft}
                className='flex items-center gap-2 text-sm text-apple-gray-600 hover:text-brand-teal transition-colors'
                disabled={isLoading}
              >
                <Save className='h-4 w-4' />
                <span className='hidden sm:inline'>Guardar borrador</span>
              </button>
            )}

            {hasErrors && hasTouched && (
              <p className='text-sm text-red-600 flex items-center gap-2'>
                <span className='inline-block w-2 h-2 bg-red-600 rounded-full animate-pulse' />
                Hay errores en el formulario
              </p>
            )}
          </div>

          {/* Right side - Actions */}
          <div className='flex items-center gap-3 w-full sm:w-auto'>
            <Button
              type='button'
              variant='outline'
              onClick={() => {
                if (
                  window.confirm(
                    "¿Estás seguro de que deseas limpiar el formulario? Los datos no guardados se perderán."
                  )
                ) {
                  resetForm();
                }
              }}
              disabled={isLoading || isSuccess}
              className='flex-1 sm:flex-none border-apple-gray-300 hover:bg-apple-gray-50'
            >
              <RotateCcw className='h-4 w-4 mr-2' />
              Limpiar
            </Button>

            <Button
              type='submit'
              disabled={isLoading || isSuccess || (hasTouched && !isValid)}
              className='flex-1 sm:flex-none bg-gradient-to-r from-brand-teal to-brand-teal-dark hover:opacity-90 text-apple-gray-900 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isLoading ? (
                <>
                  <Loader2 className='h-5 w-5 mr-2 animate-spin' />
                  Procesando...
                </>
              ) : isSuccess ? (
                <>Registro completado</>
              ) : (
                <>
                  <Send className='h-5 w-5 mr-2' />
                  Registrar participante
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Progress indicator */}
        {!isSuccess && (
          <div className='mt-4 pt-4 border-t border-apple-gray-200'>
            <div className='flex items-center justify-between text-xs text-apple-gray-600 mb-2'>
              <span>Progreso del formulario</span>
              <span className='font-medium'>
                {calculateProgress(values, errors)}%
              </span>
            </div>
            <div className='w-full bg-apple-gray-200 rounded-full h-2 overflow-hidden'>
              <div
                className='h-full bg-gradient-to-r from-brand-teal to-brand-yellow transition-all duration-500 ease-out'
                style={{ width: `${calculateProgress(values, errors)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Calculate form completion percentage
 */
function calculateProgress(
  values: RegistrationFormValues,
  errors: any
): number {
  const totalFields = 1 + values.choreographies.length * 7; // participantName + (7 campos por coreografía)
  let filledFields = 0;

  // Check participant name
  if (values.participantName.trim()) filledFields++;

  // Check each choreography
  values.choreographies.forEach((choreo) => {
    if (choreo.category) filledFields++;
    if (choreo.division) filledFields++;
    if (choreo.subdivision) filledFields++;
    if (choreo.modality) filledFields++;
    if (choreo.musicName.trim()) filledFields++;
    if (choreo.choreographer.trim()) filledFields++;
    if (choreo.styleDetails?.trim()) filledFields++;
  });

  const progress = Math.round((filledFields / totalFields) * 100);
  return Math.min(progress, 100);
}
