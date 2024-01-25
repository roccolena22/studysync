import { useState } from "react";
import PersonalCalendar from "../component/PersonalCalendar";
import Suggestion from "../component/shared/Suggestion";
import Title from "../component/shared/Title";
import Legend from "../component/user/Legend";
import SwitchTab from "../component/navigation/SwitchTab";
import EventList from "../component/card/EventList";
import NewEvent from "../component/shared/NewEvent";
import { useSelector } from "react-redux";

export default function EventsPage() {
  const [indexSection, setIndexSection] = useState(0);
  const nextEvents = useSelector((state) => state.nextEvents);

  const handleSections = (index) => {
    setIndexSection(index);
  };

  return (
    <div className="flex flex-col items-center relative">
      <Title title="Next events">
        <div className="flex flex-col gap-2 sm:flex-row align-center justify-center items-center sm:space-x-4">
          <NewEvent name="New event" />
          <SwitchTab
            firstItem="grid"
            secondItem="calendar"
            handleSections={handleSections}
            indexSection={indexSection}
          />
        </div>
      </Title>
      <div className="w-full">
        {indexSection === 0 ? (
          <EventList
            eventsToShow={nextEvents}
          />
        ) : (
          <div className="flex flex-col items-center pt-8">
            <div className="pb-6">
              <Legend
                colorOne="bg-green-500"
                colorTwo="bg-orange-600"
                textOne="Your events"
                textTwo="Events you attend"
              />
            </div>
            <PersonalCalendar events={nextEvents} />
            <Suggestion text="Use the calendar to choose when to create your event" />
          </div>
        )}
      </div>
    </div>
  );
}
