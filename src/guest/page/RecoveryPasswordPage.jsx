import { Link } from "react-router-dom";
import AppName from "../../shared/component/AppName";
import Icon from "../../shared/component/Icon";
import RecoveryPasswordForm from "../component/Form/RecoveryPasswordForm";
import GuestPageContainer from "../component/GuestPageContainer";

export default function RecoveryPasswordPage() {
  return (
    <GuestPageContainer>
      <div className="flex justify-between items-center">
        <AppName name="StudySync" />
        <Link to="/login">
          <Icon name="back" />
        </Link>
      </div>
      <RecoveryPasswordForm />
      <p className="text-xs py-3 text-gray-400 text-center">
        If the email is correct, you will receive a link to reset your password
      </p>
    </GuestPageContainer>
  );
}
