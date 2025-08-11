import React from "react";
import Button from "../../../shared/component/Button";
import { User } from "../../models";
import { useSelector } from "react-redux";

interface FollowAndUnfollowButtonsProps {
  user: User;
  isFollowed: boolean;
  loading?: boolean;
  toggleFollow: (user: User, shouldFollow: boolean) => void;
}

interface RootState {
  auth: {
    user: User;
  };
}

export default function FollowAndUnfollowButtons({
  user,
  isFollowed,
  loading,
  toggleFollow,
}: FollowAndUnfollowButtonsProps): JSX.Element {
  const loggedUser = useSelector((state: RootState) => state.auth.user);
  const isLoggedUser = loggedUser.id === user.id;
  
if (isLoggedUser) return <></>;

  return (
    <div>
      {isFollowed ? (
        <Button
          small
          outline
          onClick={() => toggleFollow(user, false)}
          label={loading ? "Unfollowing..." : "Unfollow"}
          disabled={loading}
        />
      ) : (
        <Button
          small
          onClick={() => toggleFollow(user, true)}
          label={loading ? "Following..." : "Follow"}
          disabled={loading}
        />
      )}
    </div>
  );
}
