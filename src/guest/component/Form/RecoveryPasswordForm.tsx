import Input from "../../../shared/component/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../../../shared/component/Button";
import guestTranslations from "../../translations/guestTranslations";
import * as yup from "yup";
import { useState } from "react";
import Message from "../../../shared/component/Message"; // se già esiste
import { MessageTypes } from "../../../shared/models";

interface RecoveryPasswordFormData {
  email: string;
}

const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

export default function RecoveryPasswordForm(): JSX.Element {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RecoveryPasswordFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<RecoveryPasswordFormData> = async (data) => {
    try {
      // Simula richiesta API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Recovery email sent to:", data.email);
      setSuccessMessage("A recovery link has been sent to your email.");
      setErrorMessage(null);
      reset();
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again.");
      setSuccessMessage(null);
    }
  };

  return (
    <div className="py-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={guestTranslations.recoveryPassword.email.label}
          type="email"
          errorMessage={errors.email?.message}
          register={register("email")}
        />
        {successMessage && <Message type={MessageTypes.DEFAULT} text={successMessage} />}
        {errorMessage && <Message type={MessageTypes.ERROR} text={errorMessage} />}
        <div className="flex flex-col items-center py-4">
          <Button
            type="submit"
            name={
              isSubmitting
                ? guestTranslations.recoveryPassword.loading
                : guestTranslations.recoveryPassword.sendButton
            }
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}
