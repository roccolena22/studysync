import * as yup from "yup";
import { UserRoles } from "../../../../shared/models";
import guestTranslations from "../../../translations/guestTranslations";

export const RegistrationFormValidator = yup.object().shape({
  firstName: yup
    .string()
    .max(50, guestTranslations.registration.name.error.maxLength)
    .min(2, guestTranslations.registration.name.error.minLength)
    .required(guestTranslations.registration.name.required)
    .trim(),
  lastName: yup
    .string()
    .max(100, guestTranslations.registration.surname.error.maxLength)
    .min(2, guestTranslations.registration.surname.error.minLength)
    .required(guestTranslations.registration.surname.required)
    .trim(),
  email: yup
    .string()
    .required(guestTranslations.registration.email.required)
    .email(guestTranslations.login.email.error.invalid)
    .max(45, guestTranslations.login.email.error.maxLength)
    .trim(),
  password: yup
    .string()
    .required(guestTranslations.registration.newPassword.required)
    .min(8, guestTranslations.registration.newPassword.error.minLength)
    .max(20, guestTranslations.registration.newPassword.error.maxLength)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\$\%\&\/\=\|\?\^\*\-\_\.\,\;])/,
      guestTranslations.registration.newPassword.error.specialCharacters
    )
    .trim(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], guestTranslations.registration.confirmPassword.error.match)
    .required(guestTranslations.registration.confirmPassword.required),
  role: yup
  .mixed<UserRoles>()
  .oneOf(Object.values(UserRoles), guestTranslations.registration.role.error.invalid)
  .required(guestTranslations.registration.role.required),
});
