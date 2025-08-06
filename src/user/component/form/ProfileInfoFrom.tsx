import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserInfoValidator } from "./validator/UserInfoValidator";

import Button from "../../../shared/component/Button";
import Input from "../../../shared/component/Input";
import AlertBanner from "../../../shared/component/AlertBanner";

import { updateDatabaseRecord } from "../../../api/apiRequest";
import { fetchUsers } from "../../Utilities/fetchFunctions";
import { AlertTypes, TabelName } from "../../../shared/models";

// Tipi
interface LoggedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Props {
  loggedUser: LoggedUser;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

export default function ProfileInfoForm({ loggedUser }: Props): JSX.Element {
 const [showUpdatedAlert, setShowUpdatedAlert] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleUpdatingAlert = () => {
    setShowUpdatedAlert(true);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
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
  } = useForm<FormData>({
    resolver: yupResolver(UserInfoValidator),
    defaultValues: {
      firstName: loggedUser.firstName,
      lastName: loggedUser.lastName,
      email: loggedUser.email,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const recordUpdated = await updateDatabaseRecord(
      TabelName.USERS,
      loggedUser.id,
      data
    );
    if (recordUpdated) {
      handleUpdatingAlert();
      fetchUsers(dispatch);
    }
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
            placeholder="Enter your last name"
            register={register("lastName")}
            errorMessage={errors.lastName?.message}
          />
        </div>
        <Input
          label="Email"
          placeholder="Enter your Email"
          register={register("email")}
          errorMessage={errors.email?.message}
        />
        <div className="flex justify-end py-4">
          <Button small type="submit" name="Save" />
        </div>
      </div>
      {showUpdatedAlert && (
        <AlertBanner text="Edit Successful" type={AlertTypes.SUCCESS} />
      )}
    </form>
  );
}
