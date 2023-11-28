import React from "react";
import Button from "../../../shared/component/Button";
import Badge from "../Badge";

export default function SingleUser({ user, addFollowers, removeFollow, }) {

  return (
    <div className="flex justify-between items-center space-x-4 pb-2 py-2 border-b border-slate-400">
      <div className="flex flex-col">
        <div className="flex space-x-2 items-center">
          <div className="space-x-1">
            <span>{user.firstName}</span>
            <span>{user.lastName}</span>
          </div>
          <Badge text={user.role} />
        </div>
        <p className="text-slate-500 text-xs">{user.email}</p>
      </div>
      <Button small outline onClick={() => (removeFollow(user))} name="UnFollow"/>
      <Button small  onClick={() => (addFollowers(user))} name="Follow"/>
    </div>
  );
}
