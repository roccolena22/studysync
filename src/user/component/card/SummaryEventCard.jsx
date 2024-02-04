import UserDetails from "../user/UserDetails";
import BodyCard from "./BodyCard";

export default function SummaryEventCard({ event }) {
  return (
    <div>
      <div
        data-testid="summary-event-Card"
        className="border-b border-gray-400"
      >
        <UserDetails
          firstName={event.firstName}
          lastName={event.lastName}
          role={event.role}
          email={event.email}
        />
      </div>
      <BodyCard event={event} />
    </div>
  );
}
