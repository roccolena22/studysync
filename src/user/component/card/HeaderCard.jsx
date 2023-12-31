import Badge from "../Badge";
import IconAndName from "../user/IconAndName";
import UserDetails from "../user/UserDetails";

export default function HeaderCard({
  event,
  handleReservationsPopup,
}) {

  return (
    <>
      <UserDetails user={event} />
      {event.places && (
        <div className="flex items-center space-x-2">
          {event.bookingsRecordId && event.bookingsRecordId.length >= event.places && <Badge text="soldout" />}
          <IconAndName
            iconName="group"
            onClick={() => handleReservationsPopup()}
            label={`${event.bookingsRecordId ? event.bookingsRecordId.length : "0"}${event.places ? "/" + event.places : ""
              }`}
          />
        </div>
      )}
    </>
  );
}
