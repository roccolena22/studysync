import ReservationsButton from "./ReservationsButton";

export default function HeaderCard({ event, handleReservationsPopup }) {

  return (
    <div className="flex justify-between items-center border-b border-slate-300 pb-1 rounded-t-lg">
      <div>
        <div className="space-x-1">
          <span className="text-sm text-green-700">
            {event.authorFirstName}
          </span>
          <span className="text-sm text-green-700">{event.authorLastName}</span>
        </div>
        <p className="text-xs text-slate-400">{event.authorEmail}</p>
      </div>
        <ReservationsButton
          places={event.places}
          handleReservationsPopup={handleReservationsPopup}
          event={event}
        />
    </div>
  );
}
