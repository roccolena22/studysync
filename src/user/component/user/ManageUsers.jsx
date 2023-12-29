import { useState } from "react";
import Button from "../../../shared/component/Button";
import PriorityPopup from "../shared/PriorityPopup";
import FollowerAndFollowed from "./FollowerAndFolowed";

export default function ManageUsers({
  users,
  loggedUser,
  followers,
}) {
  const [PriorityPopupIsOpen, setPriorityPopupIsOpen] = useState(false);

  const followingIds = followers
    ? followers
      .filter((item) => item.idFrom?.includes(loggedUser.id))
      .map((item) => item.idTo)
      .flat()
    : [];

  const loggedUserFollowing = users.filter((user) =>
    followingIds.includes(user.id)
  );

  const followersIds = followers
    ? followers
      .filter((item) => item.idTo?.includes(loggedUser.id))
      .map((item) => item.idFrom)
      .flat()
    : [];

  const loggedUserFollowers = users.filter((user) =>
    followersIds.includes(user.id)
  );

  const handlePriorityPopup = () => {
    setPriorityPopupIsOpen(!PriorityPopupIsOpen);
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
          <Button name="Manage" outline large onClick={handlePriorityPopup} />
        </div>
      </div>

      {PriorityPopupIsOpen && (
        <PriorityPopup handleClose={handlePriorityPopup}>
          <FollowerAndFollowed
            loggedUserFollowing={loggedUserFollowing}
            loggedUserFollowers={loggedUserFollowers}
            loggedUser={loggedUser}
          />
        </PriorityPopup>
      )}
    </div>
  );
}
