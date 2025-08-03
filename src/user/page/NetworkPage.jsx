import Title from "../component/shared/Title";
import EventList from "../component/card/EventList";
import moment from "moment";
import DiscoverUsers from "../component/user/DiscoverUsers";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function NetworkPage() {
  const loggedUser = useSelector((state) => state.auth.user);
  const events = useSelector((state) => state.events);
  const followers = useSelector((state) => state.followers);
  const [networkEvents, setNetworkEvents] = useState([]);
  const currentDate = moment();

  useEffect(() => {
    const networkEventsList = events
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
    setNetworkEvents(networkEventsList);
  }, [events, followers]);

  return (
    <div className="flex flex-col items-center">
      <Title title="Network" />
      <div className="w-full pt-6 pb-10">
        <DiscoverUsers />
      </div>
      <Title fontSize="text-lg" title="Events of my following" />
      <div className="w-full">
        <EventList eventsToShow={networkEvents} />
      </div>
    </div>
  );
}
