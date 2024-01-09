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
    <div className=" w-full">
      <div className=" py-4">
        <p className="font-bold">{event.title}</p>
      </div>
      <div className="">
        <div>
          <p className="text-slate-600 font-semibold text-md">Start</p>
          <div className="flex space-x-1">
            <span className="text-xs md:text-md">{event.startDate}</span>
            <span className="text-xs md:text-md">{event.startTime}</span>
          </div>

        </div>
        <div>
          <p className="text-slate-600 font-semibold text-md">Duration</p>
          <span className="text-xs md:text-md">{formattedDuration}</span>
        </div>
      </div>

      <div className="">
        <div>
          <p className="text-slate-600 font-semibold text-md">Mode</p>
          <span className="text-xs md:text-md">{event.mode}</span>
        </div>

        <div>
          {event.location && (
            <div>
              <p className="text-slate-600 font-semibold text-md">Location</p>
              <span className="text-xs md:text-md">{event.location}</span>
            </div>
          )}
          {event.platform && (
            <div>
              <p className="text-slate-600 font-semibold text-md">Platform</p>
              <span className="text-xs md:text-md">{event.platform}</span>
            </div>
          )}
        </div>
      </div>

      {event.platform && (
        <div className="">
          <p className="text-slate-600 font-semibold text-md">Link</p>
          <a href={event.link} className="text-xs md:text-md text-cyan-700 cursor-pointer underline">{event.link}</a>
        </div>
      )}

      {event.info && (
        <div className="">
          <p className="text-slate-600 font-semibold text-md">Additional info</p>
          <span className="text-xs md:text-md">{event.info}</span>
        </div>
      )}
    </div>

  );
}
