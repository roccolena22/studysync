import React from "react";
import UserDetails from "../user/UserDetails";
import BodyCard from "./BodyCard";

interface Event {
  firstName: string;
  lastName: string;
  role?: string;
  email: string;
  // aggiungi altre proprietà di event se necessarie
}

interface SummaryEventCardProps {
  event: any;
}

export default function SummaryEventCard({
  event,
}: SummaryEventCardProps): JSX.Element {
  return (
    <>
      <div
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
    </>
  );
}
