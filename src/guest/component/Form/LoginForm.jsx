import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../shared/component/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoginFormValidator } from "./validator/LoginFormValidator";
import Input from "../../../shared/component/Input";
import Icon from "../../../shared/component/Icon";
import bcrypt from "bcryptjs";
import { useDispatch } from "react-redux";
import { setLoggedUser } from "../../../redux/slices/authSlice";
import { getListFromDatabase } from "../../../api/apiRequest";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginFormValidator),
  });

  const onSubmit = async (data) => {
    try {
      const users = await getListFromDatabase("users");
      const loggedUser = users.find((user) => user.email === data.email);

      if (loggedUser) {
        const userPassword = loggedUser && loggedUser.password;

        if (userPassword) {
          const result = await bcrypt.compare(data.password, userPassword);
          if (result) {
            dispatch(setLoggedUser(loggedUser));
            navigate("/studysync/");
          } else {
            setLoginError("Invalid email or password");
          }
        } else {
          setLoginError("There is a temporary problem, please try again later");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyDown = (event) => {
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
        label="Email"
        errorMessage={errors.email?.message}
        register={register("email")}
      />
      <Input
        label="Password"
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
        <Button type="submit" name="Login" />
        <Link to="/studysync/registration">
          <Button name="Sign-up" outline />
        </Link>
      </div>
    </form>
  );
}
