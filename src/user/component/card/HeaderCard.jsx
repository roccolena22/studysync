import IconAndName from "../user/IconAndName";

export default function HeaderCard({ event, handleReservationsPopup }) {
  const fullName = `${event.firstName} ${event.lastName}`;

  return (
    <div className="flex justify-between items-center border-b border-zinc-400 pb-1 rounded-t-lg">
      <div>
        <div className="space-x-1">
          <span>{fullName}</span>
        </div>
        <p className="text-xs text-zinc-400">{event.email}</p>
      </div>
      <IconAndName
        iconName="group"
        onClick={() => handleReservationsPopup()}
        label={`(${0}${event.places ? "/" + event.places : ""})`}
      />
    </div>
  );
}
