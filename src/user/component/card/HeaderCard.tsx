import React, { useState } from "react";
import UserDetails from "../user/UserDetails";
import PriorityPopup from "../shared/PriorityPopup";
import UsersList from "../user/UserList";
import IconAndName from "../shared/IconAndName";
import { Booking, EventModel, User } from "../../models";
import { getUsersByFilter } from "../../../api/apiUsers";

interface HeaderCardProps {
  event: EventModel;
  bookedUsers?: Booking[];
}

export default function HeaderCard({
  event,
  bookedUsers = [],
}: HeaderCardProps): JSX.Element {
  const [reservationsPriorityPopupIsOpen, setReservationsPriorityPopupIsOpen] =
    useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const handleReservationsPopup = async () => {
    setLoading(true);
    try {
      // Prendi tutti gli bookedId unici
      const uniqueBookedIds = [...new Set(bookedUsers.map((b) => b.bookedId))];

      if (uniqueBookedIds.length === 0) {
        setUsers([]);
      } else {
   
        const orConditions = uniqueBookedIds
          .map((id) => `{id} = "${id}"`)
          .join(",");

        const formula = `OR(${orConditions})`;

    
        const fetchedUsers = await getUsersByFilter(formula);

        setUsers(fetchedUsers);
      }
    } catch (error) {
      console.error("Errore nel caricamento utenti:", error);
      setUsers([]);
    } finally {
      setLoading(false);
      setReservationsPriorityPopupIsOpen(true);
    }
  };

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <UserDetails
          firstName={event.firstName}
          lastName={event.lastName}
          email={event.email}
          role={event.role}
        />
        {event.places !== undefined && (
          <IconAndName
            iconName="group"
            onClick={handleReservationsPopup}
            label={`${bookedUsers.length}/${event.places ?? ""}`}
          />
        )}
      </div>

      {reservationsPriorityPopupIsOpen && (
        <PriorityPopup
          handleClose={() => setReservationsPriorityPopupIsOpen(false)}
          title="List of reservations"
        >
          {loading ? (
            <p>Caricamento utenti...</p>
          ) : (
            <UsersList usersToShow={users} />
          )}
        </PriorityPopup>
      )}
    </div>
  );
}
