import React, { useState } from "react";
import Button from "../../../shared/component/Button";
import IconAndName from "../user/IconAndName";
import EditEventForm from "../form/EditEventForm";
import Alert from "../shared/Alert";
import PriorityPopup from "../shared/PriorityPopup";

export default function FooterCard({
  event,
  handleDelete,
  proproetaryEvent,
  bookedRecordId,
  isUserBooked,
  toggleBooking,
  loggedUser
}) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editPriorityPopupIsOpen, setEditPriorityPopupIsOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleAlert = () => {
    setShowAlert(!showAlert);
  };
  const handleCloseEditPriorityPopup = () => {
    setSelectedEvent(null);
    setEditPriorityPopupIsOpen(false);
  };

  const toggleEditPriorityPopup = () => {
    setSelectedEvent(event);
    setEditPriorityPopupIsOpen(!editPriorityPopupIsOpen);
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
            <Button small name="Join" onClick={() => toggleBooking(event.id, true)} />
          )}
          {isUserBooked && <Button small outline name="Leave" onClick={() => toggleBooking(event.id, false)} />}
        </>
      )}

      {editPriorityPopupIsOpen && (
        <PriorityPopup handleClose={handleCloseEditPriorityPopup} title="Edit event">
          {<EditEventForm event={selectedEvent} loggedUser={loggedUser} handleCloseEditPriorityPopup={handleCloseEditPriorityPopup} handleAlert={handleAlert} />}
        </PriorityPopup>
      )}
      {showAlert && <Alert type="success" text="Modification successful!" onClose={handleAlert} />}

    </div>
  );
}
