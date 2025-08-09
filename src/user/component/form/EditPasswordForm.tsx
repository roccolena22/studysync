import { useState } from "react";
import Button from "../../../shared/component/Button";
import Icon from "../../../shared/component/Icon";
import Input from "../../../shared/component/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdatePasswordValidator } from "./validator/UpdatePasswordValidator";
import bcrypt from "bcryptjs";
import { updateDatabaseRecord } from "../../../api/apiRequest";
import AlertBanner from "../../../shared/component/AlertBanner";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import { AlertTypes, TabelName } from "../../../shared/models";
import { User } from "../../models";
import { updateUser } from "../../../api/apiUsers";

interface EditPasswordFormProps {
  loggedUser: User
}

interface PasswordFormData {
  oldPassword: string;
  newPassword: string;
}

export default function EditPasswordForm({
  loggedUser,
}: EditPasswordFormProps) {
const [showPassword, setShowPassword] = useState<boolean>(false);
const [passwordError, setPasswordError] = useState<string | null>(null);
const [showUpdatedAlert, setShowUpdatedAlert] = useState<boolean>(false);
const [showProblemAlert, setShowProblemAlert] = useState<boolean>(false);


  const dispatch = useDispatch();

  const handleUpdatingAlert = () => {
    setShowUpdatedAlert(true);
    setTimeout(() => setShowUpdatedAlert(false), 3000);
  };

  const handleProblemAlert = () => {
    setShowProblemAlert(true);
    setTimeout(() => setShowProblemAlert(false), 3000);
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

const {
  handleSubmit,
  formState: { errors },
  register,
  reset,
} = useForm<PasswordFormData>({
  resolver: yupResolver(UpdatePasswordValidator),
});


  const onSubmit = async (data: PasswordFormData) => {
    if (data.oldPassword === data.newPassword) {
      handleProblemAlert();
      reset();
      return;
    }

    const isPasswordMatch = await bcrypt.compare(
      data.oldPassword,
      loggedUser.password
    );

    if (isPasswordMatch) {
      const newHashedPassword = await bcrypt.hash(data.newPassword, 10);
      await updateUser( loggedUser.id, {
        password: newHashedPassword,
      });
      handleUpdatingAlert();
      setTimeout(() => {
        dispatch(logout());
      }, 4000);
    } else {
      setPasswordError("Current password is incorrect");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <Input
          label="Current Password"
          type={showPassword ? "text" : "password"}
          register={register("oldPassword")}
          errorMessage={errors.oldPassword?.message}
          placeholder="Enter your password"
        >
          <Icon
            name={showPassword ? "eyeInvisible" : "eye"}
            onClick={handleShowPassword}
          />
        </Input>
        <Input
          label="New Password"
          type={showPassword ? "text" : "password"}
          register={register("newPassword")}
          errorMessage={errors.newPassword?.message}
          placeholder="Choose a new password"
        >
          <Icon
            name={showPassword ? "eyeInvisible" : "eye"}
            onClick={handleShowPassword}
          />
        </Input>
      </div>
      {passwordError && <p className="text-red-500">{passwordError}</p>}
      <div className="flex justify-end pt-4">
        <Button small type="submit" label="Save" />
      </div>
      {showUpdatedAlert && (
        <AlertBanner
          type={AlertTypes.SUCCESS}
          text="Password changed successfully. You will be logged out shortly."
        />
      )}
      {showProblemAlert && (
        <AlertBanner
          type={AlertTypes.ERROR}
          text="Choose a password different from the previous one."
        />
      )}
    </form>
  );
}
