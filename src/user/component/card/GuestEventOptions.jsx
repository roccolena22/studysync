import Button from "../../../shared/component/Button";
import { addBooking, deleteBooking } from "../../../redux/slices/bookingsSlice";
import {
  addRecordToDatabase,
  deleteRecordFromDatabase,
} from "../../../api/apiRequest";
import { useSelector } from "react-redux";

export default function GuestEventOptions({
  event,
  userIsBooked,
  ownerEvent,
  fetchBookings,
  fetchEvents,
  loggedUser
}) {
    const bookings = useSelector((state) => state.bookings);

  const toggleBooking = async (eventId, isAdding) => {
    const bookingReduxAction = isAdding ? addBooking : deleteBooking;
    const bookingData = isAdding
      ? {
          eventId: [eventId],
          bookedId: loggedUser.id,
        }
      : bookings.find((item) => item.bookedId === loggedUser.id);

    try {
      if (isAdding) {
        await addRecordToDatabase("bookings", bookingData);
      } else {
        await deleteRecordFromDatabase("bookings", bookingData.id);
      }
      bookingReduxAction(isAdding ? bookingData : bookingData.id);
      fetchBookings();
      fetchEvents();
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
