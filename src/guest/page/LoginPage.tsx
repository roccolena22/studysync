import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginForm from "../component/Form/LoginForm";
import AppName from "../../shared/component/AppName";
import GuestPageContainer from "../component/GuestPageContainer";
import Message from "../../shared/component/Message";
import commonTranslations from "../../shared/translations/commonTranslations";
import guestTranslations from "../translations/guestTranslations";
import { DefaultColor, MessageTypes } from "../../shared/models";
import Loader from "../../shared/component/Loader";;

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLoginSuccess = () => {
    navigate("/studysync/");
  };

  return (
    <GuestPageContainer>
      <AppName name={commonTranslations.appName} />
      {loading ? (
        <Loader color={DefaultColor.TEXT_PRIMARY_COLOR} />
      ) : (
        <>
          <LoginForm
            onLoginSuccess={handleLoginSuccess}
            onLoadingChange={setLoading}
          />
          <Link to="/studysync/recovery-password">
            <div className="pb-2">
              <Message
                text={guestTranslations.login.recoveryPasswordButton}
                type={MessageTypes.HIGHLIGHTED}
              />
            </div>
          </Link>
        </>
      )}
    </GuestPageContainer>
  );
}
