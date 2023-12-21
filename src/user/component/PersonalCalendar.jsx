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

  const formattedEvents = events.map((originalEvent) => ({
    title: originalEvent.title,
    start: new Date(originalEvent.startDate + " " + originalEvent.startTime),
    end: new Date(originalEvent.endDate + " " + originalEvent.endTime),
    mode: originalEvent.mode,
    firstName: originalEvent.firstName,
    lastName: originalEvent.lastName,
    email: originalEvent.email,
    role: originalEvent.role,
    authorId: originalEvent.authorId,
    location: originalEvent.location,
    platform: originalEvent.platform,
    link: originalEvent.link,
    startDate: originalEvent.startDate,
    startTime: originalEvent.startTime,
    endDate: originalEvent.endDate,
    endTime: originalEvent.endTime,
  }));

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

  const handleClosePopuo = () => {
    setEventSecondaryPopup(!eventSecondaryPopup);
  };
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    handleClosePopuo();
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
          events={formattedEvents}
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
      {startDate && newEventPriorityPopup && (
        <PriorityPopup handleClose={handleNewEventPriorityPopup}>
          <Title fontSize="text-lg">
            <div className="flex flex-col sm:flex-row sm:justify-between w-full">
              <p>New event</p>
              <div className="flex flex-col items-start sm:flex-row  sm:space-x-2">
                <div>
                  <span className="text-green-600">Start:</span>
                  <span className="pl-1">{startDate}</span>
                </div>
                <div>
                  <span className="text-red-800">End:</span>
                  <span className="pl-1">{endDate}</span>
                </div>
              </div>
            </div>
          </Title>
          <div className="pt-4">
            <AddEventForm
              loggedUser={loggedUser}
              startDate={startDate}
              endDate={endDate}
              startTime={startTime}
              endTime={endTime}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              handleCreatedEventAlert={handleCreatedEventAlert}
            />
          </div>
        </PriorityPopup>
      )}

      {eventSecondaryPopup && (
        <SecondaryPopup handleClose={handleClosePopuo}>
          <SyntheticEventCard event={selectedEvent} />
        </SecondaryPopup>
      )}

      {showCreatedEventAlert && <Alert text="Event created successfully." type="success" onClose={() => setShowCreatedEventAlert(false)} />}
      {showNoValidDateAlert && <Alert text="You cannot create events in the past tense." type="alert" onClose={() => setShowNoValidDateAlert(false)} />}

    </div>
  );
}
