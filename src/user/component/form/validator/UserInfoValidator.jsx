import * as yup from "yup";

export const UserInfoValidator = yup.object().shape({
  firstName: yup
    .string()
    .max(30, "The name cannot exceed 30 characters")
    .required("Name is required")
    .trim(),
  lastName: yup
    .string()
    .max(30, "The surname cannot exceed 30 characters")
    .required("Surname is required")
    .trim(),
  email: yup
    .string()
    .email("Invalid email format")
    .max(45, "Email is too long")
    .required("Email is required")
    .trim(),
});
