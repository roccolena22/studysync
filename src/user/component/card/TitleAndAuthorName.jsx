import BadgeAndAuthorName from "./BadgeAndAuthorName";

export default function TitleAndAuthorName({ event }) {
  const fullName = `${event.firstName} ${event.lastName}`;

  return (
    <div className="flex justify-between w-full px-6">
      <span className="font-semibold">- {event.title}</span>
      <BadgeAndAuthorName fullName={fullName} role={event.role}/>
    </div>
  );
}
