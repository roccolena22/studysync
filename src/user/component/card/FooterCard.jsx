import React, { useEffect, useState } from "react";
import Button from "../../../shared/component/Button";
import IconAndName from "../user/IconAndName";

export default function FooterCard({
  event,
  users,
  bookings,
  handleOpenEditPriorityPopup,
  handleDelete,
  addToBookings,
  deleteToBookings,
  proproetaryEvent,
  loggedUser
}) {
  const [bookedRecordId, setBookedRecordId] = useState([]);
  const [bookedUsers, setBookedUsers] = useState([]);
  const [isUserBooked, setIsUserBooked] = useState(false);

  const idsArray = event && event.bookingsRecordId
  ? bookings
    .filter((booking) => event.bookingsRecordId.includes(booking.id))
    .map((booking) => booking.bookedId)
  : [];

  useEffect(() => {
    setBookedRecordId(event.bookingsRecordId || []);
    setBookedUsers(users.filter((user) => idsArray.includes(user.id)) || [])
    const userIds = bookedUsers.map(user => user.id);
    setIsUserBooked(event && event.bookingsRecordId && userIds.includes(loggedUser.id) || false);
  }, [event, bookings]);


  const currentDate = new Date();
  const isFinished = new Date(`${event.endDate} ${event.endTime}`) < currentDate;


  const deleteIcon = (
    <IconAndName
      iconName="delete"
      label="delete"
      onClick={() => handleDelete(event)}
      color="text-red-800"
    />
  );

 
  return (
    <div className="flex space-x-2">
      {isFinished && proproetaryEvent ? (
        deleteIcon
      ) : (
        <>
          {proproetaryEvent && (
            <>
              <IconAndName iconName="edit" label="edit" onClick={handleOpenEditPriorityPopup} />
              {deleteIcon}
            </>
          )}

          {!proproetaryEvent && (
            <>
              {event.places && bookedRecordId.length < event.places && !isUserBooked && (
                <Button small name="Join" onClick={() => addToBookings(event)} />
              )}
              {isUserBooked && (
                <Button small outline name="Leave" onClick={() => deleteToBookings(event.id)} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
