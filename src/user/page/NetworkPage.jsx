import { useState } from "react";
import Title from "../component/shared/Title";
import EventList from "../component/card/EventList";
import PriorityPopup from "../component/shared/PriorityPopup";
import UsersList from "../component/user/UserList";
import {
  addToDatabase,
  deleteRecordFromDatabase,
  getListFromDatabase,
} from "../../api/apiRequest";
import { useDispatch } from "react-redux";
import { setBookings } from "../../redux/bookingsSlice";
import moment from "moment";

export default function NetworkPage({ loggedUser, followers, events, users, bookings }) {
  const [reservationsPriorityPopupIsOpen, setReservationsPriorityPopupIsOpen] = useState(false);
  const dispatch = useDispatch();
  const currentDate = moment();

  const networkEvents = events
  .filter((event) =>
    followers?.some((user) => user.idFrom[0] === loggedUser.id && user.idTo[0] === event.authorId)
  )
  .filter((event) => moment(event.endDate + " " + event.endTime, "MM/DD/YYYY HH:mm").isAfter(currentDate));


  const handleReservationsPriorityPopup = () => {
    setReservationsPriorityPopupIsOpen(!reservationsPriorityPopupIsOpen);
  };

  const handleCloseReservationsPriorityPopup = () => {
    setReservationsPriorityPopupIsOpen(!reservationsPriorityPopupIsOpen);
  };

  const addToBookings = async (id) => {
    await addToDatabase("bookings", {
      eventId: [id],
      bookedId: loggedUser.id,
    });
    const updateBookings = await getListFromDatabase("bookings");
    dispatch(setBookings(updateBookings));
  };

  const removeToBookings = async (eventId) => {
    const result = bookings.find((item) =>
      item.eventId.includes(eventId)
    );

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
          handleReservationsPriorityPopup={handleReservationsPriorityPopup}
          addToBookings={addToBookings}
          removeToBookings={removeToBookings}
        />
      </div>
      {reservationsPriorityPopupIsOpen && (
        <PriorityPopup
          handleClose={handleCloseReservationsPriorityPopup}
          title="List of reservations"
        >
          <UsersList users={users} loggedUser={loggedUser} />
        </PriorityPopup>
      )}
    </div>
  );
}
