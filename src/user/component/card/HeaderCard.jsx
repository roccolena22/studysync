import { useState } from "react";
import IconAndName from "../user/IconAndName";
import UserDetails from "../user/UserDetails";
import PriorityPopup from "../shared/PriorityPopup";
import UsersList from "../user/UserList";
import Noitems from "../NoItems";
import { fetchBookings } from "../../Utilities/fetchFunctions";
import { useDispatch } from "react-redux";

export default function HeaderCard({ event, bookedUsers }) {
  const dispatch = useDispatch()
  const [reservationsPriorityPopupIsOpen, setReservationsPriorityPopupIsOpen] =
    useState(false);

  const handleReservationsPopup = () => {
    setReservationsPriorityPopupIsOpen(!reservationsPriorityPopupIsOpen);
    fetchBookings(dispatch);
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
            <UsersList users={bookedUsers} />
        </PriorityPopup>
      )}
    </>
  );
}
