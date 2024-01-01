import React, { useState } from "react";
import Button from "../../../shared/component/Button";
import IconAndName from "../user/IconAndName";
import { editEvent } from "../../../redux/eventsSlice";
import { useDispatch } from "react-redux";
import EditEventForm from "../form/EditEventForm";
import Alert from "../shared/Alert";
import PriorityPopup from "../shared/PriorityPopup";
import { updateDatabaseRecord } from "../../../api/apiRequest";

export default function FooterCard({
  event,
  handleDelete,
  addToBookings,
  deleteToBookings,
  proproetaryEvent,
  bookedRecordId,
  isUserBooked,
}) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editPriorityPopupIsOpen, setEditPriorityPopupIsOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();

  const handleCloseEditPriorityPopup = () => {
    setSelectedEvent(null);
    setEditPriorityPopupIsOpen(false);
  };

  const handleAlert = () => {
    setShowAlert(!showAlert);
  };

  const updateEvent = async (editedEvent) => {
    try {
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
      handleAlert();
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const toggleEditPriorityPopup = () => {
    setSelectedEvent(event);
    setEditPriorityPopupIsOpen(!editPriorityPopupIsOpen);
  };

  const handleJoin = () => {
    addToBookings(event.id);
  };

  const handleLeave = () => {
    deleteToBookings(event.id);
  };

  return (
    <div className="flex space-x-2">
      {proproetaryEvent && !isUserBooked && (
        <>
          <IconAndName iconName="edit" label="edit" onClick={toggleEditPriorityPopup} />
          <IconAndName
            iconName="delete"
            label="delete"
            onClick={() => handleDelete(event)}
            color="text-red-800"
          />
        </>
      )}

      {!proproetaryEvent && (
        <>
          {event.places && bookedRecordId.length < event.places && !isUserBooked && (
            <Button small name="Join" onClick={handleJoin} />
          )}
          {isUserBooked && <Button small outline name="Leave" onClick={handleLeave} />}
        </>
      )}

      {editPriorityPopupIsOpen && (
        <PriorityPopup handleClose={handleCloseEditPriorityPopup} title="Edit event">
          <EditEventForm event={selectedEvent} updateEvent={updateEvent} />
        </PriorityPopup>
      )}

      {showAlert && <Alert type="success" text="Modification successful!" onClose={handleAlert} />}
    </div>
  );
}
