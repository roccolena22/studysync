import React, { useEffect, useState } from "react";
import { updateEventFromLocalStorage } from "../hooks/localStorageHooks";
import Popup from "./shared/Popup";
import TitlePage from "./shared/TitlePage";
import EditEventForm from "./form/EditEventForm";
import CardList from "./card/CardList";
import { updateDatabaseRecord } from "../../api/apiRequest";

export default function EventsListContainer({
  loggedUser,
  indexSection,
  events,
  setEditedEvent,
}) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);
  const [partecipantPopupIsOpen, setPartecipantPopupIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  const handleEdit = async (editedEvent) => {
    console.log(editedEvent.apiId);
    const oldEvent = events.find((event) => event.id === editedEvent.id);
    const changedValues = findChangedParams(oldEvent, editedEvent);
    await updateDatabaseRecord("events", editedEvent.apiId, changedValues);
    setEditedEvent(true);
  };

  const handleUpdatePopup = (event) => {
    setSelectedEvent(event);
    setEditPopupIsOpen(!editPopupIsOpen);
  };

  const handleUpdateClosePopup = () => {
    setSelectedEvent(null);
    setEditPopupIsOpen(false);
  };

  const handlePartecipantPopup = () => {
    setPartecipantPopupIsOpen(!partecipantPopupIsOpen);
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
              handlePartecipantPopup={handlePartecipantPopup}
            />
          ) : (
            <CardList
              loggedUser={loggedUser}
              events={events}
              handleDelete={handleDelete}
              handleUpdatePopup={handleUpdatePopup}
              handlePartecipantPopup={handlePartecipantPopup}
            />
          )}
        </div>
      )}

      {editPopupIsOpen && (
        <Popup handleClose={handleUpdateClosePopup}>
          <TitlePage title="Edit event" />
          <EditEventForm event={selectedEvent} handleEdit={handleEdit} />
        </Popup>
      )}
    </div>
  );
}
