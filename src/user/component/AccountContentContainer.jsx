import { useState } from "react";
import ProfileInfoForm from "./form/ProfileInfoFrom";
import PriorityPopup from "./shared/PriorityPopup";
import DeleteAccount from "./DeleteAccount";
import EditPasswordForm from "./form/EditPasswordForm";
import Title from "./shared/Title";
import { useSelector } from "react-redux";

export default function AccountContentContainer() {
  const loggedUser = useSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
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
        <p
          className="text-red-800 font-semibold cursor-pointer pt-20 text-center"
          onClick={handleClose}
        >
          Delete Account
        </p>
        {isOpen && (
          <PriorityPopup handleClose={handleClose}>
            <DeleteAccount loggedUser={loggedUser} />
          </PriorityPopup>
        )}
      </div>
    </div>
  );
}
