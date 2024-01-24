import { useState } from "react";
import Button from "../../../shared/component/Button";
import PriorityPopup from "./PriorityPopup";
import Title from "./Title";
import AddEventForm from "../form/AddEventForm";
import AlertBanner from "./AlertBanner";
import { useSelector } from "react-redux";

export default function NewEvent({ name }) {
  const loggedUser = useSelector((state) => state.auth.user);
  const [newEventPriorityPopup, setNewEventPriorityPopup] = useState(false);
  const [showCreatedEventAlert, setShowCreatedEventAlert] = useState(false);
  const [showNoValidDateAlert, setShowNoValidDateAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null)

  const handleNoValidDateAlert = (message) => {
    setShowNoValidDateAlert(!showNoValidDateAlert);
    setAlertMessage(message)
    
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
        <AlertBanner
          text="Event created successfully."
          type="success"
          onClose={() => setShowCreatedEventAlert(false)}
        />
      )}
      {showNoValidDateAlert && (
        <AlertBanner
          text={alertMessage}
          type="alert"
          onClose={() => setShowNoValidDateAlert(false)}
        />
      )}
    </div>
  );
}
