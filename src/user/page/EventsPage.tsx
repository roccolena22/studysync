import { useEffect, useState } from "react";
import PersonalCalendar from "../component/PersonalCalendar";
import Title from "../component/shared/Title";
import Legend from "../component/Legend";
import SwitchButton from "../component/navigation/SwitchButton";
import EventList from "../component/card/EventList";
import NewEvent from "../component/shared/NewEvent";
import { useSelector } from "react-redux";
import Message from "../../shared/component/Message";
import moment from "moment";
import { getEventRecordsByFilter } from "../../api/apiEvents";
import { getBookingByFilter } from "../../api/apiBookings";
import { EventModel } from "../models";
import Loader from "../../shared/component/Loader"; // importa il loader
import { DefaultColor } from "../../shared/models";

export default function EventsPage() {
  const [indexSwitch, setIndexSwitch] = useState<number>(0);
  const [nextEvents, setNextEvents] = useState<EventModel[]>([]);
  const loggedUserId = useSelector((state: any) => state.auth.user.id);
  const [activeEvents, setActiveEvents] = useState<EventModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // stato loading

  const handleSwitch = (index: number) => {
    setIndexSwitch(index);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        // 1) Prendi tutti i bookings dell'utente
        const bookingsFormula = `{bookedId} = '${loggedUserId}'`;
        const userBookings = await getBookingByFilter(bookingsFormula);

        const bookedEventIds = userBookings.map((b: any) => b.eventId);
        console.log("bookedEventIds", bookedEventIds);

        // 2) Formula per prendere gli eventi creati o prenotati
        let eventsFormula = `{authorId} = '${loggedUserId}'`;
        if (bookedEventIds.length > 0) {
          const idsOR = bookedEventIds
            .map((id) => `{id} = '${id}'`)
            .join(",");
          eventsFormula = `OR(
            {authorId} = '${loggedUserId}',
            ${idsOR}
          )`;
        }

        const events = await getEventRecordsByFilter(eventsFormula);

        // 3) Filtra solo eventi futuri
        const currentDate = moment();
        const activeEvents = events.filter((event) =>
          moment(`${event.endDate} ${event.endTime}`, "YYYY-MM-DD HH:mm").isSameOrAfter(currentDate)
        );

        setActiveEvents(activeEvents);
        setNextEvents(events);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false); // fine caricamento
      }
    };

    if (loggedUserId) fetchEvents();
  }, [loggedUserId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size="h-22 w-22" color={DefaultColor.TEXT_PRIMARY_COLOR}
 />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center relative">
      <Title title="Events">
        <div className="flex flex-col gap-2 sm:flex-row align-center justify-center items-center sm:space-x-4">
          <NewEvent name="New event" />
          <SwitchButton
            firstItem="grid"
            secondItem="calendar"
            handleSwitch={handleSwitch}
            indexSwitch={indexSwitch}
          />
        </div>
      </Title>
      <div className="w-full">
        {indexSwitch === 0 ? (
          <EventList eventsToShow={activeEvents} />
        ) : (
          <div className="flex flex-col items-center pt-8">
            <div className="pb-6">
              <Legend
                colorOne="bg-green-500"
                colorTwo="bg-orange-600"
                textOne="Your events"
                textTwo="Events you attend"
              />
            </div>
            <PersonalCalendar events={nextEvents} />
            <Message
              text="Use the calendar to choose when to create your event"
              iconName="light"
              iconStyle="text-yellow-400"
            />
          </div>
        )}
      </div>
    </div>
  );
}
