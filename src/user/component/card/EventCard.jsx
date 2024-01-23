import { useEffect, useState } from "react";
import EventDetails from "./EventDetails";
import FooterCard from "./FooterCard";
import HeaderCard from "./HeaderCard";
import { useDispatch, useSelector } from "react-redux";
import { setBookings } from "../../../redux/slices/bookingsSlice";
import { getListFromDatabase } from "../../../api/apiRequest";

export default function EventCard({
  event,
  fetchEvents,
}) {
  const loggedUser = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.users);
  const bookings = useSelector((state) => state.bookings);
  const [bookedUsers, setBookedUsers] = useState([]);

  const dispatch = useDispatch();

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

  const fetchBookings = async () => {
    try {
      const bookings = await getListFromDatabase("bookings");
      dispatch(setBookings(bookings));
    } catch (error) {
      console.error("Error handling reservations:", error);
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
            bookedUsers={bookedUsers}
            fetchBookings={fetchBookings}
          />
        </div>
        <EventDetails event={event} />
        <div className="absolute bottom-2 right-3">
          <FooterCard
            event={event}
            userIsBooked={userIsBooked}
            fetchEvents={fetchEvents}
            fetchBookings={fetchBookings}
            loggedUser={loggedUser}
          />
        </div>
      </div>
    </>
  );
}
