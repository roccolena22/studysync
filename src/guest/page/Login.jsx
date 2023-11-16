import LoginForm from "../component/Form/LoginForm";
import AppName from "../../shared/component/AppName";
import GuestContainer from "../component/GuestContainer";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <GuestContainer>
        <AppName  />
      <LoginForm />
      <Link to="/recovery-password" className="text-xs text-rose-500 text-center">
        <p>Did you forget your password?</p>
      </Link>
    </GuestContainer>
  );
}
