import * as Yup from "yup";

export const colegios = [
  {
    value: "Pre-infantil",
    name: "Pre-infantil",
  },
  {
    value: "Infantil",
    name: "Infantil",
  },
  {
    value: "Juvenil",
    name: "Juvenil",
  },
];
export const general = [
  {
    value: "Pre-infantil",
    name: "Pre-infantil",
  },
  {
    value: "Infantil",
    name: "Infantil",
  },
  {
    value: "Juvenil",
    name: "Juvenil",
  },
  {
    value: "Mayores",
    name: "Mayores",
  },
];
export const category = ["General", "Colegios o Universidad"];
export const subDivision = [
  { value: "Solo", name: "Solo" },
  { value: "Duo", name: "Duo" },
  { value: "Trio", name: "Trio" },
  { value: "Grupo pequeño", name: "Grupo pequeño" },
  { value: "Grupo grande", name: "Grupo grande" },
];

export const initialValues = {
  name: "",
  category: "General",
  division: "",
  subDivision: "Grupo pequeño",
};

export const validate = Yup.object().shape({
  name: Yup.string().required("Introduzca un nombre del participante o grupo"),
  division: Yup.string().required("Seleccione una categoría"),
  subDivision: Yup.string().required("Seleccione una categoría"),
});
