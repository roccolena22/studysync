import BodyCard from "./BodyCard";
import FooterCard from "./FooterCard";
import HeaderCard from "./HeaderCard";
import { Booking, EventModel } from "../../models";

interface Props {
  event: EventModel;
  bookedUsers: Booking[];
  updateBookingForEvent: (eventId: string, newBookings: Booking[]) => void;
}

export default function EventCard({ event, bookedUsers, updateBookingForEvent }: Props): JSX.Element {
  return (
    <div className="w-full h-96 relative rounded-lg p-3 bg-slate-50 shadow-xl">
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
        <FooterCard
          event={event}
          bookedUsers={bookedUsers}
          updateBookingForEvent={updateBookingForEvent}
        />
      </div>
    </div>
  );
}
