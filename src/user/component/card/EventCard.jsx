import HeaderCard from "./HeaderCard";
import Button from "../../../shared/component/Button";
import EventDetails from "./EventDetailts";
import FooterCard from "./FooterCard";
import EditEventForm from "../form/EditEventForm";
import UsersList from "../user/UserList";
import { useState } from "react";
import Popup from "../shared/Popup";
import {getRecordFromDatabase, updateDatabaseRecord } from "../../../api/apiRequest";

export default function EventCard({
  loggedUser,
  event,
  handleDelete,
  addToBooked,
  indexSection,
  users,
  fetchEvents,
}) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);
  const [reservationsPopupIsOpen, setReservationsPopupIsOpen] = useState(false);

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

  
const fetchBookeds = async () =>{
  const bookedUsers = await getRecordFromDatabase("users", "iddellutente")
  console.log(bookedUsers)
}


  const updateEvent = async (editedEvent) => {
    const fullEvent = {
      authorId: [editedEvent.authorId],
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
  return (
    <>
      <div className="w-full h-60 relative ">
        <HeaderCard
          event={event}
          handleReservationsPopup={handleReservationsPopup}
        />
        <div className="pb-2">
          <EventDetails event={event} />
        </div>
        <div className="absolute bottom-0 right-0">
          {handleDelete && (
            <FooterCard
              event={event}
              handleOpenEditPopup={() => handleUpdatePopup(event)}
              handleDelete={handleDelete}
              indexSection={indexSection}
            />
          )}
          {loggedUser.id !== event.authorId && (
            <Button small name="Join" onClick={() => addToBooked(event)} />
          )}
        </div>
      </div>
      {reservationsPopupIsOpen && (
        <Popup
          handleClose={handleCloseReservationsPopup}
          title="List of reservations"
        >
          <UsersList users={users} loggedUser={loggedUser} />
        </Popup>
      )}
      {editPopupIsOpen && (
        <Popup handleClose={handleCloseEditPopup} title="Edit event">
          <EditEventForm event={selectedEvent} updateEvent={updateEvent} />
        </Popup>
      )}
    </>
  );
}
