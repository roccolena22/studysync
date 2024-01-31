import RegistrationForm from "../component/Form/RegistrationForm";
import AppName from "../../shared/component/AppName";
import GuestPageContainer from "../component/GuestPageContainer";
import Slogan from "../component/Slogan";

export default function RegistrationPage() {
  return (
    <GuestPageContainer>
      <AppName name="StudySync" />
      <Slogan
        firstPart="Sync Your Learning with"
        highlightedPart="StudySync"
        secondPart="Build lessons, study sessions, and more together, connecting students and teachers on one smart platform."
      />
      <RegistrationForm />
    </GuestPageContainer>
  );
}
