import { fetchEvents } from "../fetchFunctions";
import { getListFromDatabase } from "../../../api/apiRequest";
import { setEvents } from "../../../redux/slices/eventsSlice";

// Mock delle funzioni
jest.mock(".../../../api/apiRequest.js", () => ({
  getListFromDatabase: jest.fn(),
}));

jest.mock("../../../redux/slices/eventsSlice.js", () => ({
  setEvents: jest.fn(),
}));

// Testa il caso di successo
test("fetchEvents con successo", async () => {
  const mockDispatch = jest.fn();
  const mockEventsFromDatabase = [
    {
      authorId: ["authorId1"],
      lastName: ["LastName1"],
      firstName: ["FirstName1"],
      email: ["email1@example.com"],
      role: ["Role1"],
      // ... altre proprietà dell'evento
    },
    {
      authorId: ["authorId2"],
      lastName: ["LastName2"],
      firstName: ["FirstName2"],
      email: ["email2@example.com"],
      role: ["Role2"],
      // ... altre proprietà dell'evento
    },
  ];

  // Mock della chiamata a getListFromDatabase
  getListFromDatabase.mockResolvedValue(mockEventsFromDatabase);

  // Esegui la funzione fetchEvents
  await fetchEvents(mockDispatch);

  // Verifica che getListFromDatabase sia stata chiamata con il parametro corretto
  expect(getListFromDatabase).toHaveBeenCalledWith("events");

  // Verifica che setEvents sia stata chiamata con l'array trasformato
  expect(setEvents).toHaveBeenCalledWith([
    {
      authorId: "authorId1",
      lastName: "LastName1",
      firstName: "FirstName1",
      email: "email1@example.com",
      role: "Role1",
      // ... altre proprietà dell'evento
    },
    {
      authorId: "authorId2",
      lastName: "LastName2",
      firstName: "FirstName2",
      email: "email2@example.com",
      role: "Role2",
      // ... altre proprietà dell'evento
    },
  ]);

  // Verifica che dispatch sia stata chiamata con l'azione giusta (setEvents)
  expect(mockDispatch).toHaveBeenCalledWith(setEvents(expect.any(Array)));
});

// Testa il caso in cui non ci sono eventi nel database
test("fetchEvents senza eventi nel database", async () => {
  const mockDispatch = jest.fn();

  // Simula il comportamento di getListFromDatabase senza eventi
  getListFromDatabase.mockResolvedValue([]);

  // Esegui la funzione fetchEvents
  await fetchEvents(mockDispatch);

  // Verifica che getListFromDatabase sia stata chiamata con il parametro corretto
  expect(getListFromDatabase).toHaveBeenCalledWith("events");

  // Verifica che setEvents sia stata chiamata con un array vuoto
  expect(setEvents).toHaveBeenCalledWith([]);

  // Verifica che dispatch sia stata chiamata con l'azione giusta (setEvents)
  expect(mockDispatch).toHaveBeenCalledWith(setEvents(expect.any(Array)));
});

// Testa il caso di errore durante il recupero degli eventi
test("fetchEvents con errore nel recupero degli eventi", async () => {
  const mockDispatch = jest.fn();

  // Simula un errore in getListFromDatabase
  const mockError = new Error("Errore nel recupero degli eventi");
  getListFromDatabase.mockRejectedValue(mockError);

  // Crea uno spy per console.error
  const consoleErrorSpy = jest.spyOn(console, "error");

  // Esegui la funzione fetchEvents
  await fetchEvents(mockDispatch);

  // Verifica che getListFromDatabase sia stata chiamata con il parametro corretto
  expect(getListFromDatabase).toHaveBeenCalledWith("events");

  // Verifica che dispatch non sia stata chiamata (a causa dell'errore)
  expect(mockDispatch).not.toHaveBeenCalled();

  // Verifica che sia stato loggato un messaggio di errore sulla console
  expect(consoleErrorSpy).toHaveBeenCalledWith(
    "Error retrieving users from database",
    mockError
  );

  // Ripristina lo spy dopo il test
  consoleErrorSpy.mockRestore();
});
