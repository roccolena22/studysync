import React, { useState } from "react";
import UserDetails from "../user/UserDetails";
import PriorityPopup from "../shared/PriorityPopup";
import UsersList from "../user/UserList";
import IconAndName from "../shared/IconAndName";
import { Booking, EventModel } from "../../models";


interface HeaderCardProps {
  event: EventModel;
  bookedUsers?: Booking[];
}

export default function HeaderCard({
  event,
  bookedUsers,
}: HeaderCardProps): JSX.Element {
  const [reservationsPriorityPopupIsOpen, setReservationsPriorityPopupIsOpen] =
    useState(false);

  const handleReservationsPopup = () => {
    setReservationsPriorityPopupIsOpen((prev) => !prev);
  
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
          <UsersList bookedUsers={bookedUsers} />
        </PriorityPopup>
      )}
    </div>
  );
}
