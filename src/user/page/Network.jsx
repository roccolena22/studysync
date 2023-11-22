import { useEffect, useState } from "react";
import TitlePage from "../component/shared/TitlePage";
import CardList from "../component/card/CardList";
import { getFromDatabase } from "../../api/apiRequest";

export default function Network({ loggedUser }) {
  const [partecipantPopupIsOpen, setPartecipantPopupIsOpen] = useState(false);

  const fetchEvents = async () => {
    const eventsFromDatabase = await getFromDatabase("events");
    const eventsFields = eventsFromDatabase.map((item) => item.fields);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handlePartecipantPopup = () => {
    setPartecipantPopupIsOpen(!partecipantPopupIsOpen);
  };
  return (
    <div className="flex flex-col items-center">
      <TitlePage title="Network" />
      <div className="sticky top-16 w-full">
        {/* <CardList
          events={events}
          handlePartecipantPopup={handlePartecipantPopup}
        /> */}
      </div>
    </div>
  );
}
