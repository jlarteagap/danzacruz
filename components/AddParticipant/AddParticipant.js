"use client";

import { Form, Formik } from "formik";
import { useCoreografyForm } from "@/hooks/useCoreografyForm";
import { FormParticipant } from "./FormParticipant";

export default function AddParticipant() {
  const {
    initialValues,
    validate,
    handleSubmit,
    isLoading,
    category,
    setCategory,
  } = useCoreografyForm();

  if (isLoading) return "Cargando...";

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form aria-labelledby='form-title' noValidate>
          <FormParticipant
            categoryProp={category}
            setFieldValue={setFieldValue}
          />
          {/* sincroniza categoría */}
          {setCategory(values.category)}
        </Form>
      )}
    </Formik>
  );
}
