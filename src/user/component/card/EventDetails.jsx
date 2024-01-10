import moment from "moment";
import EventItem from "./EventItem";

export default function EventDetails({ event }) {
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
    <p className="font-bold py-4">{event.title}</p>
  
    <div className="">
      <EventItem label="Start" value={startDateToView} />
      <EventItem label="Duration" value={formattedDuration} />
      <EventItem label="Mode" value={event.mode} />
  
      {event.location && (
        <EventItem label="Location" value={event.location} />
      )}
  
      {event.platform && (
        <EventItem label="Platform" value={event.platform} />
      )}
  
      {event.platform && (
        <div>
          <p className="text-slate-600 font-semibold text-md">Link</p>
          <a href={event.link} className="text-xs md:text-md text-cyan-700 cursor-pointer underline">{event.link}</a>
        </div>
      )}
  
      {event.info && (
        <EventItem label="Additional Info" value={event.info} />
      )}
    </div>
  </div>
  

  );
}
