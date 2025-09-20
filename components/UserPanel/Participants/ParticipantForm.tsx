"use client";

import { FC, useEffect } from "react";
import { Form, Formik } from "formik";

import { Participant } from "@/types/userPanel.types";
import { InputField, RadioFields, SelectField } from "@/components/form/Fields";
import { colegios, general, category, subDivision } from "../utils";
import { useParticipantForm } from "@/hooks/useParticipantForm";

interface ParticipantFormProps {
  user: any;
  participant?: Participant | null;
  onClose: () => void;
}

const ParticipantForm: FC<ParticipantFormProps> = ({
  user,
  participant,
  onClose,
}) => {
  const {
    initialValues,
    validate,
    handleSubmit,
    isLoading,
    category: categoryState,
    setCategory,
  } = useParticipantForm(user.id);

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-full max-w-lg'>
        <h2 className='text-xl font-semibold mb-4'>
          {participant ? "Editar Participante" : "Agregar Participante"}
        </h2>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, helpers) =>
            handleSubmit(values, helpers, user, onClose)
          }
          validationSchema={validate}
        >
          {({ values, setFieldValue }) => {
            useEffect(() => {
              setCategory(values.category);
            }, [values.category, setCategory]);

            return (
              <Form className='space-y-4'>
                <InputField
                  label='Nombre del participante'
                  name='name'
                  type='text'
                  placeholder='Grupo / Academia/ Persona'
                />

                <RadioFields
                  options={category}
                  name='category'
                  label='Categoría'
                />
                <SelectField
                  label='División'
                  name='division'
                  type='select'
                  options={categoryState === "General" ? general : colegios}
                />
                <SelectField
                  options={subDivision}
                  type='select'
                  name='subDivision'
                  label='Subdivisión'
                />
                <div className='flex justify-end space-x-2 pt-4 border-t'>
                  <button
                    type='button'
                    onClick={onClose}
                    className='px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400'
                  >
                    Cancelar
                  </button>
                  <button
                    type='submit'
                    className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
                  >
                    {participant ? "Guardar Cambios" : "Agregar Participante"}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default ParticipantForm;
