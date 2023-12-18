import React from "react";
import Button from "../../../shared/component/Button";
import Badge from "../Badge";

export default function SingleUser({
  user,
  addFollowers,
  removeFollow,
  loggedUser,
}) {

  const isLoggedUser = loggedUser.id === user.id

  const isFollowed =
  user.followersIds &&
  loggedUser.followingIds &&
  loggedUser.followingIds.some((element) => user.followersIds.includes(element));


  return (
    <div className="flex justify-between items-center border-b border-zinc-400 w-full py-2">
      <div className="flex flex-col items-start">
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
      {
        !isLoggedUser &&
        <>
          {isFollowed ? (
            <Button
              small
              outline
              onClick={() => removeFollow(user.id)}
              name="Unfollow"
            />
          ) : (
            <Button small onClick={() => addFollowers(user.id)} name="Follow" />

          )}
        </>}

    </div>
  );
}
