import { useState } from "react";
import TitlePage from "../component/shared/TitlePage";
import EventList from "../component/card/EventList";
import Popup from "../component/shared/Popup";
import UsersList from "../component/user/UserList";
import { addToDatabase } from "../../api/apiRequest";

export default function Network({ loggedUser, followers, events, users }) {
  const [reservationsPopupIsOpen, setReservationsPopupIsOpen] = useState(false);

  const following =
    followers && followers.filter((user) => user.idFrom === loggedUser.id);

  const networkEvents = events.filter((event) =>
    following.some((item) => item.idTo === event.authorId)
  );

  const handleReservationsPopup = () => {
    setReservationsPopupIsOpen(!reservationsPopupIsOpen);
  };

  const handleCloseReservationsPopup = () => {
    setReservationsPopupIsOpen(!reservationsPopupIsOpen);
  };

  const addToBooked = async (idEvent) => {
    await addToDatabase("bookings", {
      eventId: idEvent,
      bookedId: loggedUser.id,
    });
  };

  return (
    <div className="flex flex-col items-center">
      <TitlePage title="Network" />
      <div className="sticky top-16 w-full">
        <EventList
          events={networkEvents}
          handleReservationsPopup={handleReservationsPopup}
          addToBooked={addToBooked}
        />
      </div>
      {reservationsPopupIsOpen && (
        <Popup
          handleClose={handleCloseReservationsPopup}
          title="List of reservations"
        >
          <UsersList users={users} loggedUser={loggedUser} />
        </Popup>
      )}
    </div>
  );
}
