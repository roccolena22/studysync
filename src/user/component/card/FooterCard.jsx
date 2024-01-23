import JoinAndLeaveButtons from "./JoinAndLeaveButtons";
import EditAndDeleteButtons from "./EditAndDeleteButtons";

export default function FooterCard({
  event,
  loggedUser,
  userIsBooked,
  fetchEvents,
  fetchBookings,
}) {
  const ownerEvent = loggedUser.id === event.authorId;

  return (
    <div className="flex space-x-2">
      {ownerEvent && (
        <EditAndDeleteButtons event={event} fetchEvents={fetchEvents} />
      )}
      <JoinAndLeaveButtons
        event={event}
        userIsBooked={userIsBooked}
        ownerEvent={ownerEvent}
        fetchEvents={fetchEvents}
        fetchBookings={fetchBookings}
        loggedUser={loggedUser}
      />
    </div>
  );
}
