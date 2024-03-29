import JoinAndLeaveButtons from "./JoinAndLeaveButtons";
import EditAndDeleteButtons from "./EditAndDeleteButtons";
import { useSelector } from "react-redux";

export default function FooterCard({ event, bookedUsers }) {
  const loggedUser = useSelector((state) => state.auth.user);
  const ownerEvent = loggedUser.id === event.authorId;

  return (
    <div data-testid="footer-card">
      {ownerEvent ? (
        <EditAndDeleteButtons event={event} />
      ) : (
        <JoinAndLeaveButtons event={event} bookedUsers={bookedUsers} />
      )}
    </div>
  );
}
