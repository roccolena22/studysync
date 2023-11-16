import PersonaleCalendar from "../../user/component/PersonalCalendar";
import Suggestion from "../component/shared/Suggestion";
import TitlePage from "../component/shared/TitlePage";

export default function CalendarPage({ infoLoggedUser }) {
  return (
    <div className="flex flex-col items-center">
      <TitlePage title="Calendar" />
      <div className="w-full pt-8">
        <PersonaleCalendar infoLoggedUser={infoLoggedUser} />
      </div>
      <Suggestion text="scrivere un suggerimento" />
    </div>
  );
}
