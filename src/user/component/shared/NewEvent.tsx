import React, { useState } from "react";
import PriorityPopup from "./PriorityPopup";
import Title from "./Title";
import AddEventForm from "../form/AddEventForm";
import AlertBanner from "../../../shared/component/AlertBanner";
import { AlertTypes, DefaultColor } from "../../../shared/models";

interface NewEventProps {
  name: string;
}

export default function NewEvent({ name }: NewEventProps): JSX.Element {
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
        className={`text-sm font-normal ${DefaultColor.TEXT_PRIMARY_COLOR} cursor-pointer`}
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
          type={AlertTypes.SUCCESS}
        />
      )}
    </>
  );
}
