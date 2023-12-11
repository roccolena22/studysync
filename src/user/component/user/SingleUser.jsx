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
    <div className="flex flex-col sm:flex-row sm:justify-between items-center space-x-4 pb-2 py-2 border-b border-zinc-400">
      <div className="flex flex-col sm:flex-row space-x-2 items-center">
      <div className="w-full flex justify-center">
      <Badge text={user.role.slice(0, 1)} />

      </div>
        <div className="flex flex-col">
          <div className="space-x-1 text-center sm:text-start">
            <span>{user.firstName}</span>
            <span>{user.lastName}</span>
          </div>
          <p className="text-xs">{user.email}</p>
        </div>
      </div>
      <div className="pt-2 flex justify-center sm:justify-end w-full sm:pt-0 ">
      {isNotFollowed ? (
        <Button small onClick={() => addFollowers(user.id)} name="Follow" />
      ) : (
        <Button
          small
          outline
          onClick={() => removeFollow(user)}
          name="UnFollow"
        />
      )}
      </div>
      
    </div>
  );
}
