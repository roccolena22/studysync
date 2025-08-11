import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AccountInfoValidator } from "./validator/AccountInfoValidator";
import Button from "../../../shared/component/Button";
import Input from "../../../shared/component/Input";
import AlertBanner from "../../../shared/component/AlertBanner";
import { updateUser, getUser } from "../../../api/apiUsers";
import { AlertTypes } from "../../../shared/models";
import { User } from "../../models";

interface AccountInfoFormProps {
  loggedUser: User;
  onUserUpdated: (user: User) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

export default function AccountInfoForm({
  loggedUser,
  onUserUpdated,
}: AccountInfoFormProps): JSX.Element {
  const [showUpdatedAlert, setShowUpdatedAlert] = useState<boolean>(false);

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
    resolver: yupResolver(AccountInfoValidator),
    defaultValues: {
      firstName: loggedUser.firstName,
      lastName: loggedUser.lastName,
      email: loggedUser.email,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const recordUpdated = await updateUser(loggedUser.id, data);

    if (recordUpdated) {
      handleUpdatingAlert();

      const freshData = await getUser(loggedUser.id);
      onUserUpdated({ id: loggedUser.id, ...freshData });
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
          <Button small type="submit" label="Save" />
        </div>
      </div>
      {showUpdatedAlert && (
        <AlertBanner text="Edit Successful" type={AlertTypes.SUCCESS} />
      )}
    </form>
  );
}
