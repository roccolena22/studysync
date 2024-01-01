import Button from "../../../shared/component/Button";
import EventDetails from "./EventDetails";
import FooterCard from "./FooterCard";
import HeaderCard from "./HeaderCard";
import EditEventForm from "../form/EditEventForm";
import UsersList from "../user/UserList";
import { useState } from "react";
import PriorityPopup from "../shared/PriorityPopup";
import {
  updateDatabaseRecord,
} from "../../../api/apiRequest";
import Alert from "../shared/Alert";
import { editEvent } from "../../../redux/eventsSlice";
import { useDispatch } from "react-redux";

export default function EventCard({
  loggedUser,
  event,
  handleDelete,
  addToBookings,
  deleteToBookings,
  fetchBookings,
  users,
  bookings,
  loggedUser
}) {

  const dispatch = useDispatch()

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editPriorityPopupIsOpen, setEditPriorityPopupIsOpen] = useState(false);
  const [reservationsPriorityPopupIsOpen, setReservationsPriorityPopupIsOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleAlert = () => {
    setShowAlert(!showAlert);
  };

  const toggleEditPriorityPopup = (event) => {
    if (event) {
      setSelectedEvent(event);
      setEditPriorityPopupIsOpen(!editPriorityPopupIsOpen);
    }
  };

  const handleCloseEditPriorityPopup = () => {
    setSelectedEvent(null);
    setEditPriorityPopupIsOpen(false);
  };

  const handleReservationsPopup = () => {
    setReservationsPriorityPopupIsOpen(!reservationsPriorityPopupIsOpen);
    fetchBookings(event)
  };

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
    dispatch(editEvent(fullEvent));
    setEditPriorityPopupIsOpen(false);
    handleAlert()
  };
  const proproetaryEvent = loggedUser.id === event.authorId;

  return (
    <>
      <div className={`w-full h-72 relative p-3 rounded-lg shadow-lg p-3 border border-slate-200 ${proproetaryEvent ? "bg-slate-50" : "bg-white"}`}>
        <div className={`flex justify-between items-center border-b ${event.role && event.role.includes("student")
          ? "border-yellow-400"
          : "border-purple-500"
          } pb-1 rounded-t-lg`}>
          <HeaderCard
            event={event}
            handleReservationsPopup={handleReservationsPopup}
          />
        </div>
        <div className="flex justify-between">
          <EventDetails event={event} />
        </div>
        <div className="absolute bottom-2 right-3">
          <FooterCard
            event={event}
            users={users}
            bookings={bookings}
            handleOpenEditPriorityPopup={() => toggleEditPriorityPopup(event)}
            handleDelete={handleDelete}
            loggedUser={loggedUser}
            proproetaryEvent={proproetaryEvent}
            addToBookings={addToBookings}
            deleteToBookings={deleteToBookings}
          />
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
            <p className="pt-6 text-xl text-slate-400">
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
