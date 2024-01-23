import { useState } from "react";
import IconAndName from "../user/IconAndName";
import UserDetails from "../user/UserDetails";
import PriorityPopup from "../shared/PriorityPopup";
import UsersList from "../user/UserList";
import Noitems from "../NoItems";

export default function HeaderCard({ event, bookedUsers, fetchBookings }) {
  const [reservationsPriorityPopupIsOpen, setReservationsPriorityPopupIsOpen] =
    useState(false);

  const handleReservationsPopup = () => {
    setReservationsPriorityPopupIsOpen(!reservationsPriorityPopupIsOpen);
    fetchBookings();
  };

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <UserDetails
          firstName={event.firstName}
          lastName={event.lastName}
          email={event.email}
          role={event.role}
        />
        {event.places && (
          <IconAndName
            iconName="group"
            onClick={() => handleReservationsPopup()}
            label={`${
              event.bookingsRecordId ? event.bookingsRecordId.length : "0"
            }${event.places ? "/" + event.places : ""}`}
          />
        )}
      </div>
      {reservationsPriorityPopupIsOpen && (
        <PriorityPopup
          handleClose={() =>
            setReservationsPriorityPopupIsOpen(!reservationsPriorityPopupIsOpen)
          }
          title="List of reservations"
        >
          {Array.isArray(bookedUsers) && bookedUsers.length > 0 ? (
            <UsersList users={bookedUsers} />
          ) : (
            <Noitems text="There are no reservations for this event." />
          )}
        </PriorityPopup>
      )}
    </>
  );
}
