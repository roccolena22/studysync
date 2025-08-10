import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // <-- importa useNavigate
import Loader from "../../shared/component/Loader";
import { DefaultColor } from "../../shared/models";
import { getUserByField } from "../../api/apiUsers";
import { EventModel, User } from "../models";
import { useSelector } from "react-redux";
import IconAndName from "../component/shared/IconAndName";
import FollowAndUnfollowButtons from "../component/user/FollowAndUnfollowButtons";
import Badge from "../component/shared/Badge";
import PriorityPopup from "../component/shared/PriorityPopup";
import EditUserInfoForm from "../component/form/EditUserInfoForm";
import EventList from "../component/card/EventList";
import { getEventRecordsByFilter } from "../../api/apiEvents";
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
  const profileId = userId || params.id;

  const isOwner = profileId === loggedUser?.id;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [events, setEvents] = useState<EventModel[]>([]);

  useEffect(() => {
    async function fetchUserAndEvents() {
      if (!profileId) return;

      try {
        const userData = await getUserByField("id", profileId);
        setUser(userData || null);

        if (userData?.eventIds?.length) {
          const formula = `OR(${userData.eventIds.map(id => `RECORD_ID()="${id}"`).join(",")})`;
          const eventsData = await getEventRecordsByFilter(formula);

          const today = new Date();
          const activeEvents = eventsData.filter(event => new Date(event.endDate) >= today);

          setEvents(activeEvents);
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserAndEvents();
  }, [profileId]);

  const isFollowed = loggedUser?.followingIds?.includes(profileId || "");

  const handleInfoUpdated = (newInfo: string) => {
    if (user) {
      setUser({ ...user, info: newInfo });
    }
    setIsEditOpen(false);
  };

  // LOADING STATE
  if (loading) {
    return (
       <div className="flex justify-center items-center h-screen">
        <Loader size="h-22 w-22" color={DefaultColor.TEXT_PRIMARY_COLOR} />
      </div>
    );
  }

  // USER NOT FOUND
  if (!user) {
    return <p className="text-center py-10">Utente non trovato</p>;
  }

  const followerCount = user.followersIds?.length || 0;
  const followingCount = user.followingIds?.length || 0;

  return (
    <div>
      {/* top bar */}
      <div className="flex w-full justify-between items-center mb-6">
           <Icon name="back" onClick={() => navigate(-1)}/>
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
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
        <EventList eventsToShow={events} />
      </div>

      {/* modale */}
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
