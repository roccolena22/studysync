import LoginForm from "../component/Form/LoginForm";
import AppName from "../../shared/component/AppName";
import GuestPageContainer from "../component/GuestPageContainer";
import InternalLink from "../../shared/component/InternalLink";

export default function LoginPage() {
  return (
    <GuestPageContainer>
      <AppName name="StudySync" />
      <LoginForm />
      <InternalLink
        path="/recovery-password"
        text="Did you forget your password?"
      />
    </GuestPageContainer>
  );
}
