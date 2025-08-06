import Button from "../../../shared/component/Button";
import Input from "../../../shared/component/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { DeleteFormValidator } from "./validator/DeleteFormValidator";
import Icon from "../../../shared/component/Icon";
import bcrypt from "bcryptjs";
import { logout } from "../../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import AlertBanner from "../../../shared/component/AlertBanner";
import { AlertTypes } from "../../../shared/models";

interface FormData {
  reasons?: string;
  password: string;
}

interface User {
  password: string;
  // aggiungi altri campi utente se ti servono
}

export default function DeleteAccountForm() {
  const loggedUser = useSelector<any, User | null>(
    (state) => state.auth.user
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showAlertBanner, setShowAlertBanner] = useState(false);
  const [passwordIsWrong, setPasswordIsWrong] = useState(false);

  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FormData>({
    resolver: yupResolver(DeleteFormValidator),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (loggedUser && loggedUser.password) {
      const result = await bcrypt.compare(data.password, loggedUser.password);
      if (result) {
        setShowAlertBanner(true);
        setPasswordIsWrong(false);
        setTimeout(() => {
          setShowAlertBanner(false);
          dispatch(logout());
        }, 3000);
      } else {
        setPasswordIsWrong(true);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <Input
            label="Explain to us why"
            placeholder="Enter your reasons"
            register={register("reasons")}
            errorMessage={errors.reasons?.message}
          />
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            register={register("password")}
            errorMessage={errors.password?.message}
            placeholder="Enter your password"
          >
            <Icon
              name={showPassword ? "eyeInvisible" : "eye"}
              onClick={handleShowPassword}
            />
          </Input>
          {passwordIsWrong && (
            <p className="text-red-500">The password is wrong</p>
          )}
        </div>
        <div className="flex justify-end pt-10">
          <Button name="Delete account" />
        </div>
      </form>
      {showAlertBanner && (
        <AlertBanner
          text="The request to delete your account has been processed."
          type={AlertTypes.SUCCESS}
        />
      )}
    </>
  );
}
