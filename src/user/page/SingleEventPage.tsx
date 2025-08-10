import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventCard from "../component/card/EventCard";
import { getEventRecord } from "../../api/apiEvents";
import { getBookingByFilter } from "../../api/apiBookings";
import Loader from "../../shared/component/Loader";
import { EventModel } from "../models";
import { DefaultColor } from "../../shared/models";

export default function SingleEventPage() {
  const { id } = useParams<{ id: string }>();

  const [event, setEvent] = useState<EventModel | null>(null);
  const [bookedUsers, setBookedUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


console.log("event", event)

  useEffect(() => {
    async function fetchEventAndBookings() {
      if (!id) return;

      try {
        setLoading(true);

        // 1. Prendi i dettagli evento
        const eventData = await getEventRecord(id);

        if (eventData) {
          // Converte le date da string a Date
          const eventWithDates: EventModel = {
            ...eventData,
            startDate: new Date(eventData.startDate),
            endDate: new Date(eventData.endDate),
          };
          setEvent(eventWithDates);
        } else {
          setEvent(null);
        }

        // 2. Prendi prenotazioni legate a questo evento
        const formula = `{eventId} = '${id}'`;
        const bookings = await getBookingByFilter(formula);
        setBookedUsers(bookings);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchEventAndBookings();
  }, [id]);

  if (loading) {
    return (
       <div className="flex justify-center items-center h-screen">
        <Loader size="h-22 w-22" color={DefaultColor.TEXT_PRIMARY_COLOR} />
      </div>
    );
  }

  if (!event) {
    return <p className="text-center py-10">Evento non trovato</p>;
  }

  // funzione placeholder per aggiornare prenotazioni (da implementare)
  const updateBookingForEvent = (updatedBooking: any) => {
    // Qui puoi fare PATCH o POST e aggiornare stato
    console.log("Update booking:", updatedBooking);
  };

  return (
    <>
      <EventCard
        event={event}
        bookedUsers={bookedUsers}
        updateBookingForEvent={updateBookingForEvent}
      />
    </>
  );
}
