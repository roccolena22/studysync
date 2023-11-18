import PersonaleCalendar from "../../user/component/PersonalCalendar";
import Suggestion from "../component/shared/Suggestion";
import TitlePage from "../component/shared/TitlePage";

export default function CalendarPage({ loggedUser }) {
  return (
    <div className="flex flex-col items-center">
      <TitlePage title="Calendar" />
      <div className="w-full pt-8">
        <PersonaleCalendar loggedUser={loggedUser} />
      </div>
      <Suggestion text="scrivere un suggerimento" />
    </div>
  );
}
