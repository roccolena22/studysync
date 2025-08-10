import Title from "../component/shared/Title";
import EventList from "../component/card/EventList";
import DiscoverUsers from "../component/user/DiscoverUsers";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { EventModel, User } from "../models";
import { getEventRecordsByFilter } from "../../api/apiEvents";
import { getFollowerRecordsByLinkedField } from "../../api/apiFollowers";
import Loader from "../../shared/component/Loader";
import { DefaultColor } from "../../shared/models";
import { useNavigate } from "react-router-dom";
import Icon from "../../shared/component/Icon";

interface RootState {
  auth: {
    user: User;
  };
}

export default function NetworkPage(): JSX.Element {

 const navigate = useNavigate();

  const loggedUser = useSelector((state: RootState) => state.auth.user);
  const [networkEvents, setNetworkEvents] = useState<EventModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNetworkEvents = async () => {
      if (!loggedUser?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const following = await getFollowerRecordsByLinkedField(
          "idFrom",
          loggedUser.id
        );

        if (!following || following.length === 0) {
          setNetworkEvents([]);
          return;
        }

     const orAuthors = following.map((f) => `{authorId} = '${f.idTo}'`).join(",");

const formula = `AND(
  OR(${orAuthors}),
  OR(
    IS_SAME({endDate}, NOW()),
    IS_AFTER({endDate}, NOW())
  )
)`;


        const events = await getEventRecordsByFilter(formula);
        setNetworkEvents(events);
      } catch (error) {
        console.error("Failed to fetch network events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNetworkEvents();
  }, [loggedUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size="h-22 w-22" color={DefaultColor.TEXT_PRIMARY_COLOR}
 />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-4 w-full items-center border-b border-slate-400 pb-2">
        <Icon name="back" onClick={() => navigate(-1)}/>
          <Title title="Network" />
      </div>

      
      <div className="w-full pb-10">
        <DiscoverUsers />
      </div>
      <Title fontSize="text-lg" title="Events of my following" />
      <div className="w-full">
        <EventList eventsToShow={networkEvents} />
      </div>
    </div>
  );
}
