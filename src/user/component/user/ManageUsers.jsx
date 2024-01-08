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

  const loggedUserFollowing = users && users.filter((user) =>
    followingIds.includes(user.id)
  );

  const followersIds = followers
    ? followers
      .filter((item) => item.idTo?.includes(loggedUser.id))
      .map((item) => item.idFrom)
      .flat()
    : [];

  const loggedUserFollowers = users && users.filter((user) =>
    followersIds.includes(user.id)
  );

  const handlePriorityPopup = () => {
    setPriorityPopupIsOpen(!PriorityPopupIsOpen);
  };

  return (
    <div className="relative h-40 py-4 bg-white w-full p-3 rounded-lg shadow-xl">
    <div className="w-full flex flex-col items-center">
      <div className="flex justify-around w-full space-x-8 text-lg font-semibold">
        <div className="flex flex-col items-center space-y-1">
          <span className="text-slate-600">Following</span>
          <span className="text-black">{followingIds.length}</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span className="text-slate-600">Followers</span>
          <span className="text-black">{followersIds.length}</span>
        </div>
      </div>
      <div className="absolute bottom-2">
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
