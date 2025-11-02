// components/forms/choreography-registration/index.tsx
"use client";

import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";

import { AlertCircle, CheckCircle2, Loader2, Save } from "lucide-react";
import {
  registrationFormSchema,
  initialFormValues,
  type RegistrationFormValues,
} from "@/lib/validation/choreography-schema";
import {
  useChoreographyRegistration,
  useDraftRecovery,
} from "@/hooks/use-choreography-registration";
import { ParticipantSection } from "./participant-section";
import { ChoreographyList } from "./choreography-list";
import { FormActions } from "./form-actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function ChoreographyRegistrationForm() {
  const [showDraftRecovery, setShowDraftRecovery] = useState(false);
  const [recoveredDraft, setRecoveredDraft] =
    useState<RegistrationFormValues | null>(null);

  const { register, isLoading, isSuccess, isError, error, data, reset } =
    useChoreographyRegistration();
  const { loadDraft, clearDraft } = useDraftRecovery(initialFormValues);
  const router = useRouter();

  // Verificar draft al montar
  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      setRecoveredDraft(draft);
      setShowDraftRecovery(true);
    }
  }, []);

  // Confirmación antes de abandonar con cambios
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isSuccess && !isLoading) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isSuccess, isLoading]);

  const handleSubmit = async (
    values: RegistrationFormValues,
    formikHelpers: { resetForm: () => void }
  ) => {
    try {
      await register(values); // tu función que envía los datos a la API
      // Usar el `data` provisto por el hook después de ejecutar la acción
      const response = data;
      if (!response) {
        // Si no hay respuesta disponible, limpiar y salir
        formikHelpers.resetForm();
        return;
      }

      // Mapear las coreografías registradas para obtener los IDs
      // Asumiendo que tu API retorna algo como:
      // { participantId: "123", choreographies: [{ id: "c1", name: "..." }, { id: "c2", name: "..." }] }
      const choreographyIds = (response.choreographies || [])
        .map((c: any) => c.id)
        .join(",");
      const choreographyNames = (response.choreographies || [])
        .map((c: any) => c.choreographyName || c.name)
        .join(" | ");

      const params = new URLSearchParams({
        participantId: response.id,
        participantName: values.participantName,
        choreographyIds: choreographyIds,
        choreographyNames: encodeURIComponent(choreographyNames),
        totalCoreografias: (response.choreographies || []).length.toString(),
        registrados: "1", // Por ahora es solo el participante que se registró
      });

      router.push(`/gracias?${params.toString()}`);

      formikHelpers.resetForm(); // limpia el formulario
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };
  const handleUseDraft = () => {
    setShowDraftRecovery(false);
  };

  const handleDiscardDraft = () => {
    clearDraft();
    setRecoveredDraft(null);
    setShowDraftRecovery(false);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-apple-gray-50 via-white to-apple-gray-50'>
      <div className='max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8'>
        {/* Header */}
        <header className='mb-12 text-center animate-fade-in'>
          <h1 className='text-4xl font-semibold text-apple-gray-900 mb-3 tracking-tight'>
            Registro de Participantes
          </h1>
          <p className='text-lg text-apple-gray-600 max-w-2xl mx-auto'>
            Completa el formulario para registrar al participante y sus
            coreografías en el festival
          </p>
        </header>

        {/* Draft Recovery Alert */}
        {showDraftRecovery && recoveredDraft && (
          <Alert className='mb-6 border-brand-teal bg-brand-teal/5 animate-slide-up'>
            <Save className='h-5 w-5 text-brand-teal' />
            <AlertDescription className='ml-2 flex items-center justify-between'>
              <span className='text-apple-gray-900'>
                Se encontró un borrador guardado. ¿Deseas recuperarlo?
              </span>
              <div className='flex gap-2 ml-4'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={handleDiscardDraft}
                  className='border-apple-gray-300'
                >
                  Descartar
                </Button>
                <Button
                  size='sm'
                  onClick={handleUseDraft}
                  className='bg-brand-teal hover:bg-brand-teal-dark text-apple-gray-900'
                >
                  Recuperar
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Success Message */}
        {isSuccess && data && (
          <Alert className='mb-6 border-green-500 bg-green-50 animate-slide-up'>
            <CheckCircle2 className='h-5 w-5 text-green-600' />
            <AlertDescription className='ml-2'>
              <p className='font-medium text-green-900 mb-1'>
                ¡Registro completado exitosamente!
              </p>

              {/* Información del Participante */}
              <div className='text-sm text-green-800 space-y-2 mt-3'>
                <p>
                  <span className='font-semibold'>Participante:</span>{" "}
                  {data.participantName}
                </p>

                {/* Coreografías Registradas */}
                <div className='mt-3'>
                  <p className='font-semibold mb-2'>
                    {data.choreographies.length === 1
                      ? "Coreografía registrada:"
                      : `${data.choreographies.length} Coreografías registradas:`}
                  </p>

                  <div className='space-y-3 ml-2'>
                    {data.choreographies.map((choreo, index) => (
                      <div
                        key={choreo.id}
                        className='bg-white/50 rounded-lg p-3 border border-green-200'
                      >
                        <p className='font-medium text-green-900 mb-1'>
                          {index + 1}. {choreo.choreographyName}
                        </p>
                        <div className='text-xs text-green-700 space-y-0.5'>
                          <p>
                            <span className='font-semibold'>Categoría:</span>{" "}
                            {choreo.category}
                          </p>
                          <p>
                            <span className='font-semibold'>División:</span>{" "}
                            {choreo.division}
                          </p>
                          <p>
                            <span className='font-semibold'>Subdivisión:</span>{" "}
                            {choreo.subdivision}
                          </p>
                          <p>
                            <span className='font-semibold'>Modalidad:</span>{" "}
                            {choreo.modality}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                variant='link'
                size='sm'
                onClick={() => {
                  reset();
                  window.location.reload();
                }}
                className='mt-4 text-green-700 hover:text-green-900 p-0 h-auto'
              >
                Registrar otro participante →
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Error Message */}
        {isError && (
          <Alert className='mb-6 border-red-500 bg-red-50 animate-slide-up'>
            <AlertCircle className='h-5 w-5 text-red-600' />
            <AlertDescription className='ml-2'>
              <p className='font-medium text-red-900 mb-1'>
                Error al procesar el registro
              </p>
              <p className='text-sm text-red-800'>
                {error?.message ||
                  "Por favor, verifica los datos e intenta nuevamente"}
              </p>
            </AlertDescription>
          </Alert>
        )}

        {/* Main Form */}
        <Formik<RegistrationFormValues>
          initialValues={recoveredDraft || initialFormValues}
          validationSchema={registrationFormSchema}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
          enableReinitialize
        >
          {(formikProps) => (
            <Form className='space-y-8'>
              {/* Participant Section */}
              <div className='bg-white rounded-2xl shadow-apple-lg p-8 border border-apple-gray-200 animate-slide-up'>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-1 h-8 bg-brand-teal rounded-full' />
                  <h2 className='text-2xl font-semibold text-apple-gray-900'>
                    Datos del Participante
                  </h2>
                </div>
                <ParticipantSection />
              </div>

              {/* Choreographies Section */}
              <div className='bg-white rounded-2xl shadow-apple-lg p-8 border border-apple-gray-200 animate-slide-up'>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-1 h-8 bg-brand-yellow rounded-full' />
                  <h2 className='text-2xl font-semibold text-apple-gray-900'>
                    Coreografías
                  </h2>
                </div>
                <ChoreographyList formik={formikProps} />
              </div>

              {/* Form Actions */}
              <FormActions
                isLoading={isLoading}
                isSuccess={isSuccess}
                formik={formikProps}
              />

              {/* Loading Overlay */}
              {isLoading && (
                <div className='fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in'>
                  <div className='bg-white rounded-2xl shadow-apple-lg p-8 flex flex-col items-center gap-4'>
                    <Loader2 className='h-12 w-12 animate-spin text-brand-teal' />
                    <p className='text-lg font-medium text-apple-gray-900'>
                      Procesando registro...
                    </p>
                    <p className='text-sm text-apple-gray-600'>
                      Por favor, no cierres esta ventana
                    </p>
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
