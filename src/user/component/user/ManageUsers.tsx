import { useEffect, useState } from "react";
import FollowerAndFollowedLists from "./FollowerAndFollowedLists";
import PriorityPopup from "../shared/PriorityPopup";
import { DefaultColor, TabelName } from "../../../shared/models";
import { useSelector } from "react-redux";
import { getFollowerRecordsByLinkedField } from "../../../api/apiFollowers";
import { Follower, User } from "../../models";

export default function ManageUsers(): JSX.Element {
  const loggedUser = useSelector((state: any) => state.auth.user) as User;

  const [priorityPopupIsOpen, setPriorityPopupIsOpen] = useState(false);
  const [indexClicked, setIndexClicked] = useState(0);

  const [following, setFollowing] = useState<Follower[]>([]);
  const [followers, setFollowers] = useState<Follower[]>([]);

  useEffect(() => {
    const fetchFollowData = async () => {
      try {
        const following = await getFollowerRecordsByLinkedField(
          "idFrom",
          loggedUser.id
        );

        const followers = await getFollowerRecordsByLinkedField(
          "idTo",
          loggedUser.id
        );

        setFollowing(following);
        setFollowers(followers);
      } catch (error) {
        console.error("Errore durante il fetch di follower/following:", error);
      }
    };

    if (loggedUser?.id) {
      fetchFollowData();
    }
  }, [loggedUser?.id]);

  const handlePriorityPopup = (index?: number) => {
    setPriorityPopupIsOpen(!priorityPopupIsOpen);
    if (typeof index === "number") {
      setIndexClicked(index);
    }
  };

  return (
<div className={`w-full flex items-center ${DefaultColor.BG_SECONDARY_COLOR} rounded-lg shadow-xl py-2 sm:py-0 space-x-4`}>
      <div className="flex justify-around w-full text-lg font-semibold items-center">
        <div
          className={`flex flex-col items-center space-y-1 bg-slate-50 shadow-xl hover:border hover:brightness-110 rounded-lg p-2 sm:p-4 cursor-pointer`}
          onClick={() => handlePriorityPopup(0)}
        >
          <span className="text-slate-600">Following</span>
          <span>{following.length}</span>
        </div>
        <div
          className={`flex flex-col items-center space-y-1 bg-slate-50 shadow-xl hover:border hover:brightness-110 rounded-lg p-2 sm:p-4 cursor-pointer`}
          onClick={() => handlePriorityPopup(1)}
        >
          <span className="text-slate-600">Followers</span>
          <span>{followers.length}</span>
        </div>
      </div>

      {priorityPopupIsOpen && (
        <PriorityPopup handleClose={handlePriorityPopup}>
          <FollowerAndFollowedLists
            indexClicked={indexClicked}
            followers={followers}
            following={following}
          />
        </PriorityPopup>
      )}
    </div>
  );
}
