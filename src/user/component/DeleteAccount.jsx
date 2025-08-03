import AppName from "../../shared/component/AppName";
import Message from "../../shared/component/Message";
import { MessageTypes } from "../../shared/models";
import commonTranslations from "../../shared/translations/commonTranslations";
import DeleteAccountForm from "./form/DeleteAccountForm";

export default function DeleteAccount() {
  return (
    <>
      <AppName name={commonTranslations.appName} />
      <div className="pb-6">
        <Message
          text="Do you really want to delete your account?"
          type={MessageTypes.HIGHLIGHTED}
        />
      </div>
      <DeleteAccountForm />
    </>
  );
}
