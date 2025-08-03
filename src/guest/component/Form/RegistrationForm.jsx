import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../shared/component/Button";
import { useState } from "react";
import { RegistrationFormValidator } from "./validator/RegistrationFormValidator";
import Input from "../../../shared/component/Input";
import Icon from "../../../shared/component/Icon";
import bcrypt from "bcryptjs";
import { addUser } from "../../../redux/slices/usersSlice";
import { useDispatch } from "react-redux";
import {
  addRecordToDatabase,
  getListFromDatabase,
} from "../../../api/apiRequest";
import ChoiceRole from "../ChoiceRole";
import Message from "../../../shared/component/Message";
import { setLoggedUser } from "../../../redux/slices/authSlice";
import PasswordRequirement from "../../../shared/component/PasswordRequirements";
import guestTranslations from "../../translations/guestTranslations";

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(null);
  const [checkedTeacher, setCheckedTeacher] = useState(false);
  const [checkedStudent, setCheckedStudent] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCheckBox = (input) => {
    if (input === 0) {
      setRole("teacher");
      setCheckedTeacher(true);
      setCheckedStudent(false);
    } else if (input === 1) {
      setRole("student");
      setCheckedTeacher(false);
      setCheckedStudent(true);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegistrationFormValidator),
  });

  const onSubmit = async (data) => {
    try {
      const users = await getListFromDatabase("users");
      if (role === null) {
        return;
      }
      const existingUser = users.find((user) => user.email === data.email);
      if (existingUser) {
        setError(true);
      } else {
        setError(false);

        data.role = role;

        const hash = await bcrypt.hash(data.password, 10);

        data.password = hash;
        const updatedUsers = [...users, data];
        dispatch(addUser(updatedUsers));
        const updateObj = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          role: data.role,
          password: data.password,
        };

        const result = await addRecordToDatabase("users", updateObj);
        if (result) {
          const users = await getListFromDatabase("users");
          const loggedUser = users.find((user) => user.email === data.email);
          dispatch(setLoggedUser(loggedUser));
          navigate("/studysync/");
        }
        reset();
      }
    } catch (error) {
      console.error("Error retrieving users from database:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <Input
          label={guestTranslations.registration.nameLabel}
          errorMessage={errors.firstName?.message}
          register={register("firstName")}
          required
        />
        <Input
          label={guestTranslations.registration.surnameLabel}
          errorMessage={errors.lastName?.message}
          register={register("lastName")}
          required
        />
      </div>
      <Input
        label={guestTranslations.registration.emailLabel}
        errorMessage={errors.email?.message}
        register={register("email")}
        type="email"
        required
      />
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <Input
          label={guestTranslations.registration.newPasswordLabel}
          errorMessage={errors.password?.message}
          register={register("password")}
          type={showPassword ? "text" : "password"}
          required
        >
          <Icon
            name={showPassword ? "eyeInvisible" : "eye"}
            onClick={handleShowPassword}
          />
        </Input>
        <Input
          label={guestTranslations.registration.confirmPasswordLabel}
          errorMessage={errors.confirmPassword?.message}
          register={register("confirmPassword")}
          type={showPassword ? "text" : "password"}
          required
        >
          <Icon
            name={showPassword ? "eyeInvisible" : "eye"}
            onClick={handleShowPassword}
          />
        </Input>
      </div>
      <PasswordRequirement />
      <ChoiceRole
        handleCheckBox={handleCheckBox}
        checkedTeacher={checkedTeacher}
        checkedStudent={checkedStudent}
        teacherLabel={guestTranslations.registration.roleTeacher}
        studentLabel={guestTranslations.registration.roleStudent}
      />
      {error && (
        <Message
          type="error"
          text={guestTranslations.registration.emailAlreadyExists}
        />
      )}
      <div className="flex justify-between items-center py-4">
        <Link to="/studysync/login">
          <Icon name="back" />
        </Link>
        <Button
          type="submit"
          name={guestTranslations.registration.registerButton}
        />
      </div>
    </form>
  );
}
