import AppName from "../../shared/component/AppName";
import DeleteAccountForm from "./form/DeleteAccountForm";
export default function DeleteAccount() {
  return (
    <div>
      <AppName />
      <div>
        <p className="pt-4 pb-6">Do you really want to delete your account?</p>
        <DeleteAccountForm />
      </div>
    </div>
  );
}
