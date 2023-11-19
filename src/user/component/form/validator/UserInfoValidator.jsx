import * as yup from "yup";

export const UserInfoValidator = yup.object().shape({
  firstName: yup
    .string()
    .max(30, "The name cannot exceed 30 characters")
    .required("Name is required"),
  lastName: yup
    .string()
    .max(30, "The surname cannot exceed 30 characters")
    .required("Surname is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .max(45, "Email is too long")
    .required("Email is required")
    .trim(),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password is too long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});
