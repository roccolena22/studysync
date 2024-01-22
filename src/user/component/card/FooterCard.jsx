import GuestEventOptions from "./GuestEventOptions";
import OwnerEventOptions from "./OwnerEventOptions";

export default function FooterCard({
  event,
  loggedUser,
  userIsBooked,
  fetchEvents,
  fetchBookings
}) {
  const ownerEvent = loggedUser.id === event.authorId;

  return (
    <div className="flex space-x-2">
      {ownerEvent && (
        <OwnerEventOptions
          event={event}
          fetchEvents={fetchEvents}
        />
      )}
      <GuestEventOptions event={event} userIsBooked={userIsBooked} ownerEvent={ownerEvent} fetchEvents={fetchEvents} fetchBookings={fetchBookings} loggedUser={loggedUser}/>
    </div>
  );
}
