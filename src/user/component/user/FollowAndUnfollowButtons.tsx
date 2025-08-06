import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../shared/component/Button";
import {
  addRecordToDatabase,
  deleteRecordFromDatabase,
} from "../../../api/apiRequest";
import { fetchFollowers } from "../../Utilities/fetchFunctions";
import { TabelName } from "../../../shared/models";

interface User {
  id: string;
  [key: string]: any;
}

interface Follower {
  id?: string;
  idFrom: string[];
  idTo: string[];
  [key: string]: any;
}

interface RootState {
  auth: {
    user: User,
  };
  followers: Follower[];
}

interface FollowAndUnfollowButtonsProps {
  user: User;
}

export default function FollowAndUnfollowButtons({
  user,
}: FollowAndUnfollowButtonsProps): JSX.Element {
  const [isFollowed, setIsFollowed] = useState(false);
  const loggedUser = useSelector((state: RootState) => state.auth.user);
  const followers = useSelector((state: RootState) => state.followers);
  const isLoggedUser = loggedUser.id === user.id;

  const dispatch = useDispatch();

  const toggleFollow = async (userId: string, isAdding: boolean) => {
    try {
      const currentRecord = isAdding
        ? { idFrom: [loggedUser.id], idTo: [userId] }
        : followers?.find(
            (item) =>
              item.idTo[0] === userId && item.idFrom[0] === loggedUser.id
          );
      if (isAdding) {
        await addRecordToDatabase(TabelName.FOLLOWERS, currentRecord);
      } else if (currentRecord?.id) {
        await deleteRecordFromDatabase(TabelName.FOLLOWERS, currentRecord.id);
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
    <div>
      {!isLoggedUser &&
        (isFollowed ? (
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
