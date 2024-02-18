import * as yup from "yup";

export const RegistrationFormValidator = yup.object().shape({
  firstName: yup
    .string()
    .max(50, "Password is too long")
    .required("First name is required")
    .trim(),
  lastName: yup
    .string()
    .max(100, "Password is too long")
    .required("Last name is required")
    .trim(),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .max(45, "Email is too long")
    .trim(),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password is too long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\$\%\&\/\=\|\?\^\*\-\_\.\,\;])/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special characters'
    )
    .trim(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});
