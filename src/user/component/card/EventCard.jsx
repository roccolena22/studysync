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
  fetchFollowers,
}) {
  const [bookedUsers, setBookedUsers] = useState([]);
  const [isUnderway, setIsUnderway] = useState(false);

  const currentDate = new Date();

  useEffect(() => {
    const end = new Date(`${event.endDate} ${event.endTime}`);
    const start = new Date(`${event.startDate} ${event.startTime}`);
    setIsUnderway(start <= currentDate && currentDate <= end);
  }, [currentDate, event.endDate, event.endTime, event.startDate, event.startTime]);

  useEffect(() => {
    const idsArray = event && event.bookingsRecordId && bookings
      ? bookings
        .filter((booking) => event.bookingsRecordId.includes(booking.id))
        .map((booking) => booking.bookedId)
      : [];
    setBookedUsers(users && users.filter((user) => idsArray.includes(user.id)) || [])
  }, [event, users, bookings]);
  const userIsBooked = bookedUsers.find(user => user.id === loggedUser.id);

  return (
    <>
      <div className="w-full h-96 sm:h-80 relative rounded-lg p-3 bg-gray-50 shadow-xl">
        <div className={`flex justify-between items-center border-b ${event.role && event.role.includes("student")
          ? "border-yellow-400"
          : "border-purple-500"
          } pb-1 rounded-t-lg`}>
          <HeaderCard
            event={event}
            fetchBookings={fetchBookings}
            bookedUsers={bookedUsers}
            loggedUser={loggedUser}
            fetchFollowers={fetchFollowers}
            users={users}
            isUnderway={isUnderway}
          />
        </div>
        <div className="flex justify-between">
          <EventDetails event={event} />
        </div>
        <div className="absolute bottom-2 right-3">
          <FooterCard
            event={event}
            handleDelete={handleDelete}
            loggedUser={loggedUser}
            toggleBooking={toggleBooking}
            userIsBooked={userIsBooked}
            isUnderway={isUnderway}
          />
        </div>
      </div>
    </>
  );
}
