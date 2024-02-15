import * as yup from "yup";

export const LoginFormValidator = yup.object().shape({
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
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\£\$\%\&\/\(\)\=\|\?\^\*\§\°\-\_\.\,\<\;])/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special characters'
    )
    .trim(),
});
