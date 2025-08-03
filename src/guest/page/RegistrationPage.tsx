import RegistrationForm from "../component/Form/RegistrationForm";
import AppName from "../../shared/component/AppName";
import GuestPageContainer from "../component/GuestPageContainer";
import commonTranslations from "../../shared/translations/commonTranslations";

export default function RegistrationPage(): JSX.Element {
  return (
    <GuestPageContainer>
      <AppName name={commonTranslations.appName} />
      <RegistrationForm />
    </GuestPageContainer>
  );
}
