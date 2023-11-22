import React, { useEffect, useState } from "react";
import {
  deleteEventFromLocalStorage,
  updateEventFromLocalStorage,
} from "../hooks/localStorageHooks";
import Popup from "./shared/Popup";
import TitlePage from "./shared/TitlePage";
import EditEventForm from "./form/EditEventForm";
import CardList from "./card/CardList";
import { getUser } from "../hooks/getUser";

export default function EventsListContainer({ loggedUser, indexSection, events }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [editedEvent, setEditedEvent] = useState(false);
  const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);
  const [partecipantPopupIsOpen, setPartecipantPopupIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
 
  useEffect(() => {
    setIsDeleted(false);
    setEditedEvent(false);
  }, [isDeleted, editedEvent, loggedUser]);

  const handleDelete = (event) => {
    deleteEventFromLocalStorage(loggedUser.email, event.uuid);
    setIsDeleted(true);
  };

  const handleEdit = (editedEvent) => {
    updateEventFromLocalStorage(
      loggedUser.email,
      editedEvent.uuid,
      editedEvent
    );
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
