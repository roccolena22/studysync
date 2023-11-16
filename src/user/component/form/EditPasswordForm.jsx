import { useState } from "react";
import Button from "../../../shared/component/Button";
import Icon from "../../../shared/component/Icon";
import Input from "../../../shared/component/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function EditPasswordForm() {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const {
        handleSubmit,
        formState: { errors },
        register,
      } = useForm({
        resolver: yupResolver(),
       
      });
    
      const onSubmit = (data) => {
        console.log(data);
      };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex space-x-4">
        <Input
          label="Current Password"
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

        <Input
          label="New Password"
          type={showPassword ? "text" : "password"}
          register={register("password")}
          errorMessage={errors.password?.message}
          placeholder="Choose a new password"
        >
          {showPassword ? (
            <Icon name="eyeInvisible" onClick={handleShowPassword} />
          ) : (
            <Icon name="eye" onClick={handleShowPassword} />
          )}
        </Input>
      </div>
      <div className="flex justify-end">
        <Button name="Edit password" />
      </div>
    </form>
  );
}
