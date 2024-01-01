import { useState } from "react";
import Badge from "../Badge";
import IconAndName from "../user/IconAndName";
import UserDetails from "../user/UserDetails";
import PriorityPopup from "../shared/PriorityPopup";
import UsersList from "../user/UserList";

export default function HeaderCard({
  event,
  fetchBookings,
  bookedUsers,
  loggedUser
}) {
  const [reservationsPriorityPopupIsOpen, setReservationsPriorityPopupIsOpen] = useState(false);

  const handleCloseReservationsPriorityPopup = () => {
    setReservationsPriorityPopupIsOpen(!reservationsPriorityPopupIsOpen);
  };
  const handleReservationsPopup = () => {
    setReservationsPriorityPopupIsOpen(!reservationsPriorityPopupIsOpen);
    fetchBookings(event)
  };

  return (
    <>
      <UserDetails firstName={event.firstName} lastName={event.lastName} email={event.email} role={event.role} />
      {event.places && (
        <div className="flex items-center space-x-2">
          {event.bookingsRecordId && event.bookingsRecordId.length >= event.places && <Badge text="soldout" />}
          <IconAndName
            iconName="group"
            onClick={() => handleReservationsPopup()}
            label={`${event.bookingsRecordId ? event.bookingsRecordId.length : "0"}${event.places ? "/" + event.places : ""
              }`}
          />
        </div>
      )}
      {reservationsPriorityPopupIsOpen && (
        <PriorityPopup
          handleClose={handleCloseReservationsPriorityPopup}
          title="List of reservations"
        >
          {event.bookingsRecordId ? (
            <UsersList users={bookedUsers} loggedUser={loggedUser} />
          ) : (
            <p className="pt-6 text-xl text-slate-400">
              There are no reservations for this event
            </p>
          )}
        </PriorityPopup>
      )}
    </>
  );
}
