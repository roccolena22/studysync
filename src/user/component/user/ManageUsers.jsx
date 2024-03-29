import { useEffect, useState } from "react";
import FollowerAndFollowedLists from "./FollowerAndFollowedLists";
import PriorityPopup from "../shared/PriorityPopup";
import { useDispatch, useSelector } from "react-redux";
import { fetchFollowers } from "../../Utilities/fetchFunctions";

export default function ManageUsers() {
  const loggedUser = useSelector((state) => state.auth.user);
  const followers = useSelector((state) => state.followers);
  const [PriorityPopupIsOpen, setPriorityPopupIsOpen] = useState(false);
  const [indexClicked, setIndexClicked] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchFollowers(dispatch);
  }, []);

  const followingIds = followers
    ? followers
        .filter((item) => item.idFrom?.includes(loggedUser.id))
        .map((item) => item.idTo)
        .flat()
    : [];

  const followersIds = followers
    ? followers
        .filter((item) => item.idTo?.includes(loggedUser.id))
        .map((item) => item.idFrom)
        .flat()
    : [];

  const handlePriorityPopup = (index) => {
    setPriorityPopupIsOpen(!PriorityPopupIsOpen);
    setIndexClicked(index);
  };
  return (
    <div className="w-full flex items-center bg-white rounded-lg shadow-xl py-2 sm:py-0 space-x-4">
      <div className="flex justify-around w-full text-lg font-semibold items-center">
        <div
          className="flex flex-col items-center space-y-1 bg-gray-50 shadow-xl hover:border hover:border-cyan-700 rounded-lg p-2 sm:p-4 cursor-pointer"
          onClick={() => handlePriorityPopup(0)}
        >
          <span className="text-gray-600">Following</span>
          <span>{followingIds.length}</span>
        </div>
        <div
          className="flex flex-col items-center space-y-1 bg-gray-50 shadow-xl hover:border hover:border-cyan-700 rounded-lg p-2 sm:p-4 cursor-pointer"
          onClick={() => handlePriorityPopup(1)}
        >
          <span className="text-gray-600">Followers</span>
          <span>{followersIds.length}</span>
        </div>
      </div>

      {PriorityPopupIsOpen && (
        <PriorityPopup handleClose={handlePriorityPopup}>
          <FollowerAndFollowedLists
            indexClicked={indexClicked}
            followersIds={followersIds}
            followingIds={followingIds}
          />
        </PriorityPopup>
      )}
    </div>
  );
}
