import { useDispatch, useSelector } from "react-redux";
import Button from "../../../shared/component/Button";
import { addRecordToDatabase, deleteRecordFromDatabase, getListFromDatabase } from "../../../api/apiRequest";
import { setUsers } from "../../../redux/slices/usersSlice";
import { setLoggedUser } from "../../../redux/slices/authSlice";
import { fetchFollowers, fetchUsers } from "../../Utilities/fetchFunctions";


export default function FollowAndUnfollowButtons({
  user,
}) {
  const users = useSelector((state) => state.users);
  const logged = useSelector((state) => state.auth.user);

  const loggedUser = users.find(user => user.id === logged.id);  const followers = useSelector((state) => state.followers);
  const isLoggedUser = loggedUser.id === user.id;

  const dispatch = useDispatch()

  const toggleFollow = async (userId, isAdding) => {
    try {
      const currentRecord = isAdding
        ? { idFrom: [loggedUser.id], idTo: [userId] }
        : followers?.find(
            (item) =>
              item?.idTo?.[0] === userId && item.idFrom[0] === loggedUser.id
          );
      if (isAdding) {
        await addRecordToDatabase("followers", currentRecord);
      } else if (currentRecord?.id) {
        await deleteRecordFromDatabase("followers", currentRecord.id);
      }
      fetchFollowers?.(dispatch);
      fetchUsers(dispatch)
    } catch (error) {
      console.error(
        `Error ${isAdding ? "adding" : "removing"} follower`,
        error
      );
    }
  };

  const isFollowed =
    user.followersIds &&
    loggedUser.followingIds &&
    loggedUser.followingIds.some((element) =>
      user.followersIds.includes(element)
    );

  return (
    <>
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
    </>
  );
}
