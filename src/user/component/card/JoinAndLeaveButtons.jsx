import Button from "../../../shared/component/Button";
import {
  addRecordToDatabase,
  deleteRecordFromDatabase,
} from "../../../api/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings, fetchEvents } from "../../Utilities/fetchFunctions";

export default function JoinAndLeaveButtons({
  event,
  userIsBooked,
  ownerEvent,
  loggedUser,
}) {
  const bookings = useSelector((state) => state.bookings);
  const dispatch = useDispatch();

  const toggleBooking = async (eventId, isAdding) => {
    const currentRecord = isAdding
      ? {
          eventId: [eventId],
          bookedId: loggedUser.id,
        }
      : bookings.find(
          (item) =>
            item.bookedId === loggedUser.id && eventId === item.eventId[0]
        );

    try {
      if (isAdding) {
        await addRecordToDatabase("bookings", currentRecord);
      } else {
        await deleteRecordFromDatabase("bookings", currentRecord.id);
      }
      fetchBookings(dispatch);
      fetchEvents(dispatch);
    } catch (error) {
      console.error(`Error ${isAdding ? "adding" : "removing"} booking`, error);
    }
  };
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
