import Button from "../../../shared/component/Button";
import {
  addRecordToDatabase,
  deleteRecordFromDatabase,
} from "../../../api/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../Utilities/fetchFunctions";
import { useEffect, useState } from "react";

export default function JoinAndLeaveButtons({ event, bookedUsers }) {
  const [isBooked, setIsBooked] = useState(false);
  const loggedUser = useSelector((state) => state.auth.user);
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
    } catch (error) {
      console.error(`Error ${isAdding ? "adding" : "removing"} booking`, error);
    }
  };

  useEffect(() => {
    const booked = bookings.find(
      (item) => item.bookedId === loggedUser.id && event.id === item.eventId[0]
    );
    setIsBooked(!!booked);
  }, [bookings, event.id, loggedUser.id]);

  return (
    <>
      {bookedUsers && bookedUsers.length >= event.places
        ? ""
        : !isBooked && (
            <Button
              small
              name="Join"
              onClick={() => toggleBooking(event.id, true)}
            />
          )}
      {isBooked && (
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
