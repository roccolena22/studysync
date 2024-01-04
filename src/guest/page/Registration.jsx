import RegistrationForm from "../component/Form/RegistrationForm";
import AppName from "../../shared/component/AppName";
import FullPageContainer from "../component/FullPageContainer";

export default function Registration() {
  return (
    <FullPageContainer>
      <div className="pb-4">
        <AppName name="StudySync" />
      </div>
      <RegistrationForm />
    </FullPageContainer>
  );
}
