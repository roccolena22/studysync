import RegistrationForm from "../component/Form/RegistrationForm";
import AppName from "../../shared/component/AppName";
import GuestPageContainer from "../component/GuestPageContainer";

export default function Registration() {
  return (
    <GuestPageContainer>
        <AppName name="StudySync" />
      <RegistrationForm />
    </GuestPageContainer>
  );
}
