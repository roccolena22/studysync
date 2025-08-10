import { useState } from "react";
import PriorityPopup from "../shared/PriorityPopup";
import EditEventForm from "../form/EditEventForm";
import IconAndName from "../shared/IconAndName";
import AlertBanner from "../../../shared/component/AlertBanner";
import { AlertTypes, TabelName } from "../../../shared/models";
import { deleteEventRecord } from "../../../api/apiEvents";
import { EventModel } from "../../models";

interface Props {
  event: EventModel;
}

export default function EditAndDeleteButtons({ event }: Props): JSX.Element {
  const [editPriorityPopupIsOpen, setEditPriorityPopupIsOpen] = useState(false);
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const currentDate = new Date();

  const eventIsFinished =
    new Date(`${event.endDate} ${event.endTime}`) < currentDate;

  const toggleEditPriorityPopup = () => {
    setEditPriorityPopupIsOpen((prev) => !prev);
  };

  const handleDelete = async (eventToDelete: any) => {
    const isDeleted = await deleteEventRecord(
      eventToDelete.id
    );
    if (isDeleted?.deleted === true) {
      setShowDeleteAlert(true);
    }
    deleteEventRecord(eventToDelete);
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
        color="red"
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
