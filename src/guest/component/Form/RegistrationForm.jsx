import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../shared/component/Button";
import { useState } from "react";
import { RegistrationFormValidator } from "./validator/RegistrationFormValidator";
import Input from "../../../shared/component/Input";
import Icon from "../../../shared/component/Icon";
import {
  addToLocalStorage,
  getFromLocalStorage,
} from "../../../user/hooks/localStorageHooks";
import bcrypt from "bcryptjs";
import { setUser } from "../../../redux/authSlice";
import { useDispatch } from "react-redux";
import { getUser } from "../../../user/hooks/getUser";

export default function RegistrationForm() {
  const [users, setUsers] = useState(getFromLocalStorage("users", []));
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(null);
  const [checkedTeacher, setCheckedTeacher] = useState(false);
  const [checkedStudent, setCheckedStudent] = useState(false);

  const [error, setError] = useState(false);

  const navigate = useNavigate();
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegistrationFormValidator),
  });

  const onSubmit = (data) => {
    if (role === null) {
      return;
    }

    const existingUser = getUser(data.email);

    if (existingUser) {
      setError(true);
    } else {
      setError(false);

      data.role = role;

      const saltRounds = 10;
      bcrypt.hash(data.password, saltRounds, (err, hash) => {
        data.password = hash;
        data.confirmPassword = hash; 
        

        const updatedUsers = [...users, data];
        setUsers(updatedUsers);
        addToLocalStorage("users", updatedUsers);
        dispatch(setUser(data));
        navigate("/");
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex space-x-4">
        <Input
          label="Name"
          errorMessage={errors.name?.message}
          register={register("name")}
        />
        <Input
          label="Surname"
          errorMessage={errors.surname?.message}
          register={register("surname")}
        />
      </div>
      <Input
        label="Email"
        errorMessage={errors.email?.message}
        register={register("email")}
        type="email"
      />
      <div className="flex space-x-4">
        <Input
          label="New password"
          errorMessage={errors.password?.message}
          register={register("password")}
          type={showPassword ? "text" : "password"}
        >
          {showPassword ? (
            <Icon name="eyeInvisible" onClick={handleShowPassword} />
          ) : (
            <Icon name="eye" onClick={handleShowPassword} />
          )}
        </Input>
        <Input
          label="Confirm password"
          errorMessage={errors.confirmPassword?.message}
          register={register("confirmPassword")}
          type={showPassword ? "text" : "password"}
        >
          {showPassword ? (
            <Icon name="eyeInvisible" onClick={handleShowPassword} />
          ) : (
            <Icon name="eye" onClick={handleShowPassword} />
          )}
        </Input>
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <p className="font-semibold">I am a...</p>
        <div className="flex space-x-2 items-center">
          <p>Teacher</p>
          <input
            checked={checkedTeacher}
            type="checkbox"
            onChange={() => handleCheckBox(0)}
          />
        </div>
        <p className="text-red-500 mt-1">{errors.isTeacher?.message}</p>
        <div className="flex space-x-2 items-center">
          <p>Student</p>
          <input
            checked={checkedStudent}
            type="checkbox"
            onChange={() => handleCheckBox(1)}
          />
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-sm text-center">
          Oops... this email is already associated with another account
        </p>
      )}
      <div className="flex justify-between items-center py-4">
        <Link to="/login">
          <Icon name="back" />
        </Link>
        <Button type="submit" name="Register" />
      </div>
    </form>
  );
}
