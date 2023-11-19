import Button from "../../../shared/component/Button";
import Input from "../../../shared/component/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserInfoValidator } from "./validator/UserInfoValidator";

export default function ProfileInfoForm({ handleUserInfo, loggedUser }) {


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

  const onSubmit = (data) => {
    handleUserInfo(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full">
        <div className="flex space-x-4">
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
        <div className="flex justify-end">
          <Button name="Update" />
        </div>
      </div>
    </form>
  );
}
