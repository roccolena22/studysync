import { useState } from "react";
import UserDetails from "../user/UserDetails";
import PriorityPopup from "../shared/PriorityPopup";
import UsersList from "../user/UserList";
import { fetchBookings } from "../../Utilities/fetchFunctions";
import { useDispatch } from "react-redux";
import IconAndName from "../shared/IconAndName";

export default function HeaderCard({ event, bookedUsers }) {
  const [reservationsPriorityPopupIsOpen, setReservationsPriorityPopupIsOpen] =
    useState(false);

  const dispatch = useDispatch();

  const handleReservationsPopup = () => {
    setReservationsPriorityPopupIsOpen(!reservationsPriorityPopupIsOpen);
    fetchBookings(dispatch);
  };

  return (
    <div data-testid="header-card" className="w-full">
      <div className="flex w-full items-center justify-between">
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
            label={`${bookedUsers ? bookedUsers.length : "0"}${
              event.places ? "/" + event.places : ""
            }`}
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
          <UsersList usersToShow={bookedUsers} />
        </PriorityPopup>
      )}
    </div>
  );
}
