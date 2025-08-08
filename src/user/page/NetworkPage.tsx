import Title from "../component/shared/Title";
import EventList from "../component/card/EventList";
import DiscoverUsers from "../component/user/DiscoverUsers";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { EventModel, User } from "../models";
import { getEventRecordsByFilter } from "../../api/apiEvents";
import { getFollowerRecordsByLinkedField } from "../../api/apiFollowers";

interface RootState {
  auth: {
    user: User;
  };
}

export default function NetworkPage(): JSX.Element {
  const loggedUser = useSelector((state: RootState) => state.auth.user);
  const [networkEvents, setNetworkEvents] = useState<EventModel[]>([]);

  useEffect(() => {
    const fetchNetworkEvents = async () => {
      if (!loggedUser?.id) return;

      const following = await getFollowerRecordsByLinkedField(
        "idFrom",
        loggedUser.id
      );

      if (!following || following.length === 0) {
        setNetworkEvents([]);
        return;
      }

      const orAuthors = following
        .map((f) => `{authorId} = '${f.idTo}'`)
        .join(",");

      const formula = `AND(
        OR(${orAuthors}),
        OR(
          IS_SAME(DATETIME_PARSE(CONCATENATE({endDate}, " ", {endTime}), 'YYYY-MM-DD HH:mm'), NOW()),
          IS_AFTER(DATETIME_PARSE(CONCATENATE({endDate}, " ", {endTime}), 'YYYY-MM-DD HH:mm'), NOW())
        )
      )`;

      const events = await getEventRecordsByFilter(formula);

      setNetworkEvents(events);
    };

    fetchNetworkEvents();
  }, [loggedUser]);

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
