import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/it";
import AddEventForm from "./form/AddEventForm";
import {
  addToLocalStorage,
  getFromLocalStorage,
} from "../hooks/localStorageHooks";
import TitlePage from "./shared/TitlePage";
import Popup from "./shared/Popup";

export default function PersonaleCalendar({ infoLoggedUser }) {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  const localizer = momentLocalizer(moment);

  useEffect(() => {
    const users = getFromLocalStorage("users", []);

    const currentUserEvents = users
      .find((user) => user.email === infoLoggedUser.email)?.events || [];

    setEvents(currentUserEvents);
  }, [infoLoggedUser]);

  const handleEventsFromForm = (eventsFromForm) => {
    eventsFromForm &&
      setEvents((prevEvents) => {
        const newEvents = [...prevEvents, eventsFromForm];
        const users = getFromLocalStorage("users", []);
        const updatedCurrentUsers = users.map((user) => {
          if (user.email === infoLoggedUser.email) {
            return { ...user, events: newEvents };
          }
          return user;
        });

        addToLocalStorage("users", updatedCurrentUsers);
        return newEvents;
      });
  };

  const handleSelectSlot = (slotInfo) => {
    const selectedDateFormatted = moment(slotInfo.start).toDate();
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    if (selectedDateFormatted <= currentDate) {
      alert("You cannot create events in the past tense");
    } else {
      setSelectedDate(slotInfo.start);
      handlePopup();
    }
  };

  const handlePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const eventStyleGetter = () => {
    const style = {
      backgroundColor: "#f43f5e",
      borderRadius: "4px",
      color: "white",
      borderColor: "#f43f5e",
      display: "block",
      margin: "2px",
    };
    return {
      style,
    };
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable={true}
          onSelectSlot={handleSelectSlot}
          views={["month"]}
          defaultView="month"
          style={{ height: 500 }}
          eventPropGetter={eventStyleGetter}
        />
      </div>
      {selectedDate && isPopupOpen && (
        <Popup handleClose={handlePopup}>
          <TitlePage>
            <span>Create a new event for</span>
            <span className="pl-1 text-rose-500">
              {moment(selectedDate).format("LL")}
            </span>
          </TitlePage>
          <div className="pt-4">
            <AddEventForm
              selectedDate={selectedDate}
              handleEventsFromForm={handleEventsFromForm}
              setSelectedDate={setSelectedDate}
            />
          </div>
        </Popup>
      )}
    </div>
  );
}
