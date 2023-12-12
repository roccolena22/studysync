import * as yup from "yup";

export const DeleteFormValidator = yup.object().shape({
  reasons: yup.string().max(100, "The event name cannot exceed 100 characters"),
  password: yup.string().required("The password is required"),
});
