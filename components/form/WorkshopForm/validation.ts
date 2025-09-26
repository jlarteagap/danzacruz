import * as Yup from "yup";
import { WorkshopFormData } from "@/types/workshops.types";

export const workshopValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  date: Yup.date().required("Date is required"),
  location: Yup.string().required("Location is required"),
  image: Yup.mixed().required("Image is required"),
});

export const initialValues: WorkshopFormData = {
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
  image: "",
  status: true,
  judge: "",
};
