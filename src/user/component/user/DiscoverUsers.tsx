import React, { useState } from "react";
import PriorityPopup from "../shared/PriorityPopup";
import Button from "../../../shared/component/Button";
import { useSelector } from "react-redux";
import { User } from "../../models";
import { PaginatedUsersList } from "../PaginatedUsersList";

interface RootState {
  auth: {
    user: User;
  };
}

export default function DiscoverUsers(): JSX.Element {
  const loggedUser = useSelector((state: RootState) => state.auth.user);
  const [priorityPopupIsOpen, setPriorityPopupIsOpen] = useState(false);

  const handlePriorityPopup = () => {
    setPriorityPopupIsOpen(!priorityPopupIsOpen);
  };

  return (
    <>
      <div className="relative h-24 bg-white w-full rounded-lg shadow-xl py-4">
        <div className="w-full flex flex-col justify-between items-center">
          <p className="sm:text-lg font-semibold text-center">
            Discover new users to follow
          </p>
          <div className="absolute bottom-2">
            <Button name="Discover" outline onClick={handlePriorityPopup} />
          </div>
        </div>
      </div>

      {priorityPopupIsOpen && (
        <PriorityPopup handleClose={handlePriorityPopup} title="Search among StudySync users">
          <PaginatedUsersList loggedUserId={loggedUser.id} />
        </PriorityPopup>
      )}
    </>
  );
}
