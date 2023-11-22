import TimeBox from "./TimeBox";
import HeaderCard from "./HeaderCard";
import moment from "moment";
import OptionsCard from "./OptionsCard";
import Badge from "../Badge";

export default function EventCard({
  event,
  handleDelete,
  handleEditPopup,
  handlePartecipantPopup,
  users,
}) {
  const startDate = moment(event.start, "MM/DD/YY");
  const endDate = moment(event.end, "MM/DD/YY");

  return (
    <div className="w-full z-10">
      <HeaderCard
        event={event}
        users={users}
        handlePartecipantPopup={handlePartecipantPopup}
      />
      <div className="relative py-4">
        <TimeBox
          date={startDate.format("DD/MM/YY")}
          time={event.startTime}
          status={event.status}
        />
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center pt-6 sm:pt-4">
          <p className="text-md font-semibold text-green-700">{event.title}</p>
          <Badge
            text={event.status}
            handlePartecipantPopup={handlePartecipantPopup}
          />
        </div>
        <div className="py-2">
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
        <div className="flex justify-center sm:justify-end">
          <OptionsCard
            event={event}
            handleOpenEditPopup={handleEditPopup}
            handleDelete={handleDelete}
          />
        </div>
        <TimeBox
          date={endDate.format("DD/MM/YY")}
          time={event.endTime}
          type="end"
          status={event.status}
        />
      </div>
    </div>
  );
}
