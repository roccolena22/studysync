import moment from "moment";
import EventItem from "./EventItem";
import Badge from "../shared/Badge";

export default function EventDetails({ event, isUnderway }) {
  const startDateToView = `${event.startDate} ${event.startTime}`;

  const startDate = moment(`${startDateToView}`, "YYYY-MM-DD HH:mm");
  const endDate = moment(`${event.endDate} ${event.endTime}`, "YYYY-MM-DD HH:mm");
  const duration = moment.duration(endDate.diff(startDate));

  let formattedDuration = '';

  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();

  if (days > 0) {
    formattedDuration += `${days} ${days === 1 ? 'day' : 'days'}`;
  }

  if (hours > 0) {
    formattedDuration += ` ${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  }

  if (minutes > 0) {
    formattedDuration += ` ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
  }

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-2 sm:flex-row-reverse justify-between sm:items-center  py-4">
        <div className="space-x-1 items-center">
          {isUnderway && <Badge text="underway" />}
          {event.bookingsRecordId && event.bookingsRecordId.length >= event.places && <Badge text="soldout" />}
        </div>
        <p className="font-bold text-lg">{event.title}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <EventItem label="Start" value={startDateToView} />
        <EventItem label="Duration" value={formattedDuration} />
        <EventItem label="Mode" value={event.mode} />

        {event.location && (
          <EventItem label="Location" value={event.location} />
        )}

        {event.platform && (
          <EventItem label="Platform" value={event.platform} />
        )}

        {event.platform && event.link && (
          <div>
            <p className="text-gray-600 font-semibold sm:text-lg">Link</p>
            <a href={event.link} className="text-xs md:text-md text-cyan-700 cursor-pointer underline">{event.link.slice(0, 15) + "..."}</a>
          </div>
        )}
        {event.info && (
          <EventItem label="Info" value={event.info} />
        )}
      </div>

    </div>

  )
}
