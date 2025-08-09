import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../shared/component/Button";
import { useState } from "react";
import { RegistrationFormValidator } from "./validator/RegistrationFormValidator";
import Input from "../../../shared/component/Input";
import Icon from "../../../shared/component/Icon";
import bcrypt from "bcryptjs";
import { useDispatch } from "react-redux";
import ChoiceRole from "../ChoiceRole";
import Message from "../../../shared/component/Message";
import { setLoggedUser } from "../../../redux/slices/authSlice";
import PasswordRequirement from "../../../shared/component/PasswordRequirements";
import guestTranslations from "../../translations/guestTranslations";
import { MessageTypes, UserRoles } from "../../../shared/models";
import { addUser, getUserByField } from "../../../api/apiUsers";

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRoles;
}

interface RegistrationFormProps {
  onLoadingChange?: (loading: boolean) => void;
}

export default function RegistrationForm({
  onLoadingChange,
}: RegistrationFormProps): JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(RegistrationFormValidator),
    defaultValues: { role: UserRoles.STUDENT },
  });

  const selectedRole = watch("role");

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRoleChange = (role: UserRoles) => {
    setValue("role", role, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    try {
      onLoadingChange?.(true); // avviso il padre che parte il loader

      const existingUser = await getUserByField("email", data.email);

      if (existingUser) {
        setError(true);
      } else {
        setError(false);

        const hash = await bcrypt.hash(data.password, 10);

        const newUser = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: hash,
          role: data.role,
        };

        const result = await addUser(newUser);
        if (result) {
          const loggedUser = await getUserByField("email", data.email);
          dispatch(setLoggedUser(loggedUser));
          navigate("/studysync/");
        }

        reset();
      }
    } catch (err) {
      console.error("Error during registration:", err);
    } finally {
      onLoadingChange?.(false); // fermo loader sempre
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <Input
          label={guestTranslations.registration.name.label}
          errorMessage={errors.firstName?.message}
          register={register("firstName")}
          required
          placeholder={guestTranslations.registration.name.placeholder}
        />
        <Input
          label={guestTranslations.registration.surname.label}
          errorMessage={errors.lastName?.message}
          register={register("lastName")}
          required
          placeholder={guestTranslations.registration.surname.placeholder}
        />
      </div>
      <Input
        label={guestTranslations.registration.email.label}
        errorMessage={errors.email?.message}
        register={register("email")}
        type="email"
        required
        placeholder={guestTranslations.registration.email.placeholder}
      />
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <Input
          label={guestTranslations.registration.newPassword.label}
          errorMessage={errors.password?.message}
          register={register("password")}
          type={showPassword ? "text" : "password"}
          required
          placeholder={guestTranslations.registration.newPassword.placeholder}
        >
          <Icon
            name={showPassword ? "eyeInvisible" : "eye"}
            onClick={handleShowPassword}
          />
        </Input>
        <Input
          label={guestTranslations.registration.confirmPassword.label}
          errorMessage={errors.confirmPassword?.message}
          register={register("confirmPassword")}
          type={showPassword ? "text" : "password"}
          required
          placeholder={guestTranslations.registration.confirmPassword.placeholder}
        >
          <Icon
            name={showPassword ? "eyeInvisible" : "eye"}
            onClick={handleShowPassword}
          />
        </Input>
      </div>
      <PasswordRequirement />
      <ChoiceRole
        selectedRole={selectedRole}
        handleChange={handleRoleChange}
        teacherLabel={guestTranslations.registration.roleTeacher}
        studentLabel={guestTranslations.registration.roleStudent}
      />
      {errors.role && (
        <p className="text-red-500 text-xs mb-2">{errors.role.message}</p>
      )}
      {error && (
        <Message
          type={MessageTypes.ERROR}
          text={guestTranslations.registration.emailAlreadyExists}
        />
      )}
      <div className="flex justify-between items-center py-4">
        <Link to="/studysync/login">
          <Icon name="back" />
        </Link>
        <Button
          type="submit"
          label={guestTranslations.registration.registerButton}
        />
      </div>
    </form>
  );
}
