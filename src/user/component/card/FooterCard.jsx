import JoinAndLeaveButtons from "./JoinAndLeaveButtons";
import EditAndDeleteButtons from "./EditAndDeleteButtons";
import { useSelector } from "react-redux";

export default function FooterCard({ event, loggedUser, userIsBooked }) {
  const logged = useSelector((state) => state.auth.user);

  const ownerEvent = logged.id === event.authorId;

  return (
    <div className="flex space-x-2">
      {ownerEvent ? (
        <EditAndDeleteButtons event={event} />
      ) : (
        <JoinAndLeaveButtons
          event={event}
          userIsBooked={userIsBooked}
          loggedUser={loggedUser}
        />
      )}
    </div>
  );
}
