import { useState } from "react";
import Popup from "../shared/Popup";
import Button from "../../../shared/component/Button";
import UsersList from "./UserList";

export default function DiscoverUsers({
  loggedUser,
  users,
  addFollowers,
  removeFollow,
  followers
}) {
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  const handlePopup = () => {
    setPopupIsOpen(!popupIsOpen);
  };

  return (
    <>
    <div className="relative h-24">
    <div className="w-full flex flex-col justify-between items-center">
        <p className="sm:text-lg font-semibold text-center">
          Discover new users to follow
        </p>
        <div className="absolute bottom-0">
        <Button
          name="Discover"
          outline
          large
          onClick={handlePopup}
        />
        </div>
      </div>
    </div>
     

      {popupIsOpen && (
        <Popup handleClose={handlePopup} title="Search among StudySync users">
          <UsersList
          followers={followers}
            users={users}
            loggedUser={loggedUser}
            addFollowers={addFollowers}
            removeFollow={removeFollow}
            excludeLogged
          />
        </Popup>
      )}
    </>
  );
}
