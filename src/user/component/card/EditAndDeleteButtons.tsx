import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
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

  const queryClient = useQueryClient();

  const currentDate = new Date();
  const eventIsFinished = new Date(event.endDate) < currentDate;

  const toggleEditPriorityPopup = () => {
    setEditPriorityPopupIsOpen((prev) => !prev);
  };

  const handleDelete = async (eventToDelete: EventModel) => {
    const isDeleted = await deleteEventRecord(eventToDelete.id);
    if (isDeleted?.deleted === true) {
      setShowDeleteAlert(true);
      // Invalida la cache degli eventi per rifare il fetch
      queryClient.invalidateQueries({ queryKey: [TabelName.EVENTS] });
      queryClient.invalidateQueries({
  predicate: (query) => {
    const key = query.queryKey[0];
    return key === TabelName.EVENTS || (typeof key === 'string' && key.toLowerCase().includes('event'));
  }
});

      queryClient.invalidateQueries({
        queryKey: ["ownedEvents", eventToDelete.authorId],
      });
      queryClient.invalidateQueries({
        queryKey: ["allActiveEvents", eventToDelete.authorId],
      });
    }
  };

  const handleCloseEditPriorityPopup = () => {
    setEditPriorityPopupIsOpen(false);
  };

  // Funzione da passare a EditEventForm per gestire l'alert e rifrescare eventi
  const handleIsEditedAlert = () => {
    setShowEditAlert(true);
    queryClient.invalidateQueries({ queryKey: [TabelName.EVENTS] });
    queryClient.invalidateQueries({
      queryKey: ["ownedEvents", event.authorId],
    });
    queryClient.invalidateQueries({
      queryKey: ["allActiveEvents", event.authorId],
    });
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
          type={AlertTypes.SUCCESS} // meglio SUCCESS per messaggio positivo
          text="Event deleted successfully!"
        />
      )}
    </div>
  );
}
