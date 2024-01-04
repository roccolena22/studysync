import AppName from "../../shared/component/AppName";
import RecoveryPasswordForm from "../component/Form/RecoveryPasswordForm";
import FullPageContainer from "../component/FullPageContainer";

export default function RecoveryPassword() {
  return (
    <FullPageContainer>
      <AppName name="StudySync"/>
      <RecoveryPasswordForm />
      <p className="text-xs py-3 text-slate-400 text-center">
        If the email is correct, you will receive a link to reset your
        password
      </p>
    </FullPageContainer>
  );
}
