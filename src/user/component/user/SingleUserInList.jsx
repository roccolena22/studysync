import React from "react";
import Button from "../../../shared/component/Button";
import UserDetails from "./UserDetails";

export default function SingleUserInList({
  user,
  loggedUser,
  toggleFollow
}) {

  const isLoggedUser = loggedUser.id === user.id

  const isFollowed =
    user.followersIds &&
    loggedUser.followingIds &&
    loggedUser.followingIds.some((element) => user.followersIds.includes(element));

  return (
    <div className="flex justify-between items-center border-b border-slate-400 w-full py-2">
      <UserDetails user={user} />
      {
        !isLoggedUser &&
        <>
          {isFollowed ? (
            <Button
              small
              outline
              onClick={() => toggleFollow(user.id)}
              name="Unfollow"
            />
          ) : (
            <Button small onClick={() => toggleFollow(user.id, true)} name="Follow" />

          )}
        </>}

    </div>
  );
}
