import { useEffect, useState } from "react";
import BodyCard from "./BodyCard";
import FooterCard from "./FooterCard";
import HeaderCard from "./HeaderCard";
import { useSelector } from "react-redux";

export default function EventCard({
  event,
}) {
  const users = useSelector((state) => state.users);
  const logged = useSelector((state) => state.auth.user);

  const loggedUser = users.find(user => user.id === logged.id);
  const bookings = useSelector((state) => state.bookings);
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
  }, [event, bookings, loggedUser]);
  const userIsBooked = bookedUsers.find((user) => user.id === loggedUser.id);

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
          />
        </div>
        <BodyCard event={event} />
        <div className="absolute bottom-2 right-3">
          <FooterCard
            event={event}
            userIsBooked={userIsBooked}
            loggedUser={loggedUser}
          />
        </div>
      </div>
    </>
  );
}
