import LoginForm from "../component/Form/LoginForm";
import AppName from "../../shared/component/AppName";
import GuestPageContainer from "../component/GuestPageContainer";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <GuestPageContainer>
      <AppName name="StudySync" />
      <LoginForm />
      <Link to="/recovery-password" className="text-xs text-cyan-700 text-center">
        <p className="pb-2">Did you forget your password?</p>
      </Link>
    </GuestPageContainer>
  );
}
