import AppName from "../../shared/component/AppName";
import RecoveryPasswordForm from "../component/Form/RecoveryPasswordForm";
import GuestContainer from "../component/GuestContainer";

export default function RecoveryPassword() {
  return (
    <GuestContainer>
      <AppName />
      <RecoveryPasswordForm />
      <p className="text-xs pt-3 text-zinc-400 text-center">
        If the email is correct, you will receive a link to reset your
        password
      </p>
    </GuestContainer>
  );
}
