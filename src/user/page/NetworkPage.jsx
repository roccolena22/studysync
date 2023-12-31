import { useState } from "react";
import Title from "../component/shared/Title";
import EventList from "../component/card/EventList";
import PriorityPopup from "../component/shared/PriorityPopup";
import UsersList from "../component/user/UserList";
import moment from "moment";

export default function NetworkPage({ loggedUser, followers, events, users, bookings }) {
  const [reservationsPriorityPopupIsOpen, setReservationsPriorityPopupIsOpen] = useState(false);
  const currentDate = moment();

  const networkEvents = events
  .filter((event) =>
    followers?.some((user) => user.idFrom[0] === loggedUser.id && user.idTo[0] === event.authorId)
  )
  .filter((event) => moment(event.endDate + " " + event.endTime, "MM/DD/YYYY HH:mm").isAfter(currentDate));

  return (
    <div className="flex flex-col items-center">
      <Title title="Network" />
      <div className="w-full">
        <EventList
          loggedUser={loggedUser}
          events={networkEvents}
          users={users}
          bookings={bookings}
        />
      </div>
    </div>
  );
}
