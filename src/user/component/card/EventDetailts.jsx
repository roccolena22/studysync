import moment from "moment";

export default function EventDetails({ event }) {
  const startDate = moment(`${event.startDate} ${event.startTime}`, "MM/DD/YYYY HH:mm");
  const endDate = moment(`${event.endDate} ${event.endTime}`, "MM/DD/YYYY HH:mm");
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
    <div>
      <div className="flex items-center pt-6 sm:pt-4">
        <p className="font-semibold">{event.title}</p>
      </div>
      <div>
        <span className="font-semibold text-sm">Start:</span>
        <span className="text-xs sm:text-sm pl-1">{event.startDate}</span>
        <span className="text-xs sm:text-sm pl-1">{event.startTime}</span>
      </div>
      <div>
        <span className="font-semibold text-sm">Duration:</span>
        <span className="text-xs sm:text-sm pl-1">{formattedDuration}</span>
      </div>
      <div>
        <span className="font-semibold text-sm">Mode:</span>
        <span className="text-xs sm:text-sm pl-1">{event.mode}</span>
      </div>
      {event.location && (
        <div>
          <span className="font-semibold text-sm">Location:</span>
          <span className="text-xs sm:text-sm pl-1">{event.location}</span>
        </div>
      )}
      {event.platform && (
        <div>
          <div>
            <span className="font-semibold text-sm">Platform:</span>
            <span className="text-xs sm:text-sm pl-1">{event.platform}</span>
          </div>
          <div>
            <span className="font-semibold text-sm">Link:</span>
            <span className="text-xs sm:text-sm pl-1">{event.link}</span>
          </div>
        </div>
      )}
      {event.info && (
        <div>
          <span className="font-semibold text-sm">Additional info:</span>
          <span className="text-xs sm:text-sm pl-1">{event.info}</span>
        </div>
      )}
    </div>
  );
}
