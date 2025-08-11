import React, { useState } from "react";
import {
  Calendar,
  momentLocalizer,
  SlotInfo,
  Event as RBCEvent,
} from "react-big-calendar";
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
import { AlertTypes, DefaultColor } from "../../shared/models";
import { EventModel, User } from "../models";

interface CalendarEvent extends RBCEvent {
  authorId: string;
}

interface PersonalCalendarProps {
  events: EventModel[];
}

export default function PersonalCalendar({ events }: PersonalCalendarProps) {
  const localizer = momentLocalizer(moment);

  const loggedUser = useSelector((state: any) => state.auth.user) as User;

  const [newEventPriorityPopup, setNewEventPriorityPopup] = useState(false);
  const [eventSecondaryPopup, setEventsSecondaryPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventModel | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [showCreatedEventAlert, setShowCreatedEventAlert] = useState(false);
  const [showNoValidDateAlert, setShowNoValidDateAlert] = useState(false);

  const eventForCalendar: CalendarEvent[] = events.map((event) => ({
    ...event,
    start: new Date(`${event.startDate}`),
    end: new Date(`${event.endDate}`),
  }));

  const handleNoValidDateAlert = () => {
    setShowNoValidDateAlert((prev) => !prev);
  };
  const handleCreatedEventAlert = () => {
    setShowCreatedEventAlert((prev) => !prev);
  };

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    const startDateFormatted = moment(slotInfo.start).toDate();
    const endDateFormatted = moment(slotInfo.end).toDate();
    setStartDate(startDateFormatted);
    setEndDate(endDateFormatted);

    const startTimeFormatted = moment(slotInfo.start).format("HH:mm");
    const endTimeFormatted = moment(slotInfo.end).format("HH:mm");
    setStartTime(startTimeFormatted);
    setEndTime(endTimeFormatted);

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);

    if (startDateFormatted <= currentDate) {
      handleNoValidDateAlert();
    } else {
      handleNewEventPriorityPopup();
    }
  };

  const eventStyleGetter = (event: CalendarEvent) => {
    const style = {
      backgroundColor:
        event.authorId === loggedUser?.id ? "#16A34A" : "#EA580C",
      color: DefaultColor.SECONDARY_COLOR,
      borderColor: "transparent",
      display: "block",
      fontSize: "0px",
    };
    return {
      style,
    };
  };

  const handleNewEventPriorityPopup = () => {
    setNewEventPriorityPopup((prev) => !prev);
  };

  const handleClosePopup = () => {
    setEventsSecondaryPopup((prev) => !prev);
  };

  const handleEventClick = (event: EventModel) => {
    setSelectedEvent(event);
    handleClosePopup();
  };

  const EventInCalendar = ({ event }: { event: EventModel }) => (
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
          selectable
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
              loggedUserId={loggedUser.id}
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
        <SecondaryPopup handleClose={handleClosePopup}>
          {selectedEvent && <SummaryEventCard event={selectedEvent} />}
        </SecondaryPopup>
      )}

      {showCreatedEventAlert && (
        <AlertBanner
          text="Event created successfully."
          type={AlertTypes.SUCCESS}
        />
      )}

      {showNoValidDateAlert && (
        <AlertBanner
          text="You cannot create events in the past tense."
          type={AlertTypes.ERROR}
        />
      )}
    </div>
  );
}
