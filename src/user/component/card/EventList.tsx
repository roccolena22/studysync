import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import SearchBar from "../shared/SearchBar";
import { sortEventsByTime } from "../../Utilities/sortEventsByTime";
import Message from "../../../shared/component/Message";
import { getBookingByFilter } from "../../../api/apiBookings";
import { EventModel, Booking } from "../../models";

interface EventListProps {
  eventsToShow: EventModel[];
}

export default function EventList({ eventsToShow }: EventListProps): JSX.Element {
  const [searchedEvents, setSearchedEvents] = useState<EventModel[]>([]);
  const [bookingsByEvent, setBookingsByEvent] = useState<Record<string, Booking[]>>({});

  const handleSearch = (dataFromSearch?: EventModel[]) => {
    setSearchedEvents(dataFromSearch ?? []);
  };

  // Funzione per aggiornare localmente lo stato delle prenotazioni di un evento
  const updateBookingForEvent = (eventId: string, newBookings: Booking[]) => {
    setBookingsByEvent((prev) => ({
      ...prev,
      [eventId]: newBookings,
    }));
  };

  useEffect(() => {
    const fetchAllBookings = async () => {
      if (eventsToShow.length === 0) return;

      const ids = eventsToShow.map((e) => e.id);
      const formula = `OR(${ids.map((id) => `{eventId}='${id}'`).join(",")})`;

      try {
        const allBookings = await getBookingByFilter(formula);
        // Raggruppa per eventId
        const grouped: Record<string, Booking[]> = {};
        allBookings.forEach((b) => {
          if (!grouped[b.eventId]) grouped[b.eventId] = [];
          grouped[b.eventId].push(b);
        });
        setBookingsByEvent(grouped);
      } catch (error) {
        console.error("Errore nel recupero delle prenotazioni:", error);
      }
    };

    fetchAllBookings();
  }, [eventsToShow]);

  const sortedEvents = sortEventsByTime(eventsToShow);

  return (
    <div className="bg-white shadow-xl px-6 rounded-b-lg w-full">
      {eventsToShow.length > 0 && (
        <div className="sticky top-20 w-full z-10">
          <SearchBar
            placeholder="Search by event date, title or author"
            data={sortedEvents}
            dataFromSearch={handleSearch}
          />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6">
        {(searchedEvents && searchedEvents.length > 0 ? searchedEvents : sortedEvents).map(
          (event, index) => (
            <div
              className={
                sortedEvents.length % 2 === 1 && index === 0
                  ? "sm:col-span-2"
                  : "sm:col-span-1"
              }
              key={event.id ?? index}
            >
              <EventCard
                event={event}
                bookedUsers={bookingsByEvent[event.id] || []}
                updateBookingForEvent={updateBookingForEvent}
              />
            </div>
          )
        )}
      </div>
      {eventsToShow.length <= 0 && (
        <div className="py-6">
          <Message text="No events to show." />
        </div>
      )}
    </div>
  );
}
