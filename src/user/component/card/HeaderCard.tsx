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

 const handleShareClick = async () => {
 const baseUrl = window.location.origin;

  const shareUrl = `${baseUrl}/studysync/event/${event.id}`;
  if (navigator.share) {
    try {
      await navigator.share({
        title: `Check out this event: ${event.title}`,
        url: shareUrl,
      });
    } catch (err) {
      console.log("Condivisione annullata o fallita", err);
    }
  } else {
    // Fallback: copia il link negli appunti e mostra alert
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copiato negli appunti!");
    } catch {
      alert("Condivisione non supportata e copia negli appunti fallita");
    }
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
          id={event.authorId}
        />
        <div className="flex space-x-2">
          <IconAndName
            iconName="share"
            label="Share"
            onClick={handleShareClick}
          />
          {event.places && (
            <IconAndName
              iconName="group"
              onClick={handleReservationsPopup}
              label={`${bookedUsers.length}/${event.places}`}
            />
          )}
        </div>
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
