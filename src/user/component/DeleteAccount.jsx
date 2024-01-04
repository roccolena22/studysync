import AppName from "../../shared/component/AppName";
import DeleteAccountForm from "./form/DeleteAccountForm";
export default function DeleteAccount({loggedUser}) {
  return (
    <div>
      <AppName name="StudySync"/>
      <div>
        <p className="pb-6">Do you really want to delete your account?</p>
        <DeleteAccountForm loggedUser={loggedUser}/>
      </div>
    </div>
  );
}
