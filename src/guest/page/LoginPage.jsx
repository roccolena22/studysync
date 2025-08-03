import LoginForm from "../component/Form/LoginForm";
import AppName from "../../shared/component/AppName";
import GuestPageContainer from "../component/GuestPageContainer";
import { Link } from "react-router-dom";
import Message from "../../shared/component/Message";
import commonTranslations from "../../shared/translations/commonTranslations";
import guestTranslations from "../translations/guestTranslations";

export default function LoginPage() {
  return (
    <GuestPageContainer>
      <AppName name={commonTranslations.appName} />
      <LoginForm />
      <Link to="/studysync/recovery-password">
        <div className="pb-2">
          <Message text={guestTranslations.login.recoveryPasswordButton} type="highlighted" />
        </div>
      </Link>
    </GuestPageContainer>
  );
}
