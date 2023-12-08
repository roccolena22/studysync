import HeaderCard from "./HeaderCard";
import Button from "../../../shared/component/Button";
import EventDetails from "./EventDetailts";
import FooterCard from "./FooterCard";
import EditEventForm from "../form/EditEventForm";
import UsersList from "../user/UserList";
import { useEffect, useState } from "react";
import Popup from "../shared/Popup";
import {
  getListFromDatabase,
  updateDatabaseRecord,
} from "../../../api/apiRequest";

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
  const [bookedUsers, setBookedUsers] = useState([]);

  const handleUpdatePopup = (event) => {
    setSelectedEvent(event);
    setEditPopupIsOpen(!editPopupIsOpen);
  };

  const handleCloseEditPopup = () => {
    setSelectedEvent(null);
    setEditPopupIsOpen(false);
  };

  const handleReservationsPopup = async () => {
    setReservationsPopupIsOpen(!reservationsPopupIsOpen);
  };

  const handleBookings = async (event) => {
    try {
      const bookings = await getListFromDatabase("bookings");

      if (!event.bookingsRecordId || !bookings.length) {
        console.log("Empty arrays. No action taken.");
        return;
      }

      const idsArray = bookings
        .filter((el) => event.bookingsRecordId.includes(el.id))
        .map((item) => item.bookedId);

      if (!idsArray.length) {
        console.log("Empty idsArray. No action taken.");
        return;
      }

      const bookedUsers = users.filter((el) => idsArray.includes(el.id));
      setBookedUsers(bookedUsers);
    } catch (error) {
      console.error("Error handling reservations:", error);
    }
  };

  useEffect(() => {
    if (event && Array.isArray(event.bookingsRecordId)) {
      handleBookings(event);
    }
  }, [event]);

  const handleCloseReservationsPopup = () => {
    setReservationsPopupIsOpen(!reservationsPopupIsOpen);
  };

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
          bookedUsers={bookedUsers}
        />

        <div className="pb-2 flex justify-between">
          <EventDetails event={event} />
        </div>
        <div className="absolute bottom-0 right-0">
          {loggedUser.id !== event.authorId &&
            bookedUsers.length < event.places && (
              <Button small name="Join" onClick={() => addToBooked(event)} />
            )}
          {handleDelete && (
            <FooterCard
              event={event}
              handleOpenEditPopup={() => handleUpdatePopup(event)}
              handleDelete={handleDelete}
              indexSection={indexSection}
            />
          )}
        </div>
      </div>
      {reservationsPopupIsOpen && (
        <Popup
          handleClose={handleCloseReservationsPopup}
          title="List of reservations"
        >
          {bookedUsers.length > 0 ? (
            <UsersList users={bookedUsers} loggedUser={loggedUser} />
          ) : (
            <p className="pt-6 text-xl text-zinc-400">
              There are no reservations for this event
            </p>
          )}
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
