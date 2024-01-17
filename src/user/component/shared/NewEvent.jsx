import { useState } from "react";
import Button from "../../../shared/component/Button";
import PriorityPopup from "./PriorityPopup";
import Title from "./Title";
import AddEventForm from "../form/AddEventForm";
import Alert from "./Alert";

export default function NewEvent({ loggedUser, name }) {
  const [newEventPriorityPopup, setNewEventPriorityPopup] = useState(false);
  const [showCreatedEventAlert, setShowCreatedEventAlert] = useState(false);
  const [showNoValidDateAlert, setShowNoValidDateAlert] = useState(false);

  const handleNoValidDateAlert = () => {
    setShowNoValidDateAlert(!showNoValidDateAlert);
  };

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
              loggedUser={loggedUser}
              handleCreatedEventAlert={handleCreatedEventAlert}
              handleClose={handleNewEventPriorityPopup}
              handleNoValidDateAlert={handleNoValidDateAlert}
            />
          </div>
        </PriorityPopup>
      )}

      {showCreatedEventAlert && (
        <Alert
          text="Event created successfully."
          type="success"
          onClose={() => setShowCreatedEventAlert(false)}
        />
      )}
      {showNoValidDateAlert && (
        <Alert
          text="Something is wrong with the dates you chose."
          type="alert"
          onClose={() => setShowNoValidDateAlert(false)}
        />
      )}
    </div>
  );
}
