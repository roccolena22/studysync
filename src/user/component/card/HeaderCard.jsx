import { useState } from "react";
import IconAndName from "../user/IconAndName";
import UserDetails from "../user/UserDetails";
import PriorityPopup from "../shared/PriorityPopup";
import UsersList from "../user/UserList";
import Noitems from "../NoItems";

export default function HeaderCard({
  event,
  fetchBookings,
  bookedUsers,
  loggedUser,
  fetchFollowers,
}) {
  const [reservationsPriorityPopupIsOpen, setReservationsPriorityPopupIsOpen] =
    useState(false);

  const handleCloseReservationsPriorityPopup = () => {
    setReservationsPriorityPopupIsOpen(!reservationsPriorityPopupIsOpen);
  };
  const handleReservationsPopup = () => {
    setReservationsPriorityPopupIsOpen(!reservationsPriorityPopupIsOpen);
    fetchBookings(event);
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
          handleClose={handleCloseReservationsPriorityPopup}
          title="List of reservations"
        >
          {Array.isArray(bookedUsers) && bookedUsers.length > 0 ? (
            <UsersList
              users={bookedUsers}
              loggedUser={loggedUser}
              fetchFollowers={fetchFollowers}
            />
          ) : (
            <Noitems text="There are no reservations for this event." />
          )}
        </PriorityPopup>
      )}
    </>
  );
}
