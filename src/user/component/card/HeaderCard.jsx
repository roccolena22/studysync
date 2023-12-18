import Badge from "../Badge";
import IconAndName from "../user/IconAndName";

export default function HeaderCard({
  event,
  handleReservationsPopup,
}) {
  const fullName = `${event.firstName} ${event.lastName}`;

  return (
    <div>
      <div
        className={`flex justify-between items-center border-b ${event.role.includes("student")
          ? "border-yellow-400"
          : "border-purple-500"
          } pb-1 rounded-t-lg`}
      >
        <div>
          <div className="space-x-1">
            <span>{fullName}</span>
          </div>
          <p className="text-xs text-zinc-400">{event.email}</p>
        </div>
        {event.places && (
          <div className="flex items-center space-x-2">
            {event.bookingsRecordId && event.bookingsRecordId.length >= event.places && <Badge text="soldout" />}
            <IconAndName
              iconName="group"
              onClick={() => handleReservationsPopup()}
              label={`(${event.bookingsRecordId ? event.bookingsRecordId.length : "0"}${event.places ? "/" + event.places : ""
                })`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
