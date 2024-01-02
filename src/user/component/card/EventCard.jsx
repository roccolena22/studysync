import EventDetails from "./EventDetails";
import FooterCard from "./FooterCard";
import HeaderCard from "./HeaderCard";
import { useEffect, useState } from "react";

export default function EventCard({
  loggedUser,
  event,
  handleDelete,
  fetchBookings,
  users,
  bookings,
  toggleBooking,
}) {

  const [bookedRecordId, setBookedRecordId] = useState([]);
  const [bookedUsers, setBookedUsers] = useState([]);
  const [isUserBooked, setIsUserBooked] = useState(false);

  console.log(event)

  useEffect(() => {
    const idsArray = event && event.bookingsRecordId
      ? bookings
        .filter((booking) => event.bookingsRecordId.includes(booking.id))
        .map((booking) => booking.bookedId)
      : [];
    setBookedRecordId(event.bookingsRecordId || []);
    setBookedUsers(users.filter((user) => idsArray.includes(user.id)) || [])
    const userIds = bookedUsers.map(user => user.id);
    setIsUserBooked(event && event.bookingsRecordId && userIds.includes(loggedUser.id) || false);


  }, [event, bookings]);

  const proproetaryEvent = loggedUser.id === event.authorId;

  return (
    <>
      <div className={`w-full h-72 relative p-3 rounded-lg shadow-lg p-3 border border-slate-200 ${proproetaryEvent ? "bg-slate-50" : "bg-white"}`}>
        <div className={`flex justify-between items-center border-b ${event.role && event.role.includes("student")
          ? "border-yellow-400"
          : "border-purple-500"
          } pb-1 rounded-t-lg`}>
          <HeaderCard
            event={event}
            fetchBookings={fetchBookings}
            bookedUsers={bookedUsers}
            loggedUser={loggedUser}
          />
        </div>
        <div className="flex justify-between">
          <EventDetails event={event} />
        </div>
        <div className="absolute bottom-2 right-3">
          <FooterCard
            event={event}
            users={users}
            bookings={bookings}
            handleDelete={handleDelete}
            loggedUser={loggedUser}
            proproetaryEvent={proproetaryEvent}
            toggleBooking={toggleBooking}
            bookedRecordId={bookedRecordId}
            isUserBooked={isUserBooked}
          />
        </div>
      </div>
    </>
  );
}
