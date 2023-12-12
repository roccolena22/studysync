import AppName from "../../shared/component/AppName";
import DeleteAccountForm from "./form/DeleteAccountForm";
import Alert from "./shared/Alert";
export default function DeleteAccount({loggedUser}) {
  return (
    <div>
      <AppName />
      <div>
        <p className="pb-6">Do you really want to delete your account?</p>
        <DeleteAccountForm loggedUser={loggedUser}/>
      </div>
    </div>
  );
}
