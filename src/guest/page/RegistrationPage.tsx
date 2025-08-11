import { useState } from "react";
import RegistrationForm from "../component/Form/RegistrationForm";
import AppName from "../../shared/component/AppName";
import GuestPageContainer from "../component/GuestPageContainer";
import commonTranslations from "../../shared/translations/commonTranslations";
import Loader from "../../shared/component/Loader";
import { DefaultColor } from "../../shared/models";

export default function RegistrationPage(): JSX.Element {
  const [loading, setLoading] = useState(false);

  return (
    <GuestPageContainer>
      <AppName name={commonTranslations.appName} />
      {loading ? (
        <div className="flex justify-center py-6">
          <Loader
            color={DefaultColor.TEXT_PRIMARY_COLOR}
          />
        </div>
      ): <RegistrationForm onLoadingChange={setLoading} />
      }
      
    </GuestPageContainer>
  );
}
