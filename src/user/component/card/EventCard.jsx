import HeaderCard from "./HeaderCard";
import Button from "../../../shared/component/Button";
import EventDetails from "./EventDetailts";
import FooterCard from "./FooterCard";

export default function EventCard({
  loggedUser,
  event,
  handleDelete,
  handleEditPopup,
  users,
  handleReservationsPopup,
  addToBooked,
  indexSection,
}) {
  return (
    <div className="w-full h-60 relative ">
      <HeaderCard
        event={event}
        users={users}
        handleReservationsPopup={handleReservationsPopup}
      />
      <div className="pb-2">
        <EventDetails event={event} />
      </div>
      <div className="absolute bottom-0 right-0">
        {handleDelete && (
          <FooterCard
            event={event}
            handleOpenEditPopup={handleEditPopup}
            handleDelete={handleDelete}
            indexSection={indexSection}
          />
        )}
        {loggedUser.id !== event.authorId && (
          <Button small name="Join" onClick={() => addToBooked(event)} />
        )}
      </div>
    </div>
  );
}
