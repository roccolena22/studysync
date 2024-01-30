import { fetchBookings } from "../fetchFunctions";
import { getListFromDatabase } from "../../../api/apiRequest";
import { setBookings } from "../../../redux/slices/bookingsSlice";

// Mock delle funzioni
jest.mock(".../../../api/apiRequest.js", () => ({
  getListFromDatabase: jest.fn(),
}));

jest.mock("../../../redux/slices/bookingsSlice.js", () => ({
  setBookings: jest.fn(),
}));

// Testa il caso di successo
test("fetchBookings successfully", async () => {
  const mockDispatch = jest.fn();
  const mockBookingsFromDatabase = [
    { id: "1", name: "Booking 1" },
    { id: "2", name: "Booking 2" },
  ];

  // Mock della chiamata a getListFromDatabase
  getListFromDatabase.mockResolvedValue(mockBookingsFromDatabase);

  // Esegui la funzione fetchBookings
  await fetchBookings(mockDispatch);

  // Verifica che getListFromDatabase sia stata chiamata
  expect(getListFromDatabase).toHaveBeenCalledWith("bookings");

  // Verifica che setBookings sia stata chiamata con i dati restituiti da getListFromDatabase
  expect(setBookings).toHaveBeenCalledWith(mockBookingsFromDatabase);

  // Verifica che dispatch sia stata chiamata con l'azione giusta (setBookings)
  expect(mockDispatch).toHaveBeenCalledWith(setBookings(mockBookingsFromDatabase));
});

// Testa il caso in cui non ci sono prenotazioni nel database
test("fetchBookings with no reservations in the database", async () => {
  const mockDispatch = jest.fn();

  // Simula il comportamento di getListFromDatabase senza prenotazioni
  getListFromDatabase.mockResolvedValue([]);

  // Esegui la funzione fetchBookings
  await fetchBookings(mockDispatch);

  // Verifica che getListFromDatabase sia stata chiamata
  expect(getListFromDatabase).toHaveBeenCalledWith("bookings");

  // Verifica che setBookings sia stata chiamata con un array vuoto
  expect(setBookings).toHaveBeenCalledWith([]);

  // Verifica che dispatch sia stata chiamata con l'azione giusta (setBookings)
  expect(mockDispatch).toHaveBeenCalledWith(setBookings([]));
});

// Testa il caso di errore durante il recupero delle prenotazioni
test("fetchBookings with error fetching bookings", async () => {
  const mockDispatch = jest.fn();

  // Simula un errore in getListFromDatabase
  const mockError = new Error("Error retrieving reservations");
  getListFromDatabase.mockRejectedValue(mockError);

  // Crea uno spy per console.error
  const consoleErrorSpy = jest.spyOn(console, "error");

  // Esegui la funzione fetchBookings
  await fetchBookings(mockDispatch);

  // Verifica che getListFromDatabase sia stata chiamata
  expect(getListFromDatabase).toHaveBeenCalledWith("bookings");

  // Verifica che dispatch non sia stata chiamata (a causa dell'errore)
  expect(mockDispatch).not.toHaveBeenCalled();

  // Verifica che sia stato loggato un messaggio di errore sulla console
  expect(consoleErrorSpy).toHaveBeenCalledWith(
    "Error retrieving reservations from database:",
    mockError
  );

  // Ripristina lo spy dopo il test
  consoleErrorSpy.mockRestore();
});
