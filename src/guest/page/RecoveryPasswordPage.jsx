import { Link } from "react-router-dom";
import AppName from "../../shared/component/AppName";
import Icon from "../../shared/component/Icon";
import RecoveryPasswordForm from "../component/Form/RecoveryPasswordForm";
import GuestPageContainer from "../component/GuestPageContainer";
import Message from "../../shared/component/Message";

export default function RecoveryPasswordPage() {
  return (
    <GuestPageContainer>
      <div className="flex justify-between items-center">
        <AppName name="StudySync" />
        <Link to="/studysync/login">
          <Icon name="back" />
        </Link>
      </div>
      <RecoveryPasswordForm />
      <Message text="If the email is correct, you will receive a link to reset your password" />
    </GuestPageContainer>
  );
}
