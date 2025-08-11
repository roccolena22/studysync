import * as yup from "yup";

export const UserProfileValidator = yup.object().shape({
  info: yup
    .string()
    .max(200, "The text cannot exceed 200 characters")
    .trim(),
});
