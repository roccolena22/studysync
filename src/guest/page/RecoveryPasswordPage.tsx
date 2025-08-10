import React from "react";
import { Link } from "react-router-dom";
import AppName from "../../shared/component/AppName";
import Icon from "../../shared/component/Icon";
import RecoveryPasswordForm from "../component/Form/RecoveryPasswordForm";
import GuestPageContainer from "../component/GuestPageContainer";
import Message from "../../shared/component/Message";
import guestTranslations from "../translations/guestTranslations";
import commonTranslations from "../../shared/translations/commonTranslations";

export default function RecoveryPasswordPage(): JSX.Element {
  return (
    <GuestPageContainer>
      {/* Nastro diagonale */}
      <div className="fixed top-45 right-30 z-50 w-48 overflow-visible pointer-events-none">
  <div
    className="bg-red-600 text-white font-bold text-xs text-center uppercase px-6 py-1 3
    transform rotate-45 origin-top-right shadow-lg select-none pointer-events-auto"
    style={{ width: "300px", position: "relative", right: "-40px" }}
  >
    Up coming
  </div>
</div>

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
