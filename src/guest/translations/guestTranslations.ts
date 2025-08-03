import { min } from "react-big-calendar/lib/utils/dates";

const guestTranslations = {
  login: {
    email: {
      label: "Email",
      placeholder: "Enter your email",
      required: "Email is required",
      error: {
        invalid: "Invalid email format",
        maxLength: "Email is too long",
      },
    },
    password: {
      label: "Password",
      placeholder: "Enter your password",
      required: "Password is required",
      error:{
        invalid: "Invalid password format",
        minLength: "Password must be at least 8 characters",
        maxLength: "Password is too long",
        specialCharacters: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special characters",
      },
    },
    invalidCredentials: "Invalid email or password",
    temporaryProblem: "There is a temporary problem, please try again later",
    loginButton: "Login",
    registerButton: "Sign-up",
    recoveryPasswordButton: "Did you forget your password?",
  },
  registration: {
    name: {
      label: "Name",
      placeholder: "Enter your name",
      required: "Name is required",
      error:{
        maxLength: "Name is too long",
        minLength: "Name must be at least 2 characters",
      }
    },
    surname: {
      label: "Surname",
      placeholder: "Enter your surname",
      required: "Surname is required",
      error:{
        maxLength: "Surname is too long",
        minLength: "Surname must be at least 2 characters",
      }
    },
    email: {
      label: "Email",
      placeholder: "Enter your email",
      required: "Email is required",
    },
    role:{
      label: "Role",
      placeholder: "Select your role",
      required: "Role is required",
      error: {
        invalid: "Invalid role selected",
      },
    },
    newPassword: {
      label: "New password",
      placeholder: "Create a new password",
      required: "Password is required",
      error:{
        minLength: "Password must be at least 8 characters",
        maxLength: "Password is too long",
        specialCharacters: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special characters",
      }
    },
    confirmPassword: {
      label: "Confirm password",
      placeholder: "Re-enter your password",
      required: "Please confirm your password",
      error: {
        match: "Passwords must match",
      }
    },
    roleTeacher: "Teacher",
    roleStudent: "Student",
    emailAlreadyExists: "Oops... this email is already associated with another account",
    registerButton: "Register",
  },
  recoveryPassword: {
    email: {
      label: "Email",
      placeholder: "Enter your email",
      required: "Email is required",
    },
    loading: "Sending...",
    sendButton: "Get reset link",
    infoMessage: "If the email is correct, you will receive a link to reset your password",
  },
};

export default guestTranslations;
