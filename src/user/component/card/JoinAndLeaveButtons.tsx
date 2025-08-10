import { useEffect, useState } from "react";
import Button from "../../../shared/component/Button";
import { addRecordToDatabase } from "../../../api/apiRequest";
import { deleteBooking } from "../../../api/apiBookings";
import { TabelName } from "../../../shared/models";
import { EventModel, Booking } from "../../models";

interface Props {
  event: EventModel;
  bookedUsers: Booking[];     
  loggedUserId: string;            
  updateBookingForEvent: (eventId: string, newBookings: Booking[]) => void;
}

export default function JoinAndLeaveButtons({
  event,
  bookedUsers,
  loggedUserId,
  updateBookingForEvent,
}: Props): JSX.Element {
  const [isBooked, setIsBooked] = useState<boolean>(false);

  // Controlla se l'utente è già prenotato per questo evento
  useEffect(() => {
    const booked = bookedUsers.some(booking => booking.bookedId === loggedUserId);
    setIsBooked(booked);
  }, [bookedUsers, loggedUserId]);

  const toggleBooking = async (eventId: string, isAdding: boolean) => {
    try {
     if (isAdding) {
  const response = await addRecordToDatabase(TabelName.BOOKINGS, {
    eventId: [eventId],
    bookedId: loggedUserId,
    // authorId rimosso
  });

  const newBooking: Booking = {
    id: response.records[0].id,
    bookedId: loggedUserId,
    eventId: eventId,
    authorId: "", // lo popolerai dopo se serve, magari ricaricando il record
  };

  updateBookingForEvent(eventId, [...bookedUsers, newBooking]);
} else {
        // Trova la prenotazione da rimuovere (quella con bookedId = loggedUserId)
        const bookingToRemove = bookedUsers.find(b => b.bookedId === loggedUserId);
        if (!bookingToRemove) return;

        // Rimuovi prenotazione dal database
        await deleteBooking(bookingToRemove.id);

        // Aggiorna la lista locale rimuovendo la prenotazione eliminata
        updateBookingForEvent(
          eventId,
          bookedUsers.filter(b => b.id !== bookingToRemove.id)
        );
      }
    } catch (error) {
      console.error(`Errore ${isAdding ? "aggiungendo" : "rimuovendo"} la prenotazione`, error);
    }
  };

  const isFull = bookedUsers.length >= event.places;

  return (
    <div>
      {!isFull && !isBooked && (
        <Button small label="Join" onClick={() => toggleBooking(event.id, true)} />
      )}
      {isBooked && (
        <Button small outline label="Leave" onClick={() => toggleBooking(event.id, false)} />
      )}
    </div>
  );
}
