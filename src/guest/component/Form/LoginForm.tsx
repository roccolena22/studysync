import React, { useState, KeyboardEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../shared/component/Button";
import { Link } from "react-router-dom";
import { LoginFormValidator } from "./validator/LoginFormValidator";
import Input from "../../../shared/component/Input";
import Icon from "../../../shared/component/Icon";
import bcrypt from "bcryptjs";
import { useDispatch } from "react-redux";
import { setLoggedUser } from "../../../redux/slices/authSlice";
import { getUserByField } from "../../../api/apiUsers";
import guestTranslations from "../../translations/guestTranslations";
import { TabelName } from "../../../shared/models";

interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginFormProps {
  onLoginSuccess?: () => void;
  onLoadingChange?: (loading: boolean) => void;
}

export default function LoginForm({
  onLoginSuccess,
  onLoadingChange,
}: LoginFormProps): JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(LoginFormValidator),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      onLoadingChange?.(true); // avviso il padre che parte il caricamento

      const loggedUser = await getUserByField("email", data.email);

      if (loggedUser) {
        const userPassword = loggedUser.password;

        if (userPassword) {
          const result = await bcrypt.compare(data.password, userPassword);
          if (result) {
            dispatch(setLoggedUser(loggedUser));
            onLoginSuccess?.(); // redirect gestito dal padre
            return;
          } else {
            setLoginError(guestTranslations.login.invalidCredentials);
          }
        } else {
          setLoginError(guestTranslations.login.temporaryProblem);
        }
      } else {
        setLoginError(guestTranslations.login.invalidCredentials);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError(guestTranslations.login.temporaryProblem);
    } finally {
      onLoadingChange?.(false); // stop loader in ogni caso
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit((data) => {
        onSubmit(data);
        reset();
      })(event);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-2">
      {/* Email */}
      <Input
        label={guestTranslations.login.email.label}
        errorMessage={errors.email?.message}
        register={register("email")}
        placeholder={guestTranslations.login.email.placeholder}
      />

      {/* Password */}
      <Input
        label={guestTranslations.login.password.label}
        errorMessage={errors.password?.message}
        register={register("password")}
        type={showPassword ? "text" : "password"}
        onKeyDown={handleKeyDown}
        placeholder={guestTranslations.login.password.placeholder}
      >
        <Icon
          name={showPassword ? "eyeInvisible" : "eye"}
          onClick={handleShowPassword}
        />
      </Input>

      {/* Error message */}
      {loginError && <p className="text-red-500">{loginError}</p>}

      {/* Buttons */}
      <div className="flex justify-center space-x-4 py-6">
        <Button type="submit" label={guestTranslations.login.loginButton} />
        <Link to="/studysync/registration">
          <Button label={guestTranslations.login.registerButton} outline />
        </Link>
      </div>
    </form>
  );
}
