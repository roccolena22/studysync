import { useEffect, useState } from "react";
import TitlePage from "../component/shared/TitlePage";
import { getFromLocalStorage } from "../hooks/localStorageHooks";
import CardList from "../component/card/CardList";

export default function Network({ loggedUser }) {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState(getFromLocalStorage("users", []));
  const [partecipantPopupIsOpen, setPartecipantPopupIsOpen] = useState(false);

  useEffect(() => {
    const followed = users.filter((el) => loggedUser.email !== el.email);
    const allEvents = followed.flatMap((user) => user.events || []);

    setEvents(allEvents);
  }, [loggedUser.email, users]);

  const handlePartecipantPopup = () => {
    setPartecipantPopupIsOpen(!partecipantPopupIsOpen);
  };
  return (
    <div className="flex flex-col items-center">
      <TitlePage title="Network" />
      <div className="sticky top-16 w-full">
        <CardList
          events={events}
          handlePartecipantPopup={handlePartecipantPopup}
        />
      </div>
    </div>
  );
}
