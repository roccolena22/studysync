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
      <UserDetails firstName={user.firstName} lastName={user.lastName} email={user.email} role={user.role}/>
      {
        !isLoggedUser &&
        <>
          {isFollowed ? (
            <Button
              small
              outline
              onClick={() => toggleFollow(user)}
              name="Unfollow"
            />
          ) : (
            <Button small onClick={() => toggleFollow(user, true)} name="Follow" />

          )}
        </>
        }
    </div>
  );
}
