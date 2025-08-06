import { useState } from "react";
import ProfileInfoForm from "./form/ProfileInfoFrom";
import PriorityPopup from "./shared/PriorityPopup";
import DeleteAccount from "./DeleteAccount";
import EditPasswordForm from "./form/EditPasswordForm";
import Title from "./shared/Title";
import { useSelector } from "react-redux";
import PasswordRequirement from "../../shared/component/PasswordRequirements";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function AccountContentContainer(): JSX.Element {
  const loggedUser = useSelector((state: any) => state.auth.user) as User;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="pt-6 w-full flex flex-col justify-center">
      <ProfileInfoForm loggedUser={loggedUser} />
      <div className="pt-6">
        <Title title="Edit password" />
        <div className="pt-6">
          <EditPasswordForm loggedUser={loggedUser} />
        </div>
        <PasswordRequirement />
        <p
          className="text-red-800 font-semibold cursor-pointer pt-20 text-center"
          onClick={handleClose}
        >
          Delete Account
        </p>
        {isOpen && (
          <PriorityPopup handleClose={handleClose}>
            <DeleteAccount />
          </PriorityPopup>
        )}
      </div>
    </div>
  );
}
