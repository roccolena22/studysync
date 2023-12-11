import React from "react";
import Button from "../../../shared/component/Button";
import Badge from "../Badge";

export default function SingleUser({
  user,
  addFollowers,
  removeFollow,
  loggedUser,
}) {
  const isNotFollowed = loggedUser.followingIds.some(
    (follower) => follower.id === user.followersIds
  );

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between items-center border-b border-zinc-400 w-full py-2">
      <div className="flex flex-col items-center sm:items-start">
        <div className="flex space-x-1 items-center">
          <div>
            <Badge text={user.role.slice(0, 1)} />
          </div>
          <div className="flex space-x-1">
            <p>{user.firstName}</p>
            <p>{user.lastName}</p>
          </div>
        </div>

        <p className="text-xs pb-1">{user.email}</p>
      </div>
      {isNotFollowed ? (
        <Button small onClick={() => addFollowers(user.id)} name="Follow" />
      ) : (
        <Button
          small
          outline
          onClick={() => removeFollow(user)}
          name="Unfollow"
        />
      )}
    </div>
  );
}
