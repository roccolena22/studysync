import React, { useState, useEffect } from "react";
import moment from "moment";
import ManageUsers from "../user/ManageUsers";
import Gadget from "../user/Gadget";
import { sortEvents } from "../../Utilities/timeutils";

export default function StatisticsSection({
  users,
  followers,
  loggedUser,
  activeEvents,
  bookedEvents,
  fetchFollowers,
  nextEvents,
}) {
  const sortedEvents= sortEvents(nextEvents)

  const startDate = moment(
    `${sortedEvents[0]?.startDate} ${sortedEvents[0]?.startTime}`,
    "YYYY-MM-DD HH:mm"
  );

  const [remainingTime, setRemainingTime] = useState(
    getRemainingTime(startDate)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(getRemainingTime(startDate));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startDate]);

  function getRemainingTime(start) {
    const currentDate = moment();
    const timeDiff = moment.duration(start.diff(currentDate));

    const remainingDays = timeDiff.days();
    const remainingHours = timeDiff.hours();
    const remainingMinutes = timeDiff.minutes();
    const remainingSeconds = timeDiff.seconds();

    return {
      days: remainingDays,
      hours: remainingHours,
      minutes: remainingMinutes,
      seconds: remainingSeconds,
    };
  }

  function formatTimeValue(value, unit) {
    return value > 0 ? `${value} ${unit}${value !== 1 ? "s" : ""}` : "";
  }

  const remainingTimeString = [
    formatTimeValue(remainingTime.days, "day"),
    formatTimeValue(remainingTime.hours, "hour"),
    formatTimeValue(remainingTime.minutes, "minute"),
    formatTimeValue(remainingTime.seconds, "second"),
  ]
    .filter(Boolean)
    .join(", ");

  function countEventsForToday(events) {
    const today = moment().format("YYYY-MM-DD");

    const eventsForToday = events.filter((event) => {
      return event.startDate === today;
    });

    return eventsForToday.length;
  }

  const isEventUnderway = moment().isBetween(
    startDate,
    moment(sortedEvents[0]?.endDate + " " + sortedEvents[0]?.endTime)
  );

  return (
    <div className="grid grid-cols-1 gap-2 pt-6 w-full">
      <div className="grid gap-2 sm:grid-cols-2">
        <ManageUsers
          users={users}
          followers={followers}
          loggedUser={loggedUser}
          fetchFollowers={fetchFollowers}
        />
        <div className="grid grid-cols-1 gap-2">
          <Gadget
            title="Today's events:"
            value={countEventsForToday(nextEvents)}
          />
          <Gadget title="All next events:" value={nextEvents.length} />
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 w-full">
        <Gadget
          title="My active events:"
          value={activeEvents ? activeEvents.length : "0"}
        />
        <Gadget
          title="Events I am booked for:"
          value={bookedEvents ? bookedEvents.length : "0"}
        />
      </div>
      {isEventUnderway && <Gadget title="An event is underway now" value="" />}
      {!isEventUnderway && nextEvents.length > 0 && (
        <Gadget title="Next event starts in:" value={remainingTimeString} />
      )}
    </div>
  );
}
