import React, { useState, useEffect } from "react";
import moment from "moment";
import ManageUsers from "../user/ManageUsers";
import Gadget from "../user/Gadget";
import { sortEventsForTime } from "../../Utilities/timeutils";
import TitleAndAuthorName from "../card/TitleAndAuthorName";
import { useSelector } from "react-redux";

export default function StatisticsSection({ activeEvents }) {
  const [bookedEvents, setBookedEvents] = useState([]);
  const loggedUser = useSelector((state) => state.auth.user);
  const events = useSelector((state) => state.events);
  const nextEvents = useSelector((state) => state.nextEvents);
  const bookings = useSelector((state) => state.bookings);
  const sortedEvents = nextEvents.length > 0 ? sortEventsForTime(nextEvents) : [];

  useEffect(() => {
    const handleBookedEvents = async () => {
      const eventsByBooked =
        events &&
        events.filter((event) => {
          if (event.bookingsRecordId) {
            return event.bookingsRecordId.some((bookingId) =>
              bookings.some(
                (booking) =>
                  bookingId === booking.id && booking.bookedId === loggedUser.id
              )
            );
          }
          return false;
        });
      setBookedEvents(eventsByBooked);
    };
    handleBookedEvents();
  }, [events, bookings, loggedUser]);

  const startEvent = moment(
    `${sortedEvents[0]?.startDate} ${sortedEvents[0]?.startTime}`,
    "YYYY-MM-DD HH:mm"
  );

  const [remainingTime, setRemainingTime] = useState(
    getRemainingTime(startEvent)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(getRemainingTime(startEvent));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startEvent]);

  function getRemainingTime(startEvent) {
    const currentDate = moment();
    const timeDiff = moment.duration(startEvent.diff(currentDate));

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

  const underwayEvents = sortedEvents.filter((event) =>
    moment().isBetween(
      moment(`${event.startDate} ${event.startTime}`),
      moment(`${event.endDate} ${event.endTime}`)
    )
  );

  return (
    <div className="grid grid-cols-1 gap-2 pt-6 w-full">
      <div className="grid gap-2 sm:grid-cols-2">
        <ManageUsers loggedUser={loggedUser} />
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
      {underwayEvents.length > 0 && (
        <div>
          <Gadget title={`Events underway now: ${underwayEvents.length}`}>
            {underwayEvents.map((event) => (
              <TitleAndAuthorName key={event.id} event={event} />
            ))}
          </Gadget>
        </div>
      )}
      {!underwayEvents && nextEvents.length > 0 && (
        <Gadget title="Next event starts in:" value={remainingTimeString} />
      )}
    </div>
  );
}
