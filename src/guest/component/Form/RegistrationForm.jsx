import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../shared/component/Button";
import { useState } from "react";
import { RegistrationFormValidator } from "./validator/RegistrationFormValidator";
import Input from "../../../shared/component/Input";
import Icon from "../../../shared/component/Icon";
import bcrypt from "bcryptjs";
import { setLoggedUser } from "../../../redux/authSlice";
import { setUsers } from "../../../redux/usersSlice";
import { useDispatch } from "react-redux";
import { addToDatabase, getFromDatabase } from "../../../api/apiRequest";

export default function RegistrationForm() {
  const [allUsers, setAllUsers] = useState([]);
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

  const onSubmit = async (data) => {
    try {
      const usersFromDatabase = await getFromDatabase("users");
      const usersFields = usersFromDatabase.map((item) => item.fields);
      setAllUsers(usersFields);
      dispatch(setUsers(usersFields));
      if (role === null) {
        return;
      }
      const existingUser = allUsers.find(
        (user) => user.email === data.email
      );

      if (existingUser) {
        setError(true);
      } else {
        setError(false);

        data.role = role;

        const saltRounds = 10;
        const hash = await bcrypt.hash(data.password, saltRounds);

        data.password = hash;
        data.confirmPassword = hash;

        const updatedUsers = [...allUsers, data];
        setUsers(updatedUsers);
        const updateObj = 
          {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            role: data.role,
            password: data.password,
          }
        ;

        // Chiamare la funzione con l'oggetto creato
        await addToDatabase("users", updateObj);
        dispatch(setLoggedUser(data));
        navigate("/");
      }
    } catch (error) {
      console.error(
        "Errore durante il recupero degli utenti dal database:",
        error
      );
      // Gestisci l'errore in base alle tue esigenze.
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex space-x-4">
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
