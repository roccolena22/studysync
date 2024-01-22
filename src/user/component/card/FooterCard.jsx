import GuestEventOptions from "./GuestEventOptions";
import OwnerEventOptions from "./OwnerEventOptions";

export default function FooterCard({
  event,
  toggleBooking,
  loggedUser,
  userIsBooked,
  fetchEvents,
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
      <GuestEventOptions event={event} userIsBooked={userIsBooked} toggleBooking={toggleBooking} ownerEvent={ownerEvent}/>
    </div>
  );
}
