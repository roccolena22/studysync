import React, { useState } from "react";
import UserDetails from "../user/UserDetails";
import PriorityPopup from "../shared/PriorityPopup";
import UsersList from "../user/UserList";
import { fetchBookings } from "../../Utilities/fetchFunctions";
import { useDispatch } from "react-redux";
import IconAndName from "../shared/IconAndName";


interface HeaderCardProps {
  event: any;
  bookedUsers?: any[];
}

export default function HeaderCard({
  event,
  bookedUsers,
}: HeaderCardProps): JSX.Element {
  const [reservationsPriorityPopupIsOpen, setReservationsPriorityPopupIsOpen] =
    useState(false);
  const dispatch = useDispatch();

  const handleReservationsPopup = () => {
    setReservationsPriorityPopupIsOpen((prev) => !prev);
    fetchBookings(dispatch);
  };

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <UserDetails
          firstName={event.firstName}
          lastName={event.lastName}
          email={event.email}
          role={event.role}
        />
        {event.places !== undefined && (
          <IconAndName
            iconName="group"
            onClick={handleReservationsPopup}
            label={`${bookedUsers ? bookedUsers.length : "0"}${
              event.places ? "/" + event.places : ""
            }`}
          />
        )}
      </div>
      {reservationsPriorityPopupIsOpen && (
        <PriorityPopup
          handleClose={() => setReservationsPriorityPopupIsOpen(false)}
          title="List of reservations"
        >
          <UsersList usersToShow={bookedUsers} />
        </PriorityPopup>
      )}
    </div>
  );
}
