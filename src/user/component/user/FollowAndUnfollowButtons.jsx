import { useDispatch, useSelector } from "react-redux";
import Button from "../../../shared/component/Button";
import {
  addRecordToDatabase,
  deleteRecordFromDatabase,
} from "../../../api/apiRequest";
import { fetchFollowers } from "../../Utilities/fetchFunctions";
import { useEffect, useState } from "react";

export default function FollowAndUnfollowButtons({ user }) {
  const [isFollowed, setIsFollowed] = useState(false);
  const loggedUser = useSelector((state) => state.auth.user);
  const followers = useSelector((state) => state.followers);
  const isLoggedUser = loggedUser.id === user.id;

  const dispatch = useDispatch();

  const toggleFollow = async (userId, isAdding) => {
    try {
      const currentRecord = isAdding
        ? { idFrom: [loggedUser.id], idTo: [userId] }
        : followers?.find(
            (item) =>
              item.idTo[0] === userId && item.idFrom[0] === loggedUser.id
          );
      if (isAdding) {
        await addRecordToDatabase("followers", currentRecord);
      } else if (currentRecord?.id) {
        await deleteRecordFromDatabase("followers", currentRecord.id);
      }
      fetchFollowers(dispatch);
    } catch (error) {
      console.error(
        `Error ${isAdding ? "adding" : "removing"} follower`,
        error
      );
    }
  };

  useEffect(() => {
    const follow = followers.find(
      (item) => item.idTo[0] === user.id && item.idFrom[0] === loggedUser.id
    );
    setIsFollowed(!!follow);
  }, [followers, user.id, loggedUser.id]);

  return (
    <div data-testid="follow-and-unfollow-buttons">
      {!isLoggedUser &&
        (isFollowed === true ? (
          <Button
            small
            outline
            onClick={() => toggleFollow(user.id, false)}
            name="Unfollow"
          />
        ) : (
          <Button
            small
            onClick={() => toggleFollow(user.id, true)}
            name="Follow"
          />
        ))}
    </div>
  );
}
