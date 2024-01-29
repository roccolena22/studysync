import Button from "../../../shared/component/Button";
import Input from "../../../shared/component/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { DeleteFormValidator } from "./validator/DeleteFormValidator";
import Icon from "../../../shared/component/Icon";
import bcrypt from "bcryptjs";
import { logout } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import AlertBanner from "../../../shared/component/AlertBanner";

export default function DeleteAccountForm({ loggedUser }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showAlertBanner, setShowAlertBanner] = useState(false);
  const [passwordIsWrong, setPasswordIsWrong] = useState(false);

  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(DeleteFormValidator),
  });

  const onSubmit = async (data) => {
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
        setPasswordIsWrong(!passwordIsWrong);
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
            errorMessage={errors.email?.message}
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
          type="delete"
        />
      )}
    </>
  );
}
