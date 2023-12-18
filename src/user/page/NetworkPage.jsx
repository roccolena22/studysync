import { useState } from "react";
import Title from "../component/shared/Title";
import EventList from "../component/card/EventList";
import Popup from "../component/shared/Popup";
import UsersList from "../component/user/UserList";
import {
  addToDatabase,
  deleteRecordFromDatabase,
  getListFromDatabase,
} from "../../api/apiRequest";
import { useDispatch } from "react-redux";
import { setBookings } from "../../redux/bookingsSlice";

export default function NetworkPage({ loggedUser, followers, events, users, bookings }) {
  const [reservationsPopupIsOpen, setReservationsPopupIsOpen] = useState(false);
  const dispatch = useDispatch()

  const following =
    followers && followers.filter((user) => user.idFrom[0] === loggedUser.id);

  const networkEvents = events.filter((event) =>
    following.some((item) => item.idTo[0] === event.authorId)
  );

  const handleReservationsPopup = () => {
    setReservationsPopupIsOpen(!reservationsPopupIsOpen);
  };

  const handleCloseReservationsPopup = () => {
    setReservationsPopupIsOpen(!reservationsPopupIsOpen);
  };

  const addToBookings = async (id) => {
    await addToDatabase("bookings", {
      eventId: [id],
      bookedId: loggedUser.id,
    });
    const updateBookings = await getListFromDatabase("bookings");
    dispatch(setBookings(updateBookings))
  };

  const removeToBookings = async (event) => {
    const result = bookings.find((item) =>
      item.eventId.includes(event.id)
    );

    console.log(result)
    if (result.id && result.bookedId === loggedUser.id) {
      try {
        await deleteRecordFromDatabase("bookings", result.id);
      } catch (error) {
        console.error("Error removing follower", error);
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
          addToBookings={addToBookings}
          removeToBookings={removeToBookings}
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
