import HeaderCard from "./HeaderCard";
import OptionsCard from "./OptionsCard";
import { useLocation } from "react-router-dom";
import Button from "../../../shared/component/Button";
import EventDetails from "./EventDetailts";

export default function EventCard({
  event,
  handleDelete,
  handleEditPopup,
  users,
  handleReservationsPopup,
  indexSection,
  addToBooked,
}) {
  const location = useLocation();

  return (
    <div className="w-full h-60 relative">
      <HeaderCard
        event={event}
        users={users}
        handleReservationsPopup={handleReservationsPopup}
      />
      <div className="pb-2">
        <EventDetails event={event} />
      </div>
      <div className="absolute bottom-0 right-0">
        {location.pathname !== "/network" ? (
          <OptionsCard
            event={event}
            handleOpenEditPopup={handleEditPopup}
            handleDelete={handleDelete}
            indexSection={indexSection}
          />
        ) : (
          <Button small name="Join" onClick={() => addToBooked(event.id)} />
        )}
      </div>
    </div>
  );
}
