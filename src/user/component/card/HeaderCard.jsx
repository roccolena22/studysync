import IconAndName from "../user/IconAndName";
import ReservationsButton from "./ReservationsButton";

export default function HeaderCard({ event, handleReservationsPopup }) {
  return (
    <div className="flex justify-between items-center border-b border-slate-400 pb-1 rounded-t-lg">
      <div>
        <div className="space-x-1">
          <span className="text-sm text-rose-500">{event.firstName}</span>
          <span className="text-sm text-rose-500">{event.lastName}</span>
        </div>
        <p className="text-xs text-slate-400">{event.email}</p>
      </div>
      <IconAndName
        iconName="group"
        onClick={() => handleReservationsPopup()}
        name={`0${event.places ? "/" + event.places : ""}`}
      />
    </div>
  );
}
