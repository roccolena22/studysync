import LoginForm from "../component/Form/LoginForm";
import AppName from "../../shared/component/AppName";
import FullPageContainer from "../component/FullPageContainer";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <FullPageContainer>
      <AppName name="StudySync" />
      <LoginForm />
      <Link to="/recovery-password" className="text-xs text-cyan-700 text-center">
        <p className="pb-2">Did you forget your password?</p>
      </Link>
    </FullPageContainer>
  );
}
