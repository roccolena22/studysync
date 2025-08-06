import { useSelector } from "react-redux";
import BodyCard from "./BodyCard";
import FooterCard from "./FooterCard";
import HeaderCard from "./HeaderCard";

// Tipizzazione dell'evento
interface Event {
  id: string;
  role?: string[];
  [key: string]: any;
}

// Tipizzazione dell'utente
interface User {
  id: string;
  [key: string]: any;
}

// Tipizzazione della prenotazione
interface Booking {
  eventId: string[];
  bookedId: string;
  [key: string]: any;
}

interface Props {
  event: Event;
}

export default function EventCard({ event }: Props): JSX.Element {
  const bookings = useSelector((state: any) => state.bookings as Booking[]);
  const users = useSelector((state: any) => state.users as User[]);

  const bookeds = bookings
    .filter((item) => item.eventId?.includes(event.id))
    .map((item) => item.bookedId);

  const bookedUsers = users.filter((user) => bookeds.includes(user.id));

  return (
    <div
      className="w-full h-96 relative rounded-lg p-3 bg-gray-50 shadow-xl"
    >
      <div
        className={`flex justify-between items-center border-b ${
          event.role?.includes("student")
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
  );
}
