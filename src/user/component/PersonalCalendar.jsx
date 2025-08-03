import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/it";
import AddEventForm from "./form/AddEventForm";
import PriorityPopup from "./shared/PriorityPopup";
import Title from "./shared/Title";
import SecondaryPopup from "./shared/SecondaryPopup";
import SummaryEventCard from "./card/SummaryEventCard";
import { useSelector } from "react-redux";
import AlertBanner from "../../shared/component/AlertBanner";
import { AlertTypes } from "../../shared/models";

export default function PersonalCalendar({ events }) {
  const localizer = momentLocalizer(moment);
  const users = useSelector((state) => state.users);
  const logged = useSelector((state) => state.auth.user);
  const loggedUser = users.find((user) => user.id === logged.id);
  const [newEventPriorityPopup, setNewEventPriorityPopup] = useState(false);
  const [eventSecondaryPopup, setEventsSecondaryPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showCreatedEventAlert, setShowCreatedEventAlert] = useState(false);
  const [showNoValidDateAlert, setShowNoValidDateAlert] = useState(false);

  const eventForCalendar = events.map((event) => ({
    ...event,
    start: new Date(`${event.startDate} ${event.startTime}`),
    end: new Date(`${event.endDate} ${event.endTime}`),
  }));

  const handleNoValidDateAlert = () => {
    setShowNoValidDateAlert(!showNoValidDateAlert);
  };
  const handleCreatedEventAlert = () => {
    setShowCreatedEventAlert(!showCreatedEventAlert);
  };

  const handleSelectSlot = (slotInfo) => {
    const startDateFormatted = moment(slotInfo.start).toDate();
    const endDateFormatted = moment(slotInfo.end).toDate();
    setStartDate(startDateFormatted);
    setEndDate(endDateFormatted);
    const startTime = moment(slotInfo.start).format("HH:mm");
    const endTime = moment(slotInfo.end).format("HH:mm");
    setStartTime(startTime);
    setEndTime(endTime);

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);

    if (startDateFormatted <= currentDate) {
      handleNoValidDateAlert();
    } else {
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

  const handleClosePopup = () => {
    setEventsSecondaryPopup(!eventSecondaryPopup);
  };
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    handleClosePopup();
  };

  const EventInCalendar = ({ event }) => (
    <div onClick={() => handleEventClick(event)} className="w-full h-full">
      <p className="text-[10px]">
        {event.title.length > 18
          ? event.title.slice(0, 18) + "..."
          : event.title}
      </p>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full">
        <Calendar
          events={eventForCalendar}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          selectable={true}
          onSelectSlot={handleSelectSlot}
          views={["month", "week", "day"]}
          defaultView="month"
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
              handleNoValidDateAlert={handleNoValidDateAlert}
            />
          </div>
        </PriorityPopup>
      )}

      {eventSecondaryPopup && (
        <SecondaryPopup handleClose={handleClosePopup}>
          <SummaryEventCard event={selectedEvent} />
        </SecondaryPopup>
      )}

      {showCreatedEventAlert && (
        <AlertBanner
          text="Event created successfully."
          type={AlertTypes}
          onClose={() => setShowCreatedEventAlert(false)}
        />
      )}
      {showNoValidDateAlert && (
        <AlertBanner
          text="You cannot create events in the past tense."
          type={AlertTypes.ERROR}
          onClose={() => setShowNoValidDateAlert(false)}
        />
      )}
    </div>
  );
}
