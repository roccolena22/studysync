import React from "react";
import Button from "../../../shared/component/Button";
import Badge from "../Badge";

export default function SingleUser({
  user,
  addFollowers,
  removeFollow,
  loggedUser,
}) {
  const isFollowed = user.followingIds ? !user.followingIds.includes(loggedUser.id) : false;
  return (
    <div className="flex justify-between items-center space-x-4 pb-2 py-2 border-b border-zinc-400">
      <div className="flex space-x-2 items-center">
        <Badge text={user.role.slice(0, 1)} />
        <div className="flex flex-col">
          <div className="space-x-1">
            <span>{user.firstName}</span>
            <span>{user.lastName}</span>
          </div>
          <p className="text-xs">{user.email}</p>
        </div>
      </div>

      {isFollowed ? (
        <Button
          small
          outline
          onClick={() => removeFollow(user)}
          name="UnFollow"
        />
      ) : (
        <Button small onClick={() => addFollowers(user.id)} name="Follow" />
      )}
    </div>
  );
}
