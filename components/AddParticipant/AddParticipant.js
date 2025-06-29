"use client";

import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { FormParticipant } from "./FormParticipant";
import { saveForm } from "../../firebase";
import { toast } from "sonner";

import { initialValues, validate } from "./utils";
import { Loading } from "../../src/components/loading";
import { useRouter } from "next/navigation";
// import { SendEmail } from '../email/sendEmail'
const currentTime = new Date();
const year = currentTime.getFullYear();

const AddParticipant = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("");
  const router = useRouter();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validate}
          onSubmit={async (values, { resetForm }) => {
            setIsLoading(true);
            values.year = year;
            // values.logo = await uploadFile(values.logo, values.name)
            const dataSave = await saveForm(values, "register");
            // SendEmail(values)
            resetForm();
            setIsLoading(false);
            toast.success("Participante registrado correctamente");

            // router.push(`completo/${dataSave}`);
          }}
        >
          {({ values, setFieldValue }) => {
            useEffect(() => {
              setCategory(values.category || "");
            }, [values.category]);
            return (
              <Form>
                <FormParticipant
                  categoryProp={category}
                  setFieldValue={setFieldValue}
                />
              </Form>
            );
          }}
        </Formik>
      )}
    </>
  );
};

export default AddParticipant;
