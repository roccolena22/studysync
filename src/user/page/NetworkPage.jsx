import { useState } from "react";
import Title from "../component/shared/Title";
import EventList from "../component/card/EventList";
import PriorityPopup from "../component/shared/PriorityPopup";
import UsersList from "../component/user/UserList";
import moment from "moment";
import { addFollower, removeFollower } from "../../redux/followersSlice";
import { addRecordToDatabase, deleteRecordFromDatabase, getListFromDatabase } from "../../api/apiRequest";
import { setLoggedUser } from "../../redux/authSlice";
import { setUsers } from "../../redux/usersSlice";
import { useDispatch } from "react-redux";

export default function NetworkPage({ loggedUser, followers, events, users, bookings }) {
  const [reservationsPriorityPopupIsOpen, setReservationsPriorityPopupIsOpen] = useState(false);
  const currentDate = moment();
  const dispatch = useDispatch()

  const networkEvents = events
  .filter((event) =>
    followers?.some((user) => user.idFrom[0] === loggedUser.id && user.idTo[0] === event.authorId)
  )
  .filter((event) => moment(event.endDate + " " + event.endTime, "MM/DD/YYYY HH:mm").isAfter(currentDate));


  const handleReservationsPriorityPopup = () => {
    setReservationsPriorityPopupIsOpen(!reservationsPriorityPopupIsOpen);
  };

  const handleCloseReservationsPriorityPopup = () => {
    setReservationsPriorityPopupIsOpen(!reservationsPriorityPopupIsOpen);
  };

  const toggleFollow = async (userFollowedId, isAdding) => {
    const followerAction = isAdding ? addFollower : removeFollower;

    const followerData = isAdding
      ? { idFrom: [loggedUser.id], idTo: [userFollowedId] }
      : followers.find((item) => item.idTo[0] === userFollowedId);

    try {
      if (isAdding) {
        await addRecordToDatabase("followers", followerData);
      } else {
        await deleteRecordFromDatabase("followers", followerData.id);
      }

      dispatch(followerAction(followerData));

      const updatedUsers = await getListFromDatabase("users");
      const refreshLoggedUser = updatedUsers.find((user) => user.email === loggedUser.email);

      dispatch(setLoggedUser(refreshLoggedUser));
      dispatch(setUsers(updatedUsers));
    } catch (error) {
      console.error(`Error ${isAdding ? 'adding' : 'removing'} follower`, error);
    } finally {
      fetchFollowers();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Title title="Network" />
      <div className="w-full">
        <EventList
          loggedUser={loggedUser}
          events={networkEvents}
          users={users}
          handleReservationsPriorityPopup={handleReservationsPriorityPopup}
          bookings={bookings}
        />
      </div>
      {reservationsPriorityPopupIsOpen && (
        <PriorityPopup
          handleClose={handleCloseReservationsPriorityPopup}
          title="List of reservations"
        >
          <UsersList users={users} loggedUser={loggedUser} toggleFollow={toggleFollow}/>
        </PriorityPopup>
      )}
    </div>
  );
}
