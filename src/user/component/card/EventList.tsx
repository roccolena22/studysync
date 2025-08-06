import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import SearchBar from "../shared/SearchBar";
import { useDispatch } from "react-redux";
import { sortEventsByTime } from "../../Utilities/sortEventsByTime";
import { fetchBookings, fetchEvents, fetchUsers } from "../../Utilities/fetchFunctions";
import Message from "../../../shared/component/Message";

interface EventListProps {
  eventsToShow: any[];
}

export default function EventList({ eventsToShow }: EventListProps): JSX.Element {
  const [searchedEvents, setSearchedEvents] = useState<Event[]>([]);
  const dispatch = useDispatch();

  const handleSearch = (dataFromSearch: Event[]) => {
    setSearchedEvents(dataFromSearch);
  };

  useEffect(() => {
    fetchEvents(dispatch);
    fetchUsers(dispatch);
    fetchBookings(dispatch);
  }, [dispatch]);

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
        {(searchedEvents.length > 0 ? searchedEvents : sortedEvents).map(
          (event, index) => (
            <div
              className={
                sortedEvents.length % 2 === 1 && index === 0
                  ? "sm:col-span-2"
                  : "sm:col-span-1"
              }
              key={event.id ?? index}
            >
              <EventCard event={event} />
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
