import { useState } from "react";
import TitlePage from "../component/shared/TitlePage";
import CardList from "../component/card/CardList";
import Popup from "../component/shared/Popup";
import UsersList from "../component/user/UserList";

export default function Network({ loggedUser, followers, events, users }) {

  const [reservationsPopupIsOpen, setReservationsPopupIsOpen] = useState(false);

  const filterFollowers = followers && followers.filter(
    (user) => user.idTo === loggedUser.id
  );
  const loggedUserFollowers = filterFollowers.map((user) => ({
    idFrom: user.idFrom,
  }));

  const networkEvents = events.filter((event) =>
    loggedUserFollowers.some((item) => item.idFrom === event.authorId)
  );

  const handleReservationsPopup = () => {
    setReservationsPopupIsOpen(!reservationsPopupIsOpen);
  };

  const handleCloseReservationsPopup = () => {
    setReservationsPopupIsOpen(!reservationsPopupIsOpen);
    setReservationsPopupIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center">
      <TitlePage title="Network" />
      <div className="sticky top-16 w-full">
        <CardList
          events={networkEvents}
          handleReservationsPopup={handleReservationsPopup}
        />
      </div>
      {reservationsPopupIsOpen && (
        <Popup
          handleClose={handleCloseReservationsPopup}
          title="List of reservations"
        >
          <UsersList users={users} loggedUser={loggedUser} />
        </Popup>
      )}
    </div>
  );
}
