import { useState } from "react";
import TitlePage from "../component/shared/TitlePage";
import CardList from "../component/card/CardList";

export default function Network({ loggedUser, followers, events }) {
  const [partecipantPopupIsOpen, setPartecipantPopupIsOpen] = useState(false);
  const handlePartecipantPopup = () => {
    setPartecipantPopupIsOpen(!partecipantPopupIsOpen);
  };

const filterFollowers = followers.filter((user)=> user.idTo === loggedUser.id);
const loggedUserFollowers = filterFollowers.map((user)=>({idFrom: user.idFrom}))

const networkEvents = events.filter(event => loggedUserFollowers.some(item => item.idFrom === event.authorId));

  return (
    <div className="flex flex-col items-center">
      <TitlePage title="Network" />
      <div className="sticky top-16 w-full">
        <CardList
          events={networkEvents}
          handlePartecipantPopup={handlePartecipantPopup}
        />
      </div>
    </div>
  );
}
