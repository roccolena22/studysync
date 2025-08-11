import ManageUsers from "./user/ManageUsers";
import Gadget from "./Gadget";
import TitleAndAuthorName from "./card/TitleAndAuthorName";
import { EventModel } from "../models";
import moment from "moment";

interface StatisticsContainerProps {
  userPastEvents: EventModel[];
  userActiveEvents: EventModel[];
  userAllActiveEvents: EventModel[];
  loggedUserId: string;
}

export default function StatisticsContainer({
  userPastEvents,
  userActiveEvents,
  userAllActiveEvents,
  loggedUserId,
}: StatisticsContainerProps): JSX.Element {
  const now = moment();

  const nextEvents = userAllActiveEvents.filter((e) =>
    moment(`${e.startDate}`, "YYYY-MM-DD HH:mm").isAfter(now)
  );

  const underwayEvents = userAllActiveEvents.filter((e) =>
    now.isBetween(
      moment(`${e.startDate}`, "YYYY-MM-DD HH:mm"),
      moment(`${e.endDate}`, "YYYY-MM-DD HH:mm")
    )
  );

  const bookedEvents = userAllActiveEvents.filter((e) =>
    e.bookingsRecordId?.includes(loggedUserId)
  );

  const countEventsForToday = (events: EventModel[]) => {
    const today = moment().format("YYYY-MM-DD");
    return events.filter((e) => e.startDate === today).length;
  };

  // ✅ Eventi creati dall'utente loggato
  const myEvents = [...userActiveEvents, ...userPastEvents];

  const totalBookings = myEvents.reduce(
    (acc, e) => acc + (e.bookingsRecordId?.length || 0),
    0
  );

  const eventsWithBookings = myEvents.filter((e) => e.bookingsRecordId?.length);
  const averageBookings =
    eventsWithBookings.length > 0
      ? (totalBookings / eventsWithBookings.length).toFixed(1)
      : "—";

  // ✅ Eventi passati a cui l’utente era solo prenotato (non autore)
  const participatedEvents = userAllActiveEvents.filter(
    (e) =>
      e.bookingsRecordId?.includes(loggedUserId) &&
      e.authorId !== loggedUserId &&
      moment(`${e.endDate}`, "YYYY-MM-DD HH:mm").isBefore(now)
  );

  const remainingTimeString = nextEvents.length
    ? moment(
        `${nextEvents[0].startDate}`,
        "YYYY-MM-DD HH:mm"
      ).fromNow()
    : "";

  return (
    <div className="grid grid-cols-1 gap-2 w-full">
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
        <Gadget title="My active events:" value={userActiveEvents.length} />
        <Gadget title="Events I am booked for:" value={bookedEvents.length} />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Gadget title="Total bookings on my events:" value={totalBookings} />
        <Gadget title="Avg. bookings per my event:" value={averageBookings} />
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
