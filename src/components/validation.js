import * as yup from "yup";

const validationsSchema = yup.object().shape({
  number: yup
    .string()
    .matches(/^[0-9]+$/, "number required")
    .min(16, "not enough numbers")
    .max(16, "too many numbers")
    .required("required"),
  holder: yup.string().required("required"),
  cvv: yup
    .string()
    .matches(/^[0-9]+$/, "number required")
    .min(3, "enter 3bits cvv code")
    .max(3, "enter 3bits cvv code")
    .required("required"),
  expM: yup
    .number()
    .min(1, "enter valid month")
    .max(12, "enter valid month")
    .typeError("enter number from 1 to 12")
    .required("required"),
  expY: yup
    .number()
    .min(2021, "enter valid year")
    .max(2030, "enter valid year")
    .typeError("enter number from 2021 to 2030")
    .required("required"),
});
export default validationsSchema;
