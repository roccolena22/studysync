import {
  addRecordToDatabase,
  deleteRecordFromDatabase,
} from "../../../api/apiRequest";
import { addBooking, deleteBooking } from "../../../redux/slices/bookingsSlice";
import EventDetails from "./EventDetails";
import FooterCard from "./FooterCard";
import HeaderCard from "./HeaderCard";
import { useEffect, useState } from "react";

export default function EventCard({
  loggedUser,
  event,
  fetchBookings,
  users,
  bookings,
  fetchFollowers,
  fetchEvents,
}) {
  const [bookedUsers, setBookedUsers] = useState([]);

  useEffect(() => {
    const idsArray =
      event && event.bookingsRecordId && bookings
        ? bookings
            .filter((booking) => event.bookingsRecordId.includes(booking.id))
            .map((booking) => booking.bookedId)
        : [];
    setBookedUsers(
      (users && users.filter((user) => idsArray.includes(user.id))) || []
    );
  }, [event, users, bookings]);
  const userIsBooked = bookedUsers.find((user) => user.id === loggedUser.id);

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
      <div className="w-full h-96 relative rounded-lg p-3 bg-gray-50 shadow-xl">
        <div
          className={`flex justify-between items-center border-b ${
            event.role && event.role.includes("student")
              ? "border-yellow-400"
              : "border-purple-500"
          } pb-1 rounded-t-lg`}
        >
          <HeaderCard
            event={event}
            fetchBookings={fetchBookings}
            bookedUsers={bookedUsers}
            loggedUser={loggedUser}
            fetchFollowers={fetchFollowers}
            users={users}
          />
        </div>
        <EventDetails event={event} />
        <div className="absolute bottom-2 right-3">
          <FooterCard
            event={event}
            toggleBooking={toggleBooking}
            userIsBooked={userIsBooked}
            fetchEvents={fetchEvents}
            loggedUser={loggedUser}
          />
        </div>
      </div>
    </>
  );
}
