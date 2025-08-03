import * as yup from "yup";
import guestTranslations from "../../../translations/guestTranslations";

export const LoginFormValidator = yup.object().shape({
  email: yup
    .string()
    .required(guestTranslations.login.email.required)
    .email(guestTranslations.login.email.error)
    .max(45, guestTranslations.login.email.error.maxLength)
    .trim(),
  password: yup
    .string()
    .required(guestTranslations.login.password.required)
    .min(8, guestTranslations.login.password.error.minLength)
    .max(20, guestTranslations.login.password.error.maxLength)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\$\%\&\/\=\|\?\^\*\-\_\.\,\;])/,
      guestTranslations.login.password.error.specialCharacters
    )
    .trim(),
});
