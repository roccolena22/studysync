import React, { useEffect, useState } from "react";
import Popup from "./shared/Popup";
import EditEventForm from "./form/EditEventForm";
import EventList from "./card/EventList";
import {
  deleteFromDatabase,
  getFromDatabase,
  updateDatabaseRecord,
} from "../../api/apiRequest";
import { setEvent } from "../../redux/eventsSlice";
import { useDispatch } from "react-redux";
import UsersList from "./user/UserList";

export default function EventsContainer({ loggedUser, indexSection, events, users }) {
  const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [reservationsPopupIsOpen, setReservationsPopupIsOpen] = useState(false);
  const [nextEvents, setNextEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  const dispatch = useDispatch();

  const fetchEvents = async () => {
    const eventsFromDatabase = await getFromDatabase("events");
    const onlyEvents = eventsFromDatabase.map((event) => ({
      ...event.fields,
    }));
    const transformArray = (onlyEvents) => {
      return onlyEvents.map((originalObject) => {
        const transformed = { ...originalObject };
        transformed.authorId = originalObject.authorId[0];
        transformed.lastName = originalObject.lastName[0];
        transformed.firstName = originalObject.firstName[0];
        transformed.email = originalObject.email[0];
        transformed.bookedIds = originalObject.bookedIds;

        return transformed;
      });
    };

    const transformedEventsArray = transformArray(onlyEvents);
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

  const updateEvent = async (editedEvent) => {
    const fullEvent = {
      authorId: editedEvent.authorId,
      title: editedEvent.title,
      mode: editedEvent.mode,
      location:
        editedEvent.mode === "In person" || editedEvent.mode === "Mixed"
          ? editedEvent.location
          : "",
      platform:
        editedEvent.mode === "Remotely" || editedEvent.mode === "Mixed"
          ? editedEvent.platform
          : "",
      startTime: editedEvent.startTime,
      endTime: editedEvent.endTime,
      places: editedEvent.places,
      info: editedEvent.info,
      startDate: editedEvent.startDate,
      endDate: editedEvent.endDate,
    };

    await updateDatabaseRecord("events", editedEvent.id, fullEvent);
    fetchEvents();
    setEditPopupIsOpen(false);
  };

  const handleUpdatePopup = (event) => {
    setSelectedEvent(event);
    setEditPopupIsOpen(!editPopupIsOpen);
  };

  const handleCloseEditPopup = () => {
    setSelectedEvent(null);
    setEditPopupIsOpen(false);
  };

  const handleReservationsPopup = () => {
    setReservationsPopupIsOpen(!reservationsPopupIsOpen);
  };

  const handleCloseReservationsPopup = () => {
    setReservationsPopupIsOpen(!reservationsPopupIsOpen);
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
              handleUpdatePopup={handleUpdatePopup}
              handleReservationsPopup={handleReservationsPopup}
              indexSection={indexSection}
            />
          ) : (
            <EventList
              loggedUser={loggedUser}
              events={pastEvents}
              users={users}
              handleDelete={handleDelete}
              handleUpdatePopup={handleUpdatePopup}
              handleReservationsPopup={handleReservationsPopup}
              indexSection={indexSection}
            />
          )}
        </div>
      )}

      {editPopupIsOpen && (
        <Popup handleClose={handleCloseEditPopup} title="Edit event">
          <EditEventForm event={selectedEvent} updateEvent={updateEvent} />
        </Popup>
      )}

      {reservationsPopupIsOpen && (
        <Popup
          handleClose={handleCloseReservationsPopup}
          title="List of reservations"
        >
          <UsersList users={users} loggedUser={loggedUser} />
        </Popup>
      )}
    </div>
  );
}
