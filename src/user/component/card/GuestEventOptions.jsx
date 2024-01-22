import { useSelector } from "react-redux";
import Button from "../../../shared/component/Button";

export default function GuestEventOptions({
  event,
  userIsBooked,
  toggleBooking,
  ownerEvent
}) {

  return (
    <>
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
    </>
  );
}
