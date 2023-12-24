import HeaderCard from "./HeaderCard";
import Button from "../../../shared/component/Button";
import EventDetails from "./EventDetailts";
import FooterCard from "./FooterCard";
import EditEventForm from "../form/EditEventForm";
import UsersList from "../user/UserList";
import { useEffect, useState } from "react";
import PriorityPopup from "../shared/PriorityPopup";
import { setBookings } from "../../../redux/bookingsSlice";
import {
  getListFromDatabase,
  updateDatabaseRecord,
} from "../../../api/apiRequest";
import Alert from "../shared/Alert";
import { useDispatch } from "react-redux";

export default function EventCard({
  loggedUser,
  event,
  handleDelete,
  addToBookings,
  removeToBookings,
  indexSection,
  users,
  fetchEvents,
}) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editPriorityPopupIsOpen, setEditPriorityPopupIsOpen] = useState(false);
  const [reservationsPriorityPopupIsOpen, setReservationsPriorityPopupIsOpen] = useState(false);
  const [bookedUsers, setBookedUsers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch()

  const handleAlert = () => {
    setShowAlert(!showAlert);
  };

  const toggleEditPriorityPopup = (event) => {
    setSelectedEvent(event);
    setEditPriorityPopupIsOpen(!editPriorityPopupIsOpen);
  };

  const handleCloseEditPriorityPopup = () => {
    setSelectedEvent(null);
    setEditPriorityPopupIsOpen(false);
  };

  const handleReservationsPriorityPopup = () => {
    setReservationsPriorityPopupIsOpen(!reservationsPriorityPopupIsOpen);
  };

  const handleBookings = async () => {
    try {
      const bookings = await getListFromDatabase("bookings");
      dispatch(setBookings(bookings))
      if (!event.bookingsRecordId || !bookings.length) {
        console.log("Empty arrays. No action taken.");
        return;
      }

      const idsArray = bookings
        .filter((el) => event.bookingsRecordId.includes(el.id))
        .map((el) => el.bookedId);

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
      handleBookings();
    }
  }, [event]);


  const handleCloseReservationsPriorityPopup = () => {
    setReservationsPriorityPopupIsOpen(!reservationsPriorityPopupIsOpen);
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
    setEditPriorityPopupIsOpen(false);
    handleAlert()
  };

  const isUserBooked = bookedUsers.some((user) => user.id === loggedUser.id);
  const proproetaryEvent = loggedUser.id === event.authorId;

  const renderJoinButton = () => {
    if (
      !proproetaryEvent &&
      bookedUsers.length < event.places &&
      !isUserBooked
    ) {
      return <Button small name="Join" onClick={() => addToBookings(event.id)} />;
    }
    return null;
  };

  const renderLeaveButton = () => {
    if (isUserBooked) {
      return <Button small outline name="Leave" onClick={() => removeToBookings(event.id)} />;
    }
    return null;
  };

  return (
    <>
      <div className="w-full h-64 relative">
        <HeaderCard
          event={event}
          handleReservationsPriorityPopup={handleReservationsPriorityPopup}
          bookedUsers={bookedUsers}
        />
        <div className="flex justify-between">
          <EventDetails event={event} />
        </div>
        <div className="absolute bottom-0 right-0">
          {event.places && !proproetaryEvent && renderJoinButton()}
          {!proproetaryEvent && renderLeaveButton()}
          {handleDelete && proproetaryEvent && (
            <FooterCard
              event={event}
              handleOpenEditPriorityPopup={() => toggleEditPriorityPopup(event)}
              handleDelete={handleDelete}
              indexSection={indexSection}
            />
          )}
        </div>
      </div>
      {reservationsPriorityPopupIsOpen && (
        <PriorityPopup
          handleClose={handleCloseReservationsPriorityPopup}
          title="List of reservations"
        >
          {bookedUsers.length > 0 ? (
            <UsersList users={bookedUsers} loggedUser={loggedUser} />
          ) : (
            <p className="pt-6 text-xl text-zinc-400">
              There are no reservations for this event
            </p>
          )}
        </PriorityPopup>
      )}
      {editPriorityPopupIsOpen && (
        <PriorityPopup handleClose={handleCloseEditPriorityPopup} title="Edit event">
          <EditEventForm event={selectedEvent} updateEvent={updateEvent}
          />
        </PriorityPopup>
      )}
      {
        showAlert &&
        <Alert type="success" text="Modification successful!" onClose={() => setShowAlert(false)} />}
    </>
  );
}
