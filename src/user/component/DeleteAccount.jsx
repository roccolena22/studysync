import AppName from "../../shared/component/AppName";
import Message from "../../shared/component/Message";
import DeleteAccountForm from "./form/DeleteAccountForm";

export default function DeleteAccount() {
  return (
    <>
      <AppName name="StudySync" />
        <div className="pb-6">
          <Message text="Do you really want to delete your account?" />
        </div>
        <DeleteAccountForm />
    </>
  );
}
