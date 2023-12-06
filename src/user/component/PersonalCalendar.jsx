import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/it";
import AddEventForm from "./form/AddEventForm";
import Popup from "./shared/Popup";
import TitleSection from "./shared/TitleSection";
import EventCard from "./card/EventCard";

export default function PersonaleCalendar({ loggedUser, followers, events }) {
  const [newEventPopup, setNewEventPopup] = useState(false);
  const [eventPopup, setEventPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const localizer = momentLocalizer(moment);

  const handleSelectSlot = (slotInfo) => {
    const startDateFormatted = moment(slotInfo.start).toDate();
    const startTime = moment(slotInfo.start).format("HH:mm");
    const endTime = moment(slotInfo.end).format("HH:mm");
    setStartTime(startTime);
    setEndTime(endTime);

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);

    if (startDateFormatted <= currentDate) {
      alert("You cannot create events in the past tense");
    } else {
      setStartDate(moment(slotInfo.start).format("L"));
      setEndDate(moment(slotInfo.end).format("L"));
      handleNewEventPopup();
    }
  };

  const userInCalendar =
    followers && followers.filter((user) => user.idFrom === loggedUser.id);

  const authorIds = userInCalendar.map((item) => item.idTo);
  const newIds = [...authorIds, loggedUser.id];

  const filteredEvents = events
    ? events.filter((event) => newIds.includes(event.authorId))
    : [];

  const formattedEvents = filteredEvents.map((originalEvent) => ({
    title: originalEvent.title,
    start: new Date(originalEvent.startDate + " " + originalEvent.startTime),
    end: new Date(originalEvent.endDate + " " + originalEvent.endTime),
    authorId: originalEvent.authorId,
    mode: originalEvent.mode,
    firstName: originalEvent.firstName,
    lastName: originalEvent.lastName,
    places: originalEvent.places,
    location: originalEvent.location,
    email: originalEvent.email,
  }));

  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.authorId === loggedUser.id ? "#0369a1" : "#0ea5e9",
      borderRadius: "4px",
      color: "white",
      borderColor: event.authorId === loggedUser.id ? "#0369a1" : "#0ea5e9",
      display: "block",
      margin: "2px",
    };
    return {
      style,
    };
  };

  const handleNewEventPopup = () => {
    setNewEventPopup(!newEventPopup);
  };

  const handleEventPopup = () => {
    setEventPopup(!eventPopup);
  };
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    handleEventPopup();
  };

  const EventInCalendar = ({ event }) => (
    <div onClick={() => handleEventClick(event)}>
      <p className=" py-2 text-[14px]">{event.title}</p>
      <div className="text-[10px] space-x-1">
        <span>Mode:</span>
        <span>{event.mode}</span>
      </div>
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
          defaultView="week"
          style={{ height: 500 }}
          eventPropGetter={eventStyleGetter}
          components={{
            event: EventInCalendar,
          }}
        />
      </div>
      {startDate && newEventPopup && (
        <Popup handleClose={handleNewEventPopup}>
          <TitleSection>
            <div className="flex justify-between">
              <p>Create a new event</p>
              <div className="flex space-x-2">
                <div>
                  <span className="text-sky-700">Start:</span>
                  <span className="pl-1">{startDate}</span>
                </div>
                <div>
                  <span className="text-red-800">End:</span>
                  <span className="pl-1">{endDate}</span>
                </div>
              </div>
            </div>
          </TitleSection>
          <div className="pt-4">
            <AddEventForm
              loggedUser={loggedUser}
              startDate={startDate}
              endDate={endDate}
              startTime={startTime}
              endTime={endTime}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </div>
        </Popup>
      )}

      {eventPopup && (
        <Popup handleClose={handleEventPopup}>
          <EventCard event={selectedEvent} loggedUser={loggedUser} />
        </Popup>
      )}
    </div>
  );
}
