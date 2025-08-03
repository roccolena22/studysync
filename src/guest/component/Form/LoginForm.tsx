import React, { useState, KeyboardEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../shared/component/Button";
import { Link, useNavigate } from "react-router-dom";
import { LoginFormValidator } from "./validator/LoginFormValidator";
import Input from "../../../shared/component/Input";
import Icon from "../../../shared/component/Icon";
import bcrypt from "bcryptjs";
import { useDispatch } from "react-redux";
import { setLoggedUser } from "../../../redux/slices/authSlice";
import { getRecordByField } from "../../../api/apiRequest";
import guestTranslations from "../../translations/guestTranslations";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginForm(): JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const navigate = useNavigate();
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
      const loggedUser = await getRecordByField("users", "email", data.email);

      if (loggedUser) {
        const userPassword = loggedUser.password;

        if (userPassword) {
          const result = await bcrypt.compare(data.password, userPassword);
          if (result) {
            dispatch(setLoggedUser(loggedUser));
            navigate("/studysync/");
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
      <Input
        label={guestTranslations.login.email.label}
        errorMessage={errors.email?.message}
        register={register("email")}
      />
      <Input
        label={guestTranslations.login.password.label}
        errorMessage={errors.password?.message}
        register={register("password")}
        type={showPassword ? "text" : "password"}
        onKeyDown={handleKeyDown}
      >
        <Icon
          name={showPassword ? "eyeInvisible" : "eye"}
          onClick={handleShowPassword}
        />
      </Input>
      {loginError && <p className="text-red-500">{loginError}</p>}
      <div className="flex justify-center space-x-4 py-6">
        <Button type="submit" name={guestTranslations.login.loginButton} />
        <Link to="/studysync/registration">
          <Button name={guestTranslations.login.registerButton} outline />
        </Link>
      </div>
    </form>
  );
}
