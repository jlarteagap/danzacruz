"use client";

import { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Theater, Music, User, FileText, Info } from "lucide-react";
import { useUpdateChoreography } from "../_hooks/use-update-choreography";
import { choreographyEditSchema } from "../_lib/schemas";
import type {
  FlattenedChoreography,
  ChoreographyEditFormValues,
} from "../_types";

// Importar componentes compartidos
import {
  FormFieldWrapper,
  CategorySelect,
  DivisionSelect,
  SubdivisionSelect,
  ModalitySelect,
} from "@/components/forms/shared";

interface ChoreographyEditSheetProps {
  choreography: FlattenedChoreography;
  isOpen: boolean;
  onClose: () => void;
}

export const ChoreographyEditSheet = ({
  choreography,
  isOpen,
  onClose,
}: ChoreographyEditSheetProps) => {
  const { mutate: updateChoreography, isPending } = useUpdateChoreography();

  // Estado para manejar cascadas de selects
  const [selectedCategory, setSelectedCategory] = useState<string>(
    choreography.category
  );
  const [selectedDivision, setSelectedDivision] = useState<string>(
    choreography.division
  );

  const initialValues: ChoreographyEditFormValues = {
    choreographyName: choreography.choreographyName,
    category: choreography.category,
    division: choreography.division,
    subdivision: choreography.subdivision,
    modality: choreography.modality,
    musicName: choreography.musicName,
    choreographer: choreography.choreographer,
    styleDetails: choreography.styleDetails,
    additionalInfo: choreography.additionalInfo || "",
  };

  const handleSubmit = (values: ChoreographyEditFormValues) => {
    updateChoreography(
      {
        participantId: choreography.participantId,
        choreographyId: choreography.choreographyId,
        data: values,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='w-full sm:max-w-2xl overflow-y-auto bg-white p-10'>
        <SheetHeader className='space-y-3 pb-6'>
          <SheetTitle className='text-2xl font-semibold tracking-tight'>
            Editar Coreografía
          </SheetTitle>
          <SheetDescription className='text-base'>
            Actualiza la información de la coreografía. Los cambios se guardarán
            de forma inmediata.
          </SheetDescription>
        </SheetHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={choreographyEditSchema}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ errors, touched, isValid, dirty, setFieldValue }) => (
            <Form className='space-y-6'>
              {/* Nombre de la coreografía */}
              <FormFieldWrapper
                name='choreographyName'
                label='Nombre de la coreografía'
                error={errors.choreographyName}
                touched={touched.choreographyName}
                required
                icon={<Theater className='h-4 w-4 text-brand-teal' />}
              >
                <Field
                  as={Input}
                  name='choreographyName'
                  placeholder='Ej: Sinfonía del Movimiento'
                  className={
                    errors.choreographyName && touched.choreographyName
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
              </FormFieldWrapper>

              {/* Grid de categorías */}
              <div className='grid grid-cols-2 gap-4'>
                <FormFieldWrapper
                  name='category'
                  label='Categoría'
                  error={errors.category}
                  touched={touched.category}
                  required
                >
                  <CategorySelect
                    name='category'
                    error={!!(errors.category && touched.category)}
                    onValueChange={(value) => {
                      setSelectedCategory(value);
                      // Reset dependientes
                      setFieldValue("division", "");
                      setFieldValue("subdivision", "");
                      setSelectedDivision("");
                    }}
                  />
                </FormFieldWrapper>

                <FormFieldWrapper
                  name='division'
                  label='División'
                  error={errors.division}
                  touched={touched.division}
                  required
                >
                  <DivisionSelect
                    name='division'
                    categoryValue={selectedCategory}
                    error={!!(errors.division && touched.division)}
                    onValueChange={(value) => {
                      setSelectedDivision(value);
                      setFieldValue("subdivision", "");
                    }}
                  />
                </FormFieldWrapper>

                <FormFieldWrapper
                  name='subdivision'
                  label='Subdivisión'
                  error={errors.subdivision}
                  touched={touched.subdivision}
                  required
                >
                  <SubdivisionSelect
                    name='subdivision'
                    error={!!(errors.subdivision && touched.subdivision)}
                  />
                </FormFieldWrapper>

                <FormFieldWrapper
                  name='modality'
                  label='Modalidad'
                  error={errors.modality}
                  touched={touched.modality}
                  required
                >
                  <ModalitySelect
                    name='modality'
                    error={!!(errors.modality && touched.modality)}
                  />
                </FormFieldWrapper>
              </div>

              {/* Información musical */}
              <div className='space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4'>
                <h4 className='text-sm font-semibold text-slate-900'>
                  Información Musical
                </h4>

                <FormFieldWrapper
                  name='musicName'
                  label='Nombre de la música'
                  error={errors.musicName}
                  touched={touched.musicName}
                  required
                  icon={<Music className='h-4 w-4 text-brand-teal' />}
                >
                  <Field
                    as={Input}
                    name='musicName'
                    placeholder='Ej: Bolero - Maurice Ravel'
                    className={
                      errors.musicName && touched.musicName
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                  />
                </FormFieldWrapper>

                <FormFieldWrapper
                  name='choreographer'
                  label='Coreógrafo'
                  error={errors.choreographer}
                  touched={touched.choreographer}
                  required
                  icon={<User className='h-4 w-4 text-brand-teal' />}
                >
                  <Field
                    as={Input}
                    name='choreographer'
                    placeholder='Ej: María Fernández'
                    className={
                      errors.choreographer && touched.choreographer
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                  />
                </FormFieldWrapper>
              </div>

              {/* Detalles del estilo */}
              <FormFieldWrapper
                name='styleDetails'
                label='Detalles del estilo'
                error={errors.styleDetails}
                touched={touched.styleDetails}
                required
                description='Describe el estilo, técnicas utilizadas y características principales'
                icon={<FileText className='h-4 w-4 text-brand-teal' />}
              >
                <Field
                  as={Textarea}
                  name='styleDetails'
                  placeholder='Ej: Fusión de contemporáneo y ballet clásico, con énfasis en fluidez de movimiento...'
                  rows={4}
                  className={
                    errors.styleDetails && touched.styleDetails
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
              </FormFieldWrapper>

              {/* Información adicional */}
              <FormFieldWrapper
                name='additionalInfo'
                label='Información adicional'
                error={errors.additionalInfo}
                touched={touched.additionalInfo}
                description='Cualquier información extra relevante (opcional)'
                icon={<Info className='h-4 w-4 text-brand-teal' />}
              >
                <Field
                  as={Textarea}
                  name='additionalInfo'
                  placeholder='Ej: Vestuario especial, requisitos técnicos, etc.'
                  rows={3}
                  className={
                    errors.additionalInfo && touched.additionalInfo
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
              </FormFieldWrapper>

              {/* Footer con botones */}
              <SheetFooter className='flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:space-x-2 pt-6 border-t'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={onClose}
                  disabled={isPending}
                  className='w-full sm:w-auto'
                >
                  Cancelar
                </Button>
                <Button
                  type='submit'
                  disabled={isPending || !isValid || !dirty}
                  className='w-full sm:w-auto'
                >
                  {isPending ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Guardando...
                    </>
                  ) : (
                    "Guardar cambios"
                  )}
                </Button>
              </SheetFooter>
            </Form>
          )}
        </Formik>
      </SheetContent>
    </Sheet>
  );
};
