import Button from "../../../shared/component/Button";
import Input from "../../../shared/component/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { DeleteFormValidator } from "./validator/DeleteFormValidator";
import Icon from "../../../shared/component/Icon";

export default function DeleteAccountForm() {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(DeleteFormValidator),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full">
        <Input
          label="Explain to us why"
          placeholder="Enter your reasons"
          register={register("reasons")}
          errorMessage={errors.email?.message}
        />
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          register={register("password")}
          errorMessage={errors.password?.message}
          placeholder="Enter your password"
        >
          {showPassword ? (
            <Icon name="eyeInvisible" onClick={handleShowPassword} />
          ) : (
            <Icon name="eye" onClick={handleShowPassword} />
          )}
        </Input>
      </div>
      <div className="flex justify-end pt-10">
        <Button name="Delete account" />
      </div>
    </form>
  );
}
