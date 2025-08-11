import JoinAndLeaveButtons from "./JoinAndLeaveButtons";
import EditAndDeleteButtons from "./EditAndDeleteButtons";
import { useSelector } from "react-redux";
import { Booking, EventModel } from "../../models";

interface Props {
  event: EventModel;
  bookedUsers: Booking[];
  updateBookingForEvent: (eventId: string, newBookings: Booking[]) => void;
}

export default function FooterCard({ event, bookedUsers, updateBookingForEvent }: Props): JSX.Element {
  const loggedUserId = useSelector((state: any) => state.auth.user.id);
  const ownerEvent = loggedUserId === event.authorId;

  return (
    <div>
      {ownerEvent ? (
        <EditAndDeleteButtons event={event} />
      ) : (
        <JoinAndLeaveButtons
          event={event}
          bookedUsers={bookedUsers}
          updateBookingForEvent={updateBookingForEvent}
          loggedUserId={loggedUserId}
        />
      )}
    </div>
  );
}
