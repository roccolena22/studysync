import JoinAndLeaveButtons from "./JoinAndLeaveButtons";
import EditAndDeleteButtons from "./EditAndDeleteButtons";
import { useSelector } from "react-redux";

// Tipi

interface User {
  id: string;
  [key: string]: any;
}

interface Props {
  event: any;
  bookedUsers: User[];
}

export default function FooterCard({ event, bookedUsers }: Props): JSX.Element {
  const loggedUser = useSelector((state: any) => state.auth.user as User);
  const ownerEvent = loggedUser.id === event.authorId;

  return (
    <div>
      {ownerEvent ? (
        <EditAndDeleteButtons event={event} />
      ) : (
        <JoinAndLeaveButtons event={event} bookedUsers={bookedUsers} />
      )}
    </div>
  );
}
