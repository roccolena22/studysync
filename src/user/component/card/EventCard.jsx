import { useSelector } from "react-redux";
import BodyCard from "./BodyCard";
import FooterCard from "./FooterCard";
import HeaderCard from "./HeaderCard";

export default function EventCard({ event }) {
  const bookings = useSelector((state) => state.bookings);
  const users = useSelector((state) => state.users);

  const bookeds = bookings
    .filter((item) => item.eventId && item.eventId.includes(event.id))
    .map((item) => item.bookedId);

  const bookedUsers = users.filter((user) => bookeds.includes(user.id));

  return (
    <>
      <div
        data-testid="event-card"
        className="w-full h-96 relative rounded-lg p-3 bg-gray-50 shadow-xl"
      >
        <div
          className={`flex justify-between items-center border-b ${
            event.role && event.role.includes("student")
              ? "border-yellow-400"
              : "border-purple-500"
          } pb-1 rounded-t-lg`}
        >
          <HeaderCard event={event} bookedUsers={bookedUsers} />
        </div>
        <BodyCard event={event} />
        <div className="absolute bottom-2 right-3">
          <FooterCard event={event} bookedUsers={bookedUsers} />
        </div>
      </div>
    </>
  );
}
