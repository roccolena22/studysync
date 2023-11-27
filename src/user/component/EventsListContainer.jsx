import React, { useEffect, useState } from "react";
import Popup from "./shared/Popup";
import EditEventForm from "./form/EditEventForm";
import CardList from "./card/CardList";
import { updateDatabaseRecord } from "../../api/apiRequest";
import AlertNotification from "../../shared/component/AlertNotification";

export default function EventsListContainer({
  loggedUser,
  indexSection,
  events,
  handleEditEvent,
}) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [alertMessage, setAlertMessage] = useState(false);
  const [reservationsPopupIsOpen, setReservationsPopupIsOpen] = useState(false);

  const handleDelete = (event) => {
    // deleteEventFromLocalStorage(loggedUser.email, event.uuid);
    setIsDeleted(true);
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

  const updateEvent = async (editedEvent) => {
    const oldEvent = events.find((event) => event.id === editedEvent.id);
    const changedValues = findChangedParams(oldEvent, editedEvent);
    await updateDatabaseRecord("events", editedEvent.apiId, changedValues);
    handleEditEvent(true);
    setAlertMessage(true);
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
