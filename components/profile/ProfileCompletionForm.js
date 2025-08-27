"use client";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { profileValidationSchema } from "@/lib/validation/profileSchema";
import { useProfileSubmission } from "@/hooks/useProfileSubmission";
import { getInitialProfileValues } from "@/utils/profileUtils";
import { ButtonField, InputField } from "../form/Fields";

export default function ProfileCompletionForm({ user, isEditMode = false }) {
  const router = useRouter();
  const { update } = useSession();
  const { submitProfile, isLoading } = useProfileSubmission();

  const initialValues = getInitialProfileValues(user);

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const result = await submitProfile({
        userId: user.id,
        profileData: values,
      });

      if (result.success) {
        await update({
          user: {
            ...user,
            ...values,
            profileComplete: true,
          },
        });

        if (isEditMode) {
          router.push("/profile?updated=true");
        } else {
          router.push("/");
        }
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      setFieldError(
        "submit",
        "Error al guardar el perfil. Intenta nuevamente."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='space-y-8'>
      <header className='text-center'>
        <h1 className='text-3xl font-extrabold text-gray-900'>
          {isEditMode ? "Editar Perfil" : "Completa tu perfil"}
        </h1>
        <p className='mt-2 text-sm text-gray-600'>
          {isEditMode
            ? "Actualiza tu información personal"
            : "Necesitamos algunos datos adicionales para personalizar tu experiencia"}
        </p>
      </header>

      <Formik
        initialValues={initialValues}
        validationSchema={profileValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className='space-y-6' noValidate>
            <fieldset className='space-y-4'>
              <legend className='sr-only'>Información personal</legend>
              <InputField
                name='firstName'
                label='Nombre'
                type='text'
                placeholder='Tu nombre'
                required
                autoComplete='given-name'
              />

              <InputField
                name='lastName'
                label='Apellido'
                type='text'
                placeholder='Tu apellido'
                required
                autoComplete='family-name'
              />

              <InputField
                name='phone'
                label='Teléfono'
                type='tel'
                placeholder='Tu número de teléfono'
                required
                autoComplete='tel'
              />

              <InputField
                name='dateOfBirth'
                label='Fecha de nacimiento'
                type='date'
                required
                autoComplete='bday'
              />
            </fieldset>

            {errors.submit && (
              <div
                role='alert'
                className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md'
                aria-live='polite'
              >
                {errors.submit}
              </div>
            )}

            <ButtonField
              //   isLoading={isLoading || isSubmitting}
              //   loadingText='Guardando...'
              addText={isEditMode ? "Actualizar perfil" : "Completar perfil"}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
