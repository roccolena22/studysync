import { useEffect, useState } from "react";
import Badge from "../shared/Badge";
import IconAndName from "../user/IconAndName";
import UserDetails from "../user/UserDetails";
import PriorityPopup from "../shared/PriorityPopup";
import UsersList from "../user/UserList";

export default function HeaderCard({
  event,
  fetchBookings,
  bookedUsers,
  loggedUser,
  fetchFollowers,
  isUnderway
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
      <div className="w-full flex justify-between items-center">
        <UserDetails firstName={event.firstName} lastName={event.lastName} email={event.email} role={event.role} />
        <div className="flex space-x-1 items-center">
          {isUnderway && <Badge text="underway" />}
          {event.bookingsRecordId && event.bookingsRecordId.length >= event.places && <Badge text="soldout" />}
        </div>
        {event.places && (
          <div className="flex items-center space-x-2">
            <IconAndName
              iconName="group"
              onClick={() => handleReservationsPopup()}
              label={`${event.bookingsRecordId ? event.bookingsRecordId.length : "0"}${event.places ? "/" + event.places : ""
                }`}
            />
          </div>
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
              fetchFollowers={fetchFollowers} />
          ) : (
            <p className="pt-6 text-xl text-gray-400">
              There are no reservations for this event.
            </p>
          )}
        </PriorityPopup>
      )}
    </>
  );
}
