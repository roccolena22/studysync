import UserDetails from "../user/UserDetails";
import EventDetails from "./BodyCard";

export default function SummaryEventCard({ event }) {
  return (
    <div>
      <div className="border-b border-gray-400">
        <UserDetails
          firstName={event.firstName}
          lastName={event.lastName}
          role={event.role}
          email={event.email}
        />
      </div>
      <EventDetails event={event} />
    </div>
  );
}
