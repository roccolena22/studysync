import Button from "../../../shared/component/Button";
import Input from "../../../shared/component/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserInfoValidator } from "./validator/UserInfoValidator";

export default function ProfileInfoForm({ handleUserInfo, infoLoggedUser }) {


  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(UserInfoValidator),
    defaultValues: {
      name: infoLoggedUser.name,
      surname: infoLoggedUser.surname,
      email: infoLoggedUser.email,
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
            register={register("name")}
            errorMessage={errors.name?.message}
          />
          <Input
            label="Surname"
            placeholder="Enter your first surname"
            register={register("surname")}
            errorMessage={errors.surname?.message}
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
