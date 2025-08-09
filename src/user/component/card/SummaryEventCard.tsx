import React from "react";
import UserDetails from "../user/UserDetails";
import BodyCard from "./BodyCard";
import { EventModel } from "../../models";

interface SummaryEventCardProps {
  event: EventModel;
}

export default function SummaryEventCard({
  event,
}: SummaryEventCardProps): JSX.Element {
  return (
    <>
      <div
        className="border-b border-slate-400"
      >
        <UserDetails
          firstName={event.firstName}
          lastName={event.lastName}
          role={event.role}
          email={event.email}
          id={event.authorId}
        />
      </div>
      <BodyCard event={event} />
    </>
  );
}
