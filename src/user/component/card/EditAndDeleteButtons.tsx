import { useDispatch } from "react-redux";
import { deleteRecordFromDatabase } from "../../../api/apiRequest";
import { useState } from "react";
import { deleteEvent } from "../../../redux/slices/eventsSlice";
import PriorityPopup from "../shared/PriorityPopup";
import EditEventForm from "../form/EditEventForm";
import IconAndName from "../shared/IconAndName";
import AlertBanner from "../../../shared/component/AlertBanner";
import { AlertTypes, TabelName } from "../../../shared/models";

interface Props {
  event: any;
}

export default function EditAndDeleteButtons({ event }: Props): JSX.Element {
  const [editPriorityPopupIsOpen, setEditPriorityPopupIsOpen] = useState(false);
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const dispatch = useDispatch();
  const currentDate = new Date();

  const eventIsFinished =
    new Date(`${event.endDate} ${event.endTime}`) < currentDate;

  const toggleEditPriorityPopup = () => {
    setEditPriorityPopupIsOpen((prev) => !prev);
  };

  const handleDelete = async (eventToDelete: any) => {
    const isDeleted = await deleteRecordFromDatabase(
      TabelName.EVENTS,
      eventToDelete.id
    );
    if (isDeleted?.deleted === true) {
      setShowDeleteAlert(true);
    }
    dispatch(deleteEvent(eventToDelete));
  };

  const handleCloseEditPriorityPopup = () => {
    setEditPriorityPopupIsOpen(false);
  };

  const handleIsEditedAlert = () => {
    setShowEditAlert(true);
  };

  return (
    <div className="flex space-x-2">
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
          <EditEventForm
            event={event}
            handleCloseEditPriorityPopup={handleCloseEditPriorityPopup}
            handleisEditedAlert={handleIsEditedAlert}
          />
        </PriorityPopup>
      )}
      {showEditAlert && (
        <AlertBanner
          type={AlertTypes.SUCCESS}
          text="Modification successful!"
        />
      )}
      {showDeleteAlert && (
        <AlertBanner
          type={AlertTypes.ERROR}
          text="Event deleted successfully!"
        />
      )}
    </div>
  );
}
