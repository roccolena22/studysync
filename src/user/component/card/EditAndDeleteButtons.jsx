import { useDispatch } from "react-redux";
import IconAndName from "../user/IconAndName";
import { deleteRecordFromDatabase } from "../../../api/apiRequest";
import { useState } from "react";
import { deleteEvent } from "../../../redux/slices/eventsSlice";
import AlertBanner from "../shared/AlertBanner";
import PriorityPopup from "../shared/PriorityPopup";
import EditEventForm from "../form/EditEventForm"

export default function EditAndDeleteButtons({event}) {
  const [editPriorityPopupIsOpen, setEditPriorityPopupIsOpen] = useState(false);
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const dispatch = useDispatch();
  const currentDate = new Date();

  const eventIsFinished =
    new Date(`${event.endDate} ${event.endTime}`) < currentDate;

  const toggleEditPriorityPopup = () => {
    setEditPriorityPopupIsOpen(!editPriorityPopupIsOpen);
  };

  const handleDelete = async (event) => {
    const isDeleted = await deleteRecordFromDatabase("events", event.id);
    isDeleted.deleted === true && setShowDeleteAlert(!showDeleteAlert)
    dispatch(deleteEvent(event));
  };

  const handleCloseEditPriorityPopup = () => {
    setEditPriorityPopupIsOpen(false);
  };
  
  const handleisEditedAlert = () => {
    setShowEditAlert(!showEditAlert);
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
              handleisEditedAlert={handleisEditedAlert}
            />
          }
        </PriorityPopup>
      )}
      {showEditAlert && (
        <AlertBanner
          type="success"
          text="Modification successful!"
        />
      )}
      {showDeleteAlert && (
        <AlertBanner
          type="delete"
          text="Event deleted successfully!"
        />
      )}
    </>
  );
}
