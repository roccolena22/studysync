import { useDispatch } from "react-redux";
import IconAndName from "../user/IconAndName";
import { deleteRecordFromDatabase } from "../../../api/apiRequest";
import { useState } from "react";
import { deleteEvent } from "../../../redux/slices/eventsSlice";
import Alert from "../shared/Alert";
import PriorityPopup from "../shared/PriorityPopup";
import EditEventForm from "../form/EditEventForm"

export default function OwnerOptions({event, fetchEvents}) {
  const [editPriorityPopupIsOpen, setEditPriorityPopupIsOpen] = useState(false);
  const [showNoValidDateAlert, setShowNoValidDateAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();
  const currentDate = new Date();

  const eventIsFinished =
    new Date(`${event.endDate} ${event.endTime}`) < currentDate;

  const toggleEditPriorityPopup = () => {
    setEditPriorityPopupIsOpen(!editPriorityPopupIsOpen);
  };

  const handleDelete = async (event) => {
    await deleteRecordFromDatabase("events", event.id);
    dispatch(deleteEvent(event));
  };

  const handleCloseEditPriorityPopup = () => {
    setEditPriorityPopupIsOpen(false);
  };
  const handleNoValidDateAlert = () => {
    setShowNoValidDateAlert(!showNoValidDateAlert);
  };
  const handleAlert = () => {
    setShowAlert(!showAlert);
  };

  return (
    <>
      {!eventIsFinished && (
        <IconAndName
          iconName="edit"
          label="edit"
          onClick={toggleEditPriorityPopup}
        />
      )}
      <IconAndName
        iconName="delete"
        label="delete"
        onClick={() => handleDelete(event)}
        color="text-red-800"
      />

      {editPriorityPopupIsOpen && (
        <PriorityPopup
          handleClose={handleCloseEditPriorityPopup}
          title="Edit event"
        >
          {
            <EditEventForm
              event={event}
              handleCloseEditPriorityPopup={handleCloseEditPriorityPopup}
              handleAlert={handleAlert}
              handleNoValidDateAlert={handleNoValidDateAlert}
              fetchEvents={fetchEvents}
            />
          }
        </PriorityPopup>
      )}
      {showAlert && (
        <Alert
          type="success"
          text="Modification successful!"
          onClose={handleAlert}
        />
      )}
      {showNoValidDateAlert && (
        <Alert
          text="Something is wrong with the dates you chose."
          type="alert"
          onClose={() => setShowNoValidDateAlert(false)}
        />
      )}
    </>
  );
}
