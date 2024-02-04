import LoginForm from "../component/Form/LoginForm";
import AppName from "../../shared/component/AppName";
import GuestPageContainer from "../component/GuestPageContainer";
import { Link } from "react-router-dom";
import Message from "../../shared/component/Message";

export default function LoginPage() {
  return (
    <GuestPageContainer>
      <AppName name="StudySync" />
      <LoginForm />
      <Link to="/recovery-password">
        <div className="pb-2">
          <Message text="Did you forget your password?" type="highlighted" />
        </div>
      </Link>
    </GuestPageContainer>
  );
}
