import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/it";
import AddEventForm from "./form/AddEventForm";
import PriorityPopup from "./shared/PriorityPopup";
import Title from "./shared/Title";
import Alert from "./shared/Alert";
import SecondaryPopup from "./shared/SecondaryPopup";
import SyntheticEventCard from "./card/SyntheticEventCard";

export default function PersonaleCalendar({ loggedUser, events }) {
  const [newEventPriorityPopup, setNewEventPriorityPopup] = useState(false);
  const [eventSecondaryPopup, setEventSecondaryPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const localizer = momentLocalizer(moment);
  const [showCreatedEventAlert, setShowCreatedEventAlert] = useState(false);
  const [showNoValidDateAlert, setShowNoValidDateAlert] = useState(false);

  const handleCreatedEventAlert = () => {
    setShowCreatedEventAlert(!showCreatedEventAlert);
  };

  const handleNoValidDateAlert = () => {
    setShowNoValidDateAlert(!showNoValidDateAlert);
  };

  const handleSelectSlot = (slotInfo) => {
    const startDateFormatted = moment(slotInfo.start).toDate();
    const startTime = moment(slotInfo.start).format("HH:mm");
    const endTime = moment(slotInfo.end).format("HH:mm");
    setStartTime(startTime);
    setEndTime(endTime);

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);

    if (startDateFormatted <= currentDate) {
      handleNoValidDateAlert()
    } else {
      setStartDate(moment(slotInfo.start).format("L"));
      setEndDate(moment(slotInfo.end).format("L"));
      handleNewEventPriorityPopup();
    }
  };

  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.authorId === loggedUser.id ? "#16A34A" : "#EA580C",
      color: "white",
      borderColor: "transparent",
      display: "block",
      fontSize: "0px",
    };
    return {
      style,
    };
  };

  const handleNewEventPriorityPopup = () => {
    setNewEventPriorityPopup(!newEventPriorityPopup);
  };

  const handleClosePopuop = () => {
    setEventSecondaryPopup(!eventSecondaryPopup);
  };
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    handleClosePopuop();
  };


  const EventInCalendar = ({ event }) => (
    <div onClick={() => handleEventClick(event)} className="w-full h-full">
      <p className="text-[10px]">{event.title.length > 18 ? event.title.slice(0, 18) + "..." : event.title}</p>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full">
        <Calendar
          events={events}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          selectable={true}
          onSelectSlot={handleSelectSlot}
          views={["month", "week", "day"]}
          defaultView="week"
          style={{ height: 500 }}
          eventPropGetter={eventStyleGetter}
          components={{
            event: EventInCalendar,
          }}
        />
      </div>
      {startDate && endDate && newEventPriorityPopup && (
        <PriorityPopup handleClose={handleNewEventPriorityPopup}>
          <Title fontSize="text-lg" title="New event" />
          <div className="pt-4">
            <AddEventForm
              loggedUser={loggedUser}
              startDate={startDate}
              startTime={startTime}
              endDate={endDate}
              endTime={endTime}
              handleCreatedEventAlert={handleCreatedEventAlert}
              handleClose={handleNewEventPriorityPopup}
            />
          </div>
        </PriorityPopup>
      )}

      {eventSecondaryPopup && (
        <SecondaryPopup handleClose={handleClosePopuop}>
          <SyntheticEventCard event={selectedEvent} />
        </SecondaryPopup>
      )}

      {showCreatedEventAlert && <Alert text="Event created successfully." type="success" onClose={() => setShowCreatedEventAlert(false)} />}
      {showNoValidDateAlert && <Alert text="You cannot create events in the past tense." type="alert" onClose={() => setShowNoValidDateAlert(false)} />}

    </div>
  );
}
