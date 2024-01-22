import Button from "../../../shared/component/Button";
import OwnerOptions from "./OwnerOptions";

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
        <OwnerOptions
          event={event}
          fetchEvents={fetchEvents}
        />
      )}
      {event.bookingsRecordId && event.bookingsRecordId.length >= event.places
        ? ""
        : !ownerEvent &&
          !userIsBooked && (
            <Button
              small
              name="Join"
              onClick={() => toggleBooking(event.id, true)}
            />
          )}

      {userIsBooked && (
        <Button
          small
          outline
          name="Leave"
          onClick={() => toggleBooking(event.id, false)}
        />
      )}
    </div>
  );
}
