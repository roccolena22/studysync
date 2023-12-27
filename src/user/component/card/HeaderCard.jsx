import Badge from "../Badge";
import IconAndName from "../user/IconAndName";

export default function HeaderCard({
  event,
  handleReservationsPriorityPopup,
}) {
  const fullName = `${event.firstName} ${event.lastName}`;

  return (
    <>
      <div>
        <div className="space-x-1">
          <span>{fullName}</span>
        </div>
        <p className="text-xs text-slate-600">{event.email}</p>
      </div>
      {event.places && (
        <div className="flex items-center space-x-2">
          {event.bookingsRecordId && event.bookingsRecordId.length >= event.places && <Badge text="soldout" />}
          <IconAndName
            iconName="group"
            onClick={() => handleReservationsPriorityPopup()}
            label={`${event.bookingsRecordId ? event.bookingsRecordId.length : "0"}${event.places ? "/" + event.places : ""
              }`}
          />
        </div>
      )}
    </>
  );
}
