import { useEffect, useState } from "react";
import TitlePage from "../component/shared/TitlePage";
import { getFromLocalStorage } from "../hooks/localStorageHooks";
import CardList from "../component/card/CardList";

export default function Network({ infoLoggedUser }) {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState(getFromLocalStorage("users", []));
  const [partecipantPopupIsOpen, setPartecipantPopupIsOpen] = useState(false);

  useEffect(() => {
    const followed = users.filter((el) => infoLoggedUser.email !== el.email);
    const allEvents = followed.flatMap((user) => user.events || []);

    setEvents(allEvents);
  }, [infoLoggedUser.email, users]);

  const handlePartecipantPopup = () => {
    setPartecipantPopupIsOpen(!partecipantPopupIsOpen);
  };
  return (
    <div className="flex flex-col items-center">
      <TitlePage title="Network" />
      <div className="sticky top-16 z-10 w-full">
        <CardList
          events={events}
          handlePartecipantPopup={handlePartecipantPopup}
        />
      </div>
    </div>
  );
}
