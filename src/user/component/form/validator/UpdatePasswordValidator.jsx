import * as yup from "yup";

export const UpdatePasswordValidator = yup.object().shape({
  oldPassword: yup
    .string()
    .required("Current password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password is too long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\$\%\&\/\=\|\?\^\*\-\_\.\,\;])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special characters"
    ),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password is too long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\$\%\&\/\=\|\?\^\*\-\_\.\,\;])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special characters"
    ),
});
