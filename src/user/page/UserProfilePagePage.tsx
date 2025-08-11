import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Loader from "../../shared/component/Loader";
import { DefaultColor } from "../../shared/models";
import { getUserByField } from "../../api/apiUsers";
import { getEventRecordsByFilter } from "../../api/apiEvents";
import { EventModel, User } from "../models";
import Badge from "../component/shared/Badge";
import FollowAndUnfollowButtons from "../component/user/FollowAndUnfollowButtons";
import PriorityPopup from "../component/shared/PriorityPopup";
import EditUserInfoForm from "../component/form/EditUserInfoForm";
import EventList from "../component/card/EventList";
import Title from "../component/shared/Title";
import Icon from "../../shared/component/Icon";

interface RootState {
  auth: {
    user: User;
  };
}

interface UserProfilePageProps {
  userId?: string;
}

export default function UserProfilePage({ userId }: UserProfilePageProps): JSX.Element {
  const loggedUser = useSelector((state: RootState) => state.auth.user);
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const profileId = userId || params.id;
  const isOwner = profileId === loggedUser?.id;

  const [isEditOpen, setIsEditOpen] = useState(false);

  // Funzione per fetchare l'utente
  const fetchUser = async (id: string): Promise<User | null> => {
    const userData = await getUserByField("id", id);
    return userData || null;
  };

  // Funzione per fetchare gli eventi dell'utente
  const fetchUserEvents = async (user: User | null): Promise<EventModel[]> => {
    if (!user?.eventIds?.length) return [];
    const formula = `OR(${user.eventIds.map((id) => `RECORD_ID()="${id}"`).join(",")})`;
    const events = await getEventRecordsByFilter(formula);

    const now = new Date();
    return events.filter((event) => new Date(event.endDate) >= now);
  };

  // Query per il profilo utente
  const { data: user, isLoading: loadingUser, isError: errorUser } = useQuery({
    queryKey: ["user", profileId],
    queryFn: () => fetchUser(profileId!),
    enabled: !!profileId,
    staleTime: 1000 * 60 * 5,
  });

  // Query per gli eventi, dipendente dalla query user (enabled)
  const { data: events = [], isLoading: loadingEvents, isError: errorEvents } = useQuery({
    queryKey: ["events", "user", profileId],
    queryFn: () => fetchUserEvents(user),
    enabled: !!user?.eventIds?.length,
    staleTime: 1000 * 60 * 5,
  });

  const isFollowed = loggedUser?.followingIds?.includes(profileId || "") ?? false;

  // Aggiorna info in cache e chiudi popup
  const handleInfoUpdated = (newInfo: string) => {
    if (!user) return;
    queryClient.setQueryData(["user", profileId], { ...user, info: newInfo });
    setIsEditOpen(false);
  };

  if (loadingUser || loadingEvents) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size="h-22 w-22" color={DefaultColor.TEXT_PRIMARY_COLOR} />
      </div>
    );
  }

  if (errorUser) {
    return <p className="text-center py-10 text-red-600">Failed to load user data</p>;
  }

  if (!user) {
    return <p className="text-center py-10">Utente non trovato</p>;
  }

  const followerCount = user.followersIds?.length || 0;
  const followingCount = user.followingIds?.length || 0;

  return (
    <div>
      <div className="flex w-full justify-between items-center mb-6">
        <Icon name="back" onClick={() => navigate(-1)} />
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">
            {user.firstName} {user.lastName}
          </h1>
          <Badge text={loggedUser?.role || ""} />
        </div>
        {isOwner ? (
          <Icon name="edit" onClick={() => setIsEditOpen(true)} />
        ) : (
          <FollowAndUnfollowButtons user={user} isFollowed={isFollowed} />
        )}
      </div>

      <div className="mb-6 space-y-2">
        <div className="flex space-x-6 mt-4 w-full justify-center">
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold">{followerCount}</span>
            <span className="text-sm text-gray-500">Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold">{followingCount}</span>
            <span className="text-sm text-gray-500">Following</span>
          </div>
        </div>
        <p className="text-gray-700 w-full text-center pt-6">{user.info}</p>
      </div>

      <div>
        <Title title="Events" />
        {errorEvents ? (
          <p className="text-red-600 text-center">Failed to load events.</p>
        ) : (
          <EventList eventsToShow={events} />
        )}
      </div>

      {isEditOpen && (
        <PriorityPopup handleClose={() => setIsEditOpen(false)} title="Modifica informazioni">
          <EditUserInfoForm
            userId={user.id}
            initialInfo={user.info || ""}
            onSave={handleInfoUpdated}
          />
        </PriorityPopup>
      )}
    </div>
  );
}
