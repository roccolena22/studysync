import React, { useState } from "react";
import PriorityPopup from "../shared/PriorityPopup";
import Button from "../../../shared/component/Button";
import UsersList from "./UserList";
import { useSelector } from "react-redux";

interface User {
  id: string;
  [key: string]: any;
}

interface RootState {
  users: User[];
  auth: {
    user: User,
  };
}

export default function DiscoverUsers(): JSX.Element {
  const users = useSelector((state: RootState) => state.users);
  const loggedUser = useSelector((state: RootState) => state.auth.user);
  const [priorityPopupIsOpen, setPriorityPopupIsOpen] = useState(false);

  const handlePriorityPopup = () => {
    setPriorityPopupIsOpen(!priorityPopupIsOpen);
  };

  const usersToFollow = users.filter((user) => user.id !== loggedUser.id);

  return (
    <>
      <div className="relative h-24 bg-white w-full rounded-lg shadow-xl py-4">
        <div className="w-full flex flex-col justify-between items-center">
          <p className="sm:text-lg font-semibold text-center">
            Discover new users to follow
          </p>
          <div className="absolute bottom-2">
            <Button
              name="Discover"
              outline
              large
              onClick={handlePriorityPopup}
            />
          </div>
        </div>
      </div>

      {priorityPopupIsOpen && (
        <PriorityPopup
          handleClose={handlePriorityPopup}
          title="Search among StudySync users"
        >
          <UsersList usersToShow={usersToFollow} />
        </PriorityPopup>
      )}
    </>
  );
}
