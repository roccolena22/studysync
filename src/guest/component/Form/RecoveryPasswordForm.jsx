import Input from "../../../shared/component/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "../../../shared/component/Button";
import guestTranslations from "../../translations/guestTranslations";

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
          label={guestTranslations.recoveryPassword.emailLabel}
          type="email"
          errorMessage={errors.email?.message}
          register={register("email")}
        />
        <div className="flex flex-col items-center py-4">
          <Button
            type="submit"
            name={guestTranslations.recoveryPassword.sendButton}
          />
        </div>
      </form>
    </div>
  );
}
