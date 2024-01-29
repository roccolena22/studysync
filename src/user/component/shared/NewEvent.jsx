import { useState } from "react";
import Button from "../../../shared/component/Button";
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
    <div>
      <Button small outline name={name} onClick={handleNewEventPriorityPopup} />
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
    </div>
  );
}
