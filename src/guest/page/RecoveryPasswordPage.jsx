import { Link } from "react-router-dom";
import AppName from "../../shared/component/AppName";
import Icon from "../../shared/component/Icon";
import RecoveryPasswordForm from "../component/Form/RecoveryPasswordForm";
import GuestPageContainer from "../component/GuestPageContainer";
import Message from "../../shared/component/Message";
import guestTranslations from "../translations/guestTranslations";
import commonTranslations from "../../shared/translations/commonTranslations";

export default function RecoveryPasswordPage() {
  return (
    <GuestPageContainer>
      <div className="flex justify-between items-center">
        <AppName name={commonTranslations.appName} />
        <Link to="/studysync/login">
          <Icon name="back" />
        </Link>
      </div>
      <RecoveryPasswordForm />
      <Message text={guestTranslations.recoveryPassword.infoMessage} />
    </GuestPageContainer>
  );
}
