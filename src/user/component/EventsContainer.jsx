import React, { useEffect, useState } from "react";
import EventList from "./card/EventList";
import {
  deleteFromDatabase,
  getListFromDatabase,
} from "../../api/apiRequest";
import { setEvent } from "../../redux/eventsSlice";
import { useDispatch } from "react-redux";

export default function EventsContainer({ loggedUser, indexSection, events, users }) {
  
  const [nextEvents, setNextEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  const dispatch = useDispatch();

  const fetchEvents = async () => {
    const eventsFromDatabase = await getListFromDatabase("events");
    const transformArray = (eventsFromDatabase) => {
      return eventsFromDatabase.map((originalObject) => {
        const transformed = { ...originalObject };
        transformed.authorId = originalObject.authorId[0];
        transformed.lastName = originalObject.lastName[0];
        transformed.firstName = originalObject.firstName[0];
        transformed.email = originalObject.email[0];
        transformed.bookedIds = originalObject.bookedIds;

        return transformed;
      });
    };

    const transformedEventsArray = transformArray(eventsFromDatabase);
    const filteredEvents = transformedEventsArray.filter(
      (event) => event.authorId === loggedUser.id
    );
    const currentDate = new Date();

    const nextEvents = filteredEvents.filter(
      (event) => new Date(`${event.endDate} ${event.endTime}`) >= currentDate
    );
    const pastEvents = filteredEvents.filter(
      (event) => new Date(`${event.endDate} ${event.endTime}`) < currentDate
    );

    setNextEvents(nextEvents);
    setPastEvents(pastEvents);

    dispatch(setEvent(transformedEventsArray));
  };

  useEffect(() => {
    fetchEvents(loggedUser, dispatch);
  }, [dispatch, loggedUser]);

  const handleDelete = (event) => {
    deleteFromDatabase("events", event.id);
    fetchEvents();
  };

 
  return (
    <div className="w-full">
      {events && (
        <div className="w-full">
          {indexSection === 0 ? (
            <EventList
              loggedUser={loggedUser}
              events={nextEvents}
              users={users}
              handleDelete={handleDelete}
              fetchEvents={fetchEvents}
              indexSection={indexSection}
            />
          ) : (
            <EventList
              loggedUser={loggedUser}
              events={pastEvents}
              users={users}
              handleDelete={handleDelete}
              indexSection={indexSection}
              fetchEvents={fetchEvents}

            />
          )}
        </div>
      )}
    </div>
  );
}
