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

export default function EventsContainer({ loggedUser, indexSection, events }) {
  const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [reservationsPopupIsOpen, setReservationsPopupIsOpen] = useState(false);
  const [nextEvents, setNextEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  const dispatch = useDispatch();

  const fetchEvents = async () => {
    const eventsFromDatabase = await getFromDatabase("events");
    const events = eventsFromDatabase.map((event) => ({
      ...event.fields,
    }));

    const filteredEvents = events.filter(
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

    dispatch(setEvent(events));
  };

  useEffect(() => {
    fetchEvents(loggedUser, dispatch);
  }, [dispatch, loggedUser]);

  const handleDelete = (event) => {
    deleteFromDatabase("events", event.id);
    fetchEvents();
  };

  const updateEvent = async (editedEvent) => {
    const oldEvent = events.find((event) => event.id === editedEvent.id);
    const changedValues = findChangedParams(oldEvent, editedEvent);
    await updateDatabaseRecord("events", editedEvent.id, changedValues);
    fetchEvents();
    setEditPopupIsOpen(false);
  };

  const findChangedParams = (originalObject, updatedObject) => {
    const changedParams = {};

    for (const key in updatedObject) {
      if (
        Object.prototype.hasOwnProperty.call(originalObject, key) &&
        Object.prototype.hasOwnProperty.call(updatedObject, key)
      ) {
        if (originalObject[key] !== updatedObject[key]) {
          changedParams[key] = updatedObject[key];
        }
      }
    }

    return changedParams;
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
              handleDelete={handleDelete}
              handleUpdatePopup={handleUpdatePopup}
              handleReservationsPopup={handleReservationsPopup}
              indexSection={indexSection}
            />
          ) : (
            <EventList
              loggedUser={loggedUser}
              events={pastEvents}
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
