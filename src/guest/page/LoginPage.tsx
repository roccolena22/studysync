import LoginForm from "../component/Form/LoginForm";
import AppName from "../../shared/component/AppName";
import GuestPageContainer from "../component/GuestPageContainer";
import { Link } from "react-router-dom";
import Message from "../../shared/component/Message";
import commonTranslations from "../../shared/translations/commonTranslations";
import guestTranslations from "../translations/guestTranslations";
import { MessageTypes } from "../../shared/models";

export default function LoginPage(): JSX.Element {
  return (
    <GuestPageContainer>
      <AppName name={commonTranslations.appName} />
      <LoginForm />
      <Link to="/studysync/recovery-password">
        <div className="pb-2">
          <Message
            text={guestTranslations.login.recoveryPasswordButton}
            type={MessageTypes.HIGHLIGHTED}
          />
        </div>
      </Link>
    </GuestPageContainer>
  );
}
