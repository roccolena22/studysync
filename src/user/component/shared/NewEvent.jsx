import { useState } from "react";
import PriorityPopup from "./PriorityPopup";
import Title from "./Title";
import AddEventForm from "../form/AddEventForm";
import AlertBanner from "../../../shared/component/AlertBanner";

export default function NewEvent({ name }) {
  const [newEventPriorityPopup, setNewEventPriorityPopup] = useState(false);
  const [showCreatedEventAlert, setShowCreatedEventAlert] = useState(false);

  const handleNewEventPriorityPopup = () => {
    setNewEventPriorityPopup(!newEventPriorityPopup);
  };

  const handleCreatedEventAlert = () => {
    setShowCreatedEventAlert(!showCreatedEventAlert);
  };

  return (
    <>
      <p
        className="text-sm font-normal text-cyan-700 cursor-pointer"
        onClick={handleNewEventPriorityPopup}
      >
        {name}
      </p>
      {newEventPriorityPopup && (
        <PriorityPopup handleClose={handleNewEventPriorityPopup}>
          <Title fontSize="text-lg" title="New event" />
          <div className="pt-4">
            <AddEventForm
              handleCreatedEventAlert={handleCreatedEventAlert}
              handleClose={handleNewEventPriorityPopup}
            />
          </div>
        </PriorityPopup>
      )}

      {showCreatedEventAlert && (
        <AlertBanner
          text="Event created successfully."
          type="success"
          onClose={() => setShowCreatedEventAlert(false)}
        />
      )}
    </>
  );
}
