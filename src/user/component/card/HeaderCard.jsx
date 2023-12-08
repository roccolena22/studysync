import Badge from "../Badge";
import IconAndName from "../user/IconAndName";

export default function HeaderCard({
  event,
  handleReservationsPopup,
  bookedUsers,
}) {
  const fullName = `${event.firstName} ${event.lastName}`;

  return (
    <div>
      <div className="flex justify-between items-center border-b border-zinc-400 pb-1 rounded-t-lg">
        <div>
          <div className="space-x-1">
            <span>{fullName}</span>
          </div>
          <p className="text-xs text-zinc-400">{event.email}</p>
        </div>
        <div className="flex items-center space-x-2">
          {bookedUsers.length >= event.places && <Badge text="Soldout" />}
          <IconAndName
            iconName="group"
            onClick={() => handleReservationsPopup()}
            label={`(${bookedUsers.length}${
              event.places ? "/" + event.places : ""
            })`}
          />
        </div>
      </div>
    </div>
  );
}
