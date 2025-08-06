import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../shared/component/Button";
import {
  addRecordToDatabase,
  deleteRecordFromDatabase,
} from "../../../api/apiRequest";
import { fetchBookings } from "../../Utilities/fetchFunctions";
import { TabelName } from "../../../shared/models";

interface User {
  id: string;
  [key: string]: any;
}

interface Booking {
  id: string;
  eventId: string[];
  bookedId: string;
}

interface Props {
  event: any;
  bookedUsers: User[];
}

export default function JoinAndLeaveButtons({ event, bookedUsers }: Props): JSX.Element {
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const loggedUser = useSelector((state: any) => state.auth.user as User);
  const bookings = useSelector((state: any) => state.bookings as Booking[]);
  const dispatch = useDispatch();

  const toggleBooking = async (eventId: string, isAdding: boolean) => {
    const currentRecord = isAdding
      ? {
          eventId: [eventId],
          bookedId: loggedUser.id,
        }
      : bookings.find(
          (item) =>
            item.bookedId === loggedUser.id && item.eventId[0] === eventId
        );

    try {
      if (isAdding) {
        await addRecordToDatabase(TabelName.BOOKINGS, currentRecord);
      } else if (currentRecord && "id" in currentRecord) {
        await deleteRecordFromDatabase(TabelName.BOOKINGS, currentRecord.id);
      }
      fetchBookings(dispatch);
    } catch (error) {
      console.error(`Error ${isAdding ? "adding" : "removing"} booking`, error);
    }
  };

  useEffect(() => {
    const booked = bookings.find(
      (item) => item.bookedId === loggedUser.id && item.eventId[0] === event.id
    );
    setIsBooked(!!booked);
  }, [bookings, event.id, loggedUser.id]);

  const isFull = bookedUsers && bookedUsers.length >= event.places;

  return (
    <div>
      {!isFull && !isBooked && (
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
    </div>
  );
}
