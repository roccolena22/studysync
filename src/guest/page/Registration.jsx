import RegistrationForm from "../component/Form/RegistrationForm";
import AppName from "../../shared/component/AppName";
import GuestPageContainer from "../component/GuestPageContainer";

export default function Registration() {
  return (
    <GuestPageContainer>
      <div className="pb-4">
        <AppName name="StudySync" />
      </div>
      <RegistrationForm />
    </GuestPageContainer>
  );
}
