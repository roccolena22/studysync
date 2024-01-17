import Input from "../../../shared/component/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "../../../shared/component/Button";

export default function RecoveryPasswordForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="py-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="E-mail"
          type="email"
          errorMessage={errors.email?.message}
          register={register("email")}
        />
        <div className="flex flex-col items-center py-4">
          <Button type="submit">Get reset link</Button>
        </div>
      </form>
    </div>
  );
}
