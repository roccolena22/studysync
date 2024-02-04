import Button from "../../../shared/component/Button";
import Input from "../../../shared/component/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserInfoValidator } from "./validator/UserInfoValidator";
import {
  updateDatabaseRecord,
} from "../../../api/apiRequest";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUsers } from "../../Utilities/fetchFunctions";
import AlertBanner from "../../../shared/component/AlertBanner";

export default function ProfileInfoForm({ loggedUser }) {
  const [showUpdatedAlert, setShowUpdatedAlert] = useState(false);

  const handleUpdatingAlert = () => {
    setShowUpdatedAlert(!showUpdatedAlert);
  };

  useEffect(() => {
    let timeoutId;

    if (showUpdatedAlert) {
      timeoutId = setTimeout(() => {
        setShowUpdatedAlert(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [showUpdatedAlert]);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(UserInfoValidator),
    defaultValues: {
      firstName: loggedUser.firstName,
      lastName: loggedUser.lastName,
      email: loggedUser.email,
    },
  });

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const recordUpdated = await updateDatabaseRecord(
      "users",
      loggedUser.id,
      data
    );
    recordUpdated && handleUpdatingAlert();
    fetchUsers(dispatch)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full">
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <Input
            label="Name"
            placeholder="Enter your first name"
            register={register("firstName")}
            errorMessage={errors.firstName?.message}
          />
          <Input
            label="Surname"
            placeholder="Enter your first surname"
            register={register("lastName")}
            errorMessage={errors.lastName?.message}
          />
        </div>
        <Input
          label="E-mail"
          placeholder="Enter your E-mail"
          register={register("email")}
          errorMessage={errors.email?.message}
        />
        <div className="flex justify-end py-4">
          <Button small type="submit" name="Save" />
        </div>
      </div>
      {showUpdatedAlert && (
        <AlertBanner text="Edit Successful" type="success" />
      )}
    </form>
  );
}
