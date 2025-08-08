import { useState, useEffect } from "react";
import PriorityPopup from "./shared/PriorityPopup";
import DeleteAccount from "./DeleteAccount";
import EditPasswordForm from "./form/EditPasswordForm";
import Title from "./shared/Title";
import PasswordRequirement from "../../shared/component/PasswordRequirements";
import { User } from "../models";
import { getUserByField } from "../../api/apiUsers";
import ProfileInfoForm from "./form/ProfileInfoFrom";

interface AccountContentContainerProps {
  loggedUserId: string;
}

export default function AccountContentContainer({
  loggedUserId,
}: AccountContentContainerProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const user = await getUserByField("id", loggedUserId);
      setLoggedUser(user);
    }
    fetchUser();
  }, [loggedUserId]);

  const handleClose = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="pt-6 w-full flex flex-col justify-center">
      {loggedUser && (
        <>
          <ProfileInfoForm
            loggedUser={loggedUser}
            onUserUpdated={setLoggedUser} // passiamo la funzione per aggiornare i dati
          />

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
        </>
      )}
    </div>
  );
}
