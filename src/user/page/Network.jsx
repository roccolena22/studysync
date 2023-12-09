import { useState } from "react";
import Title from "../component/shared/Title";
import EventList from "../component/card/EventList";
import Popup from "../component/shared/Popup";
import UsersList from "../component/user/UserList";
import {
  addToDatabase,
  deleteFromDatabase,
  getListFromDatabase,
} from "../../api/apiRequest";

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

  const addToBooked = async (id) => {
    await addToDatabase("bookings", {
      eventId: [id],
      bookedId: loggedUser.id,
    });
  };

  const leaveEvent = async (eventIdToRemove) => {
    const bookings = await getListFromDatabase("bookings");
    const result = bookings.find((item) =>
      item.eventId.includes(eventIdToRemove)
    );
    if (result.id && result.bookedId === loggedUser.id) {
      try {
        await deleteFromDatabase("bookings", result.id);
      } catch (error) {
        console.error("Errore nella rimozione del follower", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Title title="Network" />
      <div className="w-full">
        <EventList
          loggedUser={loggedUser}
          events={networkEvents}
          users={users}
          handleReservationsPopup={handleReservationsPopup}
          addToBooked={addToBooked}
          leaveEvent={leaveEvent}
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
