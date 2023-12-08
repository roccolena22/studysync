import { useState } from "react";
import Button from "../../../shared/component/Button";
import Popup from "../shared/Popup";
import FollowerAndFollowed from "./FollowerAndFolowed";

export default function ManageUsers({
  users,
  loggedUser,
  followers,
  addFollowers,
  removeFollow,
}) {
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  const userConnections = followers.flat();

  const followingIds = userConnections
    .filter((user) => user.idFrom === loggedUser.id)
    .map((user) => user.idTo);

  const followersIds = userConnections
    .filter((user) => user.idTo === loggedUser.id)
    .map((user) => user.idFrom);

  const loggedUserFollowing = users.filter((user) =>
    followingIds.includes(user.id)
  );
  const loggedUserFollowers = users.filter((user) =>
    followersIds.includes(user.id)
  );

  const handlePopup = () => {
    setPopupIsOpen(!popupIsOpen);
  };

  return (
    <div className="relative h-24">
      <div className="w-full flex flex-col items-center">
        <div className="flex justify-around w-full space-x-2 sm:text-lg font-semibold">
          <div className="space-x-1">
            <span>Following:</span>
            <span>{followingIds.length}</span>
          </div>
          <div className="space-x-1">
            <span>Followers:</span>
            <span>{followersIds.length}</span>
          </div>
        </div>
        <div className="absolute bottom-0">
          <Button
            name="Manage"
            outline
            large
            onClick={handlePopup}
          />
        </div>
      </div>

      {popupIsOpen && (
        <Popup handleClose={handlePopup}>
          <FollowerAndFollowed
            following={loggedUserFollowing}
            followers={loggedUserFollowers}
            addFollowers={addFollowers}
            removeFollow={removeFollow}
            loggedUser={loggedUser}
          />
        </Popup>
      )}
    </div>
  );
}
