import { useState } from "react";
import Button from "../../../shared/component/Button";
import Icon from "../../../shared/component/Icon";
import Input from "../../../shared/component/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdatePasswordValidator } from "./validator/UpdatePasswordValidator";
import bcrypt from "bcryptjs";
import { updateDatabaseRecord } from "../../../api/apiRequest";
import Alert from "../shared/Alert";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";

export default function EditPasswordForm({ loggedUser }) {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();


  const handleAlert = () => {
    setShowAlert(!showAlert);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(UpdatePasswordValidator),
  });

  const onSubmit = async (data) => {
    const isPasswordMatch = await bcrypt.compare(
      data.oldPassword,
      loggedUser.password
    );

    if (isPasswordMatch) {
      const newHashedPassword = await bcrypt.hash(data.newPassword, 10);
      await updateDatabaseRecord("users", loggedUser.id, {
        password: newHashedPassword,
      });
      handleAlert()
      setTimeout(() => {
        dispatch(logout());
      }, 4000);    } else {
      setPasswordError("Current password is incorrect");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex space-x-4">
        <Input
          label="Current Password"
          type={showPassword ? "text" : "password"}
          register={register("oldPassword")}
          errorMessage={errors.oldPassword?.message}
          placeholder="Enter your password"
        >
          {showPassword ? (
            <Icon name="eyeInvisible" onClick={handleShowPassword} />
          ) : (
            <Icon name="eye" onClick={handleShowPassword} />
          )}
        </Input>
        <Input
          label="New Password"
          type={showPassword ? "text" : "password"}
          register={register("newPassword")}
          errorMessage={errors.newPassword?.message}
          placeholder="Choose a new password"
        >
          {showPassword ? (
            <Icon name="eyeInvisible" onClick={handleShowPassword} />
          ) : (
            <Icon name="eye" onClick={handleShowPassword} />
          )}
        </Input>
      </div>
      <p className="text-red-500">{passwordError}</p>
      <div className="flex justify-end pt-4">
        <Button type="submit" name="Edit" />
      </div>
      {showAlert && <Alert type="success" text="Password changed successfully. You will be logged out shortly" onClose={handleAlert} />}

    </form>
  );
}
