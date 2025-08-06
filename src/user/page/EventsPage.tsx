import { useState } from "react";
import PersonalCalendar from "../component/PersonalCalendar";
import Title from "../component/shared/Title";
import Legend from "../component/Legend";
import SwitchButton from "../component/navigation/SwitchButton";
import EventList from "../component/card/EventList";
import NewEvent from "../component/shared/NewEvent";
import { useSelector } from "react-redux";
import Message from "../../shared/component/Message";


interface EventsPageProps {
  allUserEvents: any[];
}

export default function EventsPage({ allUserEvents }: EventsPageProps) {
  const [indexSwitch, setIndexSwitch] = useState<number>(0);

  const nextEvents = useSelector((state: any) => state.nextEvents);

  const handleSwitch = (index: number) => {
    setIndexSwitch(index);
  };

  return (
    <div className="flex flex-col items-center relative">
      <Title title="Events">
        <div className="flex flex-col gap-2 sm:flex-row align-center justify-center items-center sm:space-x-4">
          <NewEvent name="New event" />
          <SwitchButton
            firstItem="grid"
            secondItem="calendar"
            handleSwitch={handleSwitch}
            indexSwitch={indexSwitch}
          />
        </div>
      </Title>
      <div className="w-full">
        {indexSwitch === 0 ? (
          <EventList eventsToShow={nextEvents} />
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
            <PersonalCalendar events={allUserEvents} />
            <Message
              text="Use the calendar to choose when to create your event"
              iconName="light"
              iconStyle="text-yellow-400"
            />
          </div>
        )}
      </div>
    </div>
  );
}
