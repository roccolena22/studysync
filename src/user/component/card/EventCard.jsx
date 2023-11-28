import HeaderCard from "./HeaderCard";
import moment from "moment";
import OptionsCard from "./OptionsCard";
import { useLocation } from "react-router-dom";
import Button from "../../../shared/component/Button";

export default function EventCard({
  event,
  handleDelete,
  handleEditPopup,
  users,
  handleReservationsPopup,
  indexSection,
}) {
  const location = useLocation();
  const startDate = moment(
    `${event.startDate} ${event.startTime}`,
    "MM/DD/YYYY HH:mm"
  );
  const endDate = moment(
    `${event.endDate} ${event.endTime}`,
    "MM/DD/YYYY HH:mm"
  );
  const duration = moment.duration(endDate.diff(startDate));

  let formattedDuration;

  if (duration.hours() === 0) {
    // Se le ore sono 0, mostra solo i minuti
    formattedDuration = `${duration.minutes()} min`;
  } else {
    // Altrimenti, mostra sia ore che minuti
    formattedDuration = `${duration.hours()}h ${duration.minutes()}m`;
  }
  return (
    <div className="w-full">
      <HeaderCard
        event={event}
        users={users}
        handleReservationsPopup={handleReservationsPopup}
      />
      <div className="pb-2">
        <div className="flex items-center pt-6 sm:pt-4">
          <p className="text-md font-semibold text-green-700">{event.title}</p>
        </div>
        <div className="py-2">
          <div className="text-gray-700">
            <span className="font-semibold text-sm">Start:</span>
            <span className="text-xs sm:text-sm pl-1">{event.startDate}</span>
            <span className="text-xs sm:text-sm pl-1">{event.startTime}</span>
          </div>
          <div className="text-gray-700">
            <span className="font-semibold text-sm">Duration:</span>
            {formattedDuration}
          </div>
          {event.mode && (
            <div className="text-gray-700">
              <span className="font-semibold text-sm">Mode:</span>
              <span className="text-xs sm:text-sm pl-1">{event.mode}</span>
            </div>
          )}
          {event.location && (
            <div className="text-gray-700">
              <span className="font-semibold text-sm">Location:</span>
              <span className="text-xs sm:text-sm pl-1">{event.location}</span>
            </div>
          )}
          {event.info && (
            <div className="text-gray-700">
              <span className="font-semibold text-sm">Additional info:</span>
              <span className="text-xs sm:text-sm pl-1">{event.info}</span>
            </div>
          )}
        </div>
        <div className="flex justify-end">
          {location.pathname !== "/network" ? (
            <OptionsCard
              event={event}
              handleOpenEditPopup={handleEditPopup}
              handleDelete={handleDelete}
              indexSection={indexSection}
            />
          ) : (
            <Button small name="Join" />
          )}
        </div>
      </div>
    </div>
  );
}
