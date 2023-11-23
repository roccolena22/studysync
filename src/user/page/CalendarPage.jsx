import PersonaleCalendar from "../../user/component/PersonalCalendar";
import Suggestion from "../component/shared/Suggestion";
import TitlePage from "../component/shared/TitlePage";
import Legend from "../component/user/Legend";

export default function CalendarPage({ loggedUser, followers, events }) {
  return (
    <div className="flex flex-col items-center">
      <TitlePage title="Calendar" />
      <Legend />
      <div className="w-full pt-8">
        <PersonaleCalendar loggedUser={loggedUser} followers={followers} events={events}/>
      </div>
      <Suggestion text="Use the calendar to choose when to create your event" />
    </div>
  );
}
