import moment from "moment";

export default function EventDetails ({event}) {

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
        formattedDuration = `${duration.minutes()} min`;
      } else {
        formattedDuration = `${duration.hours()}h ${duration.minutes()}m`;
      }
    return(
        <div>
            <div className="flex items-center pt-6 sm:pt-4">
          <p className="text-md font-semibold text-rose-500">{event.title}</p>
        </div>
        <div className="text-gray-700">
          <span className="font-semibold text-sm">Start:</span>
          <span className="text-xs sm:text-sm pl-1">{event.startDate}</span>
          <span className="text-xs sm:text-sm pl-1">{event.startTime}</span>
        </div>
        <div className="text-gray-700">
          <span className="font-semibold text-sm">Duration:</span>
          <span className="text-xs sm:text-sm pl-1">{formattedDuration}</span>
        </div>
            <div className="text-gray-700">
              <span className="font-semibold text-sm">Mode:</span>
              <span className="text-xs sm:text-sm pl-1">{event.mode}</span>
            </div>
          {event.location && (
            <div className="text-gray-700">
              <span className="font-semibold text-sm">Location:</span>
              <span className="text-xs sm:text-sm pl-1">{event.location}</span>
            </div>
          )}
          {event.platform && (
            <div className="text-gray-700">
              <span className="font-semibold text-sm">platform:</span>
              <span className="text-xs sm:text-sm pl-1">{event.platform}</span>
            </div>
          )}
        {event.info && (
          <div className="pt-2 text-gray-700">
            <span className="font-semibold text-sm">Additional info:</span>
            <span className="text-xs sm:text-sm pl-1">{event.info}</span>
          </div>
        )}
        </div>
    )
}