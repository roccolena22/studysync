import { useState } from "react";
import Popup from "../shared/Popup";
import Button from "../../../shared/component/Button";
import UsersList from "./UserList";

export default function DiscoverUsers({
  loggedUser,
  users,
  addFollowers,
  removeFollow,
}) {
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  const handlePopup = () => {
    setPopupIsOpen(!popupIsOpen);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-between items-center">
        <p className="text-lg pb-4 font-bold text-rose-600">
          Discover new users to follow
        </p>
        <Button
          name="Discover"
          outline
          large
          className="bg-rose-500 text-white hover:bg-rose-600 hover:border-rose-600"
          onClick={handlePopup}
        />
      </div>

      {popupIsOpen && (
        <Popup handleClose={handlePopup} title="Search among StudySync users">
          <UsersList
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
