import React, { useEffect, useState } from "react";
import Popup from "./shared/Popup";
import EditEventForm from "./form/EditEventForm";
import CardList from "./card/CardList";
import { deleteFromDatabase, getFromDatabase, updateDatabaseRecord } from "../../api/apiRequest";
import AlertNotification from "../../shared/component/AlertNotification";
import { setEvent } from "../../redux/eventsSlice";
import { useDispatch } from "react-redux";


export default function EventsListContainer({
  loggedUser,
  indexSection,
  events,
}) {
  const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [alertMessage, setAlertMessage] = useState(false);
  const [reservationsPopupIsOpen, setReservationsPopupIsOpen] = useState(false);
  const dispatch = useDispatch();

    const fetchEvents = async () => {
      const eventsFromDatabase = await getFromDatabase("events");
      const eventsWithApiId = eventsFromDatabase.map((event) => ({
        ...event.fields,
        apiId: event.id,
      }));
      const filteredEvents = eventsWithApiId.filter(
        (event) => event.authorId === loggedUser.id
      );
      dispatch(setEvent(filteredEvents));
    };

    fetchEvents();


  useEffect(() => {
    // Chiamare la funzione fetchEvents all'interno di useEffect
    fetchEvents(loggedUser, dispatch);
  }, [dispatch, loggedUser]);

  const handleDelete = (event) => {
    deleteFromDatabase("events", event.apiId);
    fetchEvents();
  };

  const updateEvent = async (editedEvent) => {
    const oldEvent = events.find((event) => event.id === editedEvent.id);
    const changedValues = findChangedParams(oldEvent, editedEvent);
    await updateDatabaseRecord("events", editedEvent.apiId, changedValues);
    fetchEvents();
    setAlertMessage(true);
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

  const handleAlertClose = () => {
    setAlertMessage(!alertMessage);
  };
  const handleReservationsPopup = () => {
    setReservationsPopupIsOpen(!reservationsPopupIsOpen);
  };

  const handleCloseReservationsPopup = () => {
    setReservationsPopupIsOpen(!reservationsPopupIsOpen);
    setReservationsPopupIsOpen(false);
  };

  
  return (
    <div className="w-full">
      {events && (
        <div className="w-full">
          {indexSection === 0 ? (
            <CardList
              loggedUser={loggedUser}
              events={events}
              handleDelete={handleDelete}
              handleUpdatePopup={handleUpdatePopup}
              handleReservationsPopup={handleReservationsPopup}
            />
          ) : (
            <CardList
              loggedUser={loggedUser}
              events={events}
              handleDelete={handleDelete}
              handleUpdatePopup={handleUpdatePopup}
              handleReservationsPopup={handleReservationsPopup}
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

      {alertMessage && (
        <AlertNotification
          message="event edited successfully"
          onClose={handleAlertClose}
        />
      )}
    </div>
  );
}
