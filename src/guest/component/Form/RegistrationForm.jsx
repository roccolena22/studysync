import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../../../shared/component/Button";
import { useState } from "react";
import { RegistrationFormValidator } from "./validator/RegistrationFormValidator";
import Input from "../../../shared/component/Input";
import Icon from "../../../shared/component/Icon";
import bcrypt from "bcryptjs";
import { setLoggedUser } from "../../../redux/slices/authSlice";
import { addUser } from "../../../redux/slices/usersSlice";
import { useDispatch } from "react-redux";
import {
  addRecordToDatabase,
  getListFromDatabase,
} from "../../../api/apiRequest";
import ChoiceOfRole from "../ChoiceOfRole";
import AlertBanner from "../../../shared/component/AlertBanner";
import Message from "../../../shared/component/Message";

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(null);
  const [checkedTeacher, setCheckedTeacher] = useState(false);
  const [checkedStudent, setCheckedStudent] = useState(false);
  const [error, setError] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const dispatch = useDispatch();

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
        data.confirmPassword = hash;
        const loggedUser = users.find((user) => user.email === data.email);
        dispatch(setLoggedUser(loggedUser));
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
        result && handleBanner();
        reset()
      }
    } catch (error) {
      console.error("Error retrieving users from database:", error);
    }
  };

  const handleBanner = () => {
    setShowBanner(!showBanner);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <Input
          label="Name"
          errorMessage={errors.firstName?.message}
          register={register("firstName")}
        />
        <Input
          label="Surname"
          errorMessage={errors.lastName?.message}
          register={register("lastName")}
        />
      </div>
      <Input
        label="Email"
        errorMessage={errors.email?.message}
        register={register("email")}
        type="email"
      />
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <Input
          label="New password"
          errorMessage={errors.password?.message}
          register={register("password")}
          type={showPassword ? "text" : "password"}
        >
          <Icon
            name={showPassword ? "eyeInvisible" : "eye"}
            onClick={handleShowPassword}
          />
        </Input>
        <Input
          label="Confirm password"
          errorMessage={errors.confirmPassword?.message}
          register={register("confirmPassword")}
          type={showPassword ? "text" : "password"}
        >
          <Icon
            name={showPassword ? "eyeInvisible" : "eye"}
            onClick={handleShowPassword}
          />
        </Input>
      </div>
      <ChoiceOfRole
        handleCheckBox={handleCheckBox}
        checkedTeacher={checkedTeacher}
        checkedStudent={checkedStudent}
      />
      {error && (
        <Message type="error" text="Oops... this email is already associated with another account" />
      )}
      <div className="flex justify-between items-center py-4">
        <Link to="/login">
          <Icon name="back" />
        </Link>
        <Button type="submit" name="Register" />
      </div>
      {showBanner && (
        <AlertBanner
          text="Registration done! Proceed to login."
          type="success"
          onClose={() => setShowBanner(false)}
        />
      )}
    </form>
  );
}
