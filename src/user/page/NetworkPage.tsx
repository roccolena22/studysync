import Title from "../component/shared/Title";
import EventList from "../component/card/EventList";
import DiscoverUsers from "../component/user/DiscoverUsers";
import { useSelector } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { EventModel, User } from "../models";
import { getEventRecordsByFilter } from "../../api/apiEvents";
import { getFollowerRecordsByLinkedField } from "../../api/apiFollowers";
import Loader from "../../shared/component/Loader";
import { DefaultColor, TabelName } from "../../shared/models";
import { useNavigate } from "react-router-dom";
import Icon from "../../shared/component/Icon";

interface RootState {
  auth: {
    user: User;
  };
}

export default function NetworkPage(): JSX.Element {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

    const onEventModified = () => {
    queryClient.invalidateQueries({ queryKey: [TabelName.EVENTS, "network", loggedUser?.id] });
  };

  const loggedUser = useSelector((state: RootState) => state.auth.user);

  // Funzione per fetchare gli eventi della rete
  const fetchNetworkEvents = async (userId: string): Promise<EventModel[]> => {
    const following = await getFollowerRecordsByLinkedField("idFrom", userId);

    if (!following || following.length === 0) {
      return [];
    }

    const orAuthors = following.map((f) => `{authorId} = '${f.idTo}'`).join(",");

    const formula = `AND(
      OR(${orAuthors}),
      OR(
        IS_SAME({endDate}, NOW()),
        IS_AFTER({endDate}, NOW())
      )
    )`;

    return getEventRecordsByFilter(formula);
  };

  const {
    data: networkEvents = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: [TabelName.EVENTS, "network", loggedUser?.id],
    queryFn: () => fetchNetworkEvents(loggedUser!.id),
    enabled: !!loggedUser?.id,
    staleTime: 1000 * 60 * 5, // 5 minuti cache
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader
          size="h-22 w-22"
          color={DefaultColor.TEXT_PRIMARY_COLOR}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        Failed to load network events. Please try again later.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-4 w-full items-center border-b border-slate-400 pb-2">
        <Icon name="back" onClick={() => navigate(-1)} />
        <Title title="Network" />
      </div>

      <div className="w-full pb-10">
        <DiscoverUsers />
      </div>

      <Title fontSize="text-lg" title="Events of my following" />

      <div className="w-full">
        <EventList eventsToShow={networkEvents} onEventModified={onEventModified}/>
      </div>
    </div>
  );
}
