import Title from "../component/shared/Title";
import EventList from "../component/card/EventList";
import moment from "moment";
import DiscoverUsers from "../component/user/DiscoverUsers";
import NewEvent from "../component/shared/NewEvent";

export default function NetworkPage({
  loggedUser,
  followers,
  events,
  users,
  bookings,
  fetchFollowers,
}) {
  const currentDate = moment();

  const networkEvents = events
    .filter((event) =>
      followers?.some(
        (user) =>
          user.idFrom[0] === loggedUser.id && user.idTo[0] === event.authorId
      )
    )
    .filter((event) =>
      moment(event.endDate + " " + event.endTime, "YYYY-MM-DD HH:mm").isAfter(
        currentDate
      )
    );

  return (
    <div className="flex flex-col items-center">
      <Title title="Network">
        <NewEvent loggedUser={loggedUser} name="New Event" />
      </Title>
      <div className="w-full pt-6 pb-10">
        <DiscoverUsers
          loggedUser={loggedUser}
          users={users}
          fetchFollowers={fetchFollowers}
        />
      </div>
      <Title fontSize="text-lg" title="Events of my following" />
      <div className="w-full">
        <EventList
          loggedUser={loggedUser}
          events={networkEvents}
          users={users}
          bookings={bookings}
          fetchFollowers={fetchFollowers}
        />
      </div>
    </div>
  );
}
