import Title from "../component/shared/Title";
import EventList from "../component/card/EventList";
import moment from "moment";
import DiscoverUsers from "../component/user/DiscoverUsers";
import NewEvent from "../component/shared/NewEvent";
import { useSelector } from "react-redux";

export default function NetworkPage({
  fetchFollowers,
}) {
  const loggedUser = useSelector((state) => state.auth.user);
  const events = useSelector((state) => state.events);
  const followers = useSelector((state) => state.followers);
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
        <NewEvent name="New Event" />
      </Title>
      <div className="w-full pt-6 pb-10">
        <DiscoverUsers
          fetchFollowers={fetchFollowers}
        />
      </div>
      <Title fontSize="text-lg" title="Events of my following" />
      <div className="w-full">
        <EventList
          events={networkEvents}
          fetchFollowers={fetchFollowers}
        />
      </div>
    </div>
  );
}
