import AppName from "../../shared/component/AppName";
import Message from "../../shared/component/Message";
import DeleteAccountForm from "./form/DeleteAccountForm";
export default function DeleteAccount({ loggedUser }) {
  return (
    <>
      <AppName name="StudySync" />
      <div>
        <div className="pb-6">
          <Message text="Do you really want to delete your account?"/>
        </div>
        <DeleteAccountForm loggedUser={loggedUser} />
      </div>
    </>
  );
}
