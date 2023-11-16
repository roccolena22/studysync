import { useLocation } from "react-router-dom";
import BookedBox from "./BookedBox";
import { getUser } from "../../hooks/getUser";

export default function HeaderCard({ event, handlePartecipantPopup }) {
  const location = useLocation();
  const emailToFind = event.authorId;

  const user = getUser(emailToFind);

  const network = location.pathname === "/network" ? true : false;
  return (
    <div className="flex justify-between items-center border-b border-slate-300 pb-1 rounded-t-lg">
      <div>
        <div className="space-x-1">
          <span className="text-sm text-green-700">{user.name}</span>
          <span className="text-sm text-green-700">{user.surname}</span>
        </div>
        <p className="text-xs text-slate-400">{event.authorId}</p>
      </div>
      <div className="flex space-x-2">
        {network && (
          <p className="text-xs text-rose-500 hover:border-b border-green-700">
            Join
          </p>
        )}
        <BookedBox
          places={event.places}
          handlePartecipantPopup={handlePartecipantPopup}
        />
      </div>
    </div>
  );
}
