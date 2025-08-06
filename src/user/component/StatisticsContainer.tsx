import React, { useState, useEffect } from "react";
import moment, { Moment } from "moment";
import ManageUsers from "./user/ManageUsers";
import Gadget from "./Gadget";
import TitleAndAuthorName from "./card/TitleAndAuthorName";
import { useSelector } from "react-redux";
import { sortEventsByTime } from "../Utilities/sortEventsByTime";

interface StatisticsContainerProps {
  activeEvents: any[] | null;
}

interface EventType {
  id: string;
  title: string;
  role: string;
  firstName: string;
  lastName: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  bookingsRecordId?: string[];
}

interface BookingType {
  id: string;
  bookedId: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface RemainingTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function StatisticsContainer({
  activeEvents,
}: StatisticsContainerProps): JSX.Element {
  const [bookedEvents, setBookedEvents] = useState<EventType[]>([]);
  const loggedUser = useSelector((state: any) => state.auth.user) as User;
  const events = useSelector((state: any) => state.events as EventType[]);
  const nextEvents = useSelector(
    (state: any) => state.nextEvents as EventType[]
  );
  const bookings = useSelector(
    (state: any) => state.bookings as BookingType[]
  );

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
  }, [events, bookings, loggedUser.id]);

  const sortedEvents = nextEvents.length > 0 ? sortEventsByTime(nextEvents) : [];

  const startEvent: Moment = moment(
    `${sortedEvents[0]?.startDate} ${sortedEvents[0]?.startTime}`,
    "YYYY-MM-DD HH:mm"
  );

  const [remainingTime, setRemainingTime] = useState<RemainingTime>(
    getRemainingTime(startEvent)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(getRemainingTime(startEvent));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startEvent]);

  function getRemainingTime(startEvent: Moment): RemainingTime {
    const currentDate = moment();
    const timeDiff = moment.duration(startEvent.diff(currentDate));

    return {
      days: timeDiff.days(),
      hours: timeDiff.hours(),
      minutes: timeDiff.minutes(),
      seconds: timeDiff.seconds(),
    };
  }

  function formatTimeValue(value: number, unit: string): string {
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

  function countEventsForToday(events: EventType[]): number {
    const today = moment().format("YYYY-MM-DD");
    return events.filter((event) => event.startDate === today).length;
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
        <ManageUsers />
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
          <Gadget
            title="Today's events:"
            value={countEventsForToday(nextEvents)}
          />
          <Gadget title="All next events:" value={nextEvents.length} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Gadget
          title="My active events:"
          value={activeEvents ? activeEvents.length : "0"}
        />
        <Gadget
          title="Events I am booked for:"
          value={bookedEvents.length}
        />
      </div>
      {underwayEvents.length > 0 && (
        <div>
          <Gadget title={`Events underway now: ${underwayEvents.length}`}>
            {underwayEvents.map((e) => (
              <TitleAndAuthorName
                key={e.id}
                title={e.title}
                role={e.role}
                firstName={e.firstName}
                lastName={e.lastName}
              />
            ))}
          </Gadget>
        </div>
      )}
      {underwayEvents.length === 0 && nextEvents.length > 0 && (
        <Gadget title="Next event starts in:" value={remainingTimeString} />
      )}
    </div>
  );
}
