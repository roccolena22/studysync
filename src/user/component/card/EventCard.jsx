import HeaderCard from "./HeaderCard";
import Button from "../../../shared/component/Button";
import EventDetails from "./EventDetails";
import FooterCard from "./FooterCard";
import EditEventForm from "../form/EditEventForm";
import UsersList from "../user/UserList";
import { useEffect, useState } from "react";
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
  indexSection,
  fetchBookings,
  users,
  bookings,
}) {

  const dispatch = useDispatch()

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editPriorityPopupIsOpen, setEditPriorityPopupIsOpen] = useState(false);
  const [reservationsPriorityPopupIsOpen, setReservationsPriorityPopupIsOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [bookedUsers, setbookedUsers] = useState([]);



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

  useEffect(() => {
    setbookedUsers(event.bookingsRecordId || []);
  }, [event.bookingsRecordId]);
  
  const isUserBooked = bookedUsers.some((user) => user.id === loggedUser.id);
  const proproetaryEvent = loggedUser.id === event.authorId;

  console.log(event.bookingsRecordId)

  const renderJoinButton = () => {
    if (
      event.places &&
      !proproetaryEvent &&
      bookedUsers.length < event.places &&
      !isUserBooked
    ) {
      return <Button small name="Join" onClick={() => addToBookings(event)} />;
    }
    return null;
  };

  const renderLeaveButton = () => {
    if (!proproetaryEvent && isUserBooked) {
      return <Button small outline name="Leave" onClick={() => deleteToBookings(event.id)} />;
    }
    return null;
  };

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
          {renderJoinButton()}
          {renderLeaveButton()}
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
          {event.bookingsRecordId.length > 0 ? (
            <UsersList users={event.bookingsRecordId} loggedUser={loggedUser} />
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
