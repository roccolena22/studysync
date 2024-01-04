import RegistrationForm from "../component/Form/RegistrationForm";
import AppName from "../../shared/component/AppName";
import GuestContainer from "../component/GuestContainer";

export default function Registration() {
  return (
    <GuestContainer>
      <div className="pb-4">
        <AppName name="StudySync" />
      </div>
      <RegistrationForm />
    </GuestContainer>
  );
}
