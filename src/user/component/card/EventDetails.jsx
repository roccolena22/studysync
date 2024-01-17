import moment from "moment";
import EventItem from "./EventItem";
import Badge from "../shared/Badge";

export default function EventDetails({ event, isUnderway }) {
  const startDateToView = `${event.startDate} ${event.startTime}`;

  const startDate = moment(`${startDateToView}`, "YYYY-MM-DD HH:mm");
  const endDate = moment(
    `${event.endDate} ${event.endTime}`,
    "YYYY-MM-DD HH:mm"
  );
  const duration = moment.duration(endDate.diff(startDate));

  let formattedDuration = "";

  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();

  if (days > 0) {
    formattedDuration += `${days} ${days === 1 ? "day" : "days"}`;
  }

  if (hours > 0) {
    formattedDuration += ` ${hours} ${hours === 1 ? "hour" : "hours"}`;
  }

  if (minutes > 0) {
    formattedDuration += ` ${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  }

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-2 sm:flex-row-reverse justify-between sm:items-center pt-2 sm:pt-4 pb-4">
        <div className="space-x-1 items-center flex justify-center">
          {isUnderway && <Badge text="underway" />}
          {event.bookingsRecordId &&
            event.bookingsRecordId.length >= event.places && (
              <Badge text="soldout" />
            )}
        </div>
        <p className="font-bold text-md sm:text-lg">{event.title}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 text-xs sm:text-sm md:text-md">
        <EventItem label="Start" text={startDateToView} />
        <EventItem label="Duration" text={formattedDuration} />
        <EventItem label="Mode" text={event.mode} />

        {event.location && <EventItem label="Location" text={event.location} />}

        {event.platform && <EventItem label="Platform" text={event.platform} />}

        {event.platform && event.link && (
          <EventItem label="Link" link={event.link} />
        )}
        {event.info && <EventItem label="Info" text={event.info} />}
      </div>
    </div>
  );
}
