import { fetchFollowers } from "../fetchFunctions";
import { getListFromDatabase } from "../../../api/apiRequest";
import { setFollowers } from "../../../redux/slices/followersSlice";

jest.mock("../../../api/apiRequest.js", () => ({
  getListFromDatabase: jest.fn(),
}));

jest.mock("../../../redux/slices/followersSlice.js", () => ({
  setFollowers: jest.fn()
}));

test("recupera e imposta gli utenti correttamente", async () => {
  const mockDispatch = jest.fn();
  const mockFollowersFromDatabase = [
    {
      id: "recuiRZHwxFNmWfdO",
      idFrom: "recDZVzee0H3NeryK",
      idTo: "rechJdsIagGbOEJuC",
    },
  ];

  getListFromDatabase.mockResolvedValue(mockFollowersFromDatabase);

  await fetchFollowers(mockDispatch);

  // Verifica che getListFromDatabase sia stata chiamata
  expect(getListFromDatabase).toHaveBeenCalledWith("followers");

  // Verifica che setFollowers sia stata chiamata con i dati restituiti da getListFromDatabase
  expect(setFollowers).toHaveBeenCalledWith(mockFollowersFromDatabase);

  // Verifica che dispatch sia stata chiamata con l'azione giusta (setFollowers)
  expect(mockDispatch).toHaveBeenCalledWith(
    setFollowers(mockFollowersFromDatabase)
  );
});

test("chiama dispatch anche senza utenti", async () => {
  const mockDispatch = jest.fn();

  // Simula il comportamento di getListFromDatabase senza utenti
  getListFromDatabase.mockResolvedValue([]);

  // Esegui la funzione fetchFollowers
  await fetchFollowers(mockDispatch);

  // Verifica che getListFromDatabase sia stata chiamata
  expect(getListFromDatabase).toHaveBeenCalledWith("followers");

  // Verifica che setFollowers sia stata chiamata con un array vuoto o un valore di default
  expect(setFollowers).toHaveBeenCalledWith([]);
});

test("gestisce altri tipi di errori in getListFromDatabase", async () => {
  const mockDispatch = jest.fn();

  // Simula un altro tipo di errore in getListFromDatabase
  getListFromDatabase.mockImplementation(() => {
    throw new Error("Altro tipo di errore durante il recupero degli utenti");
  });

  // Crea uno spy per console.error
  const consoleErrorSpy = jest.spyOn(console, "error");

  // Esegui la funzione fetchFollowers
  await fetchFollowers(mockDispatch);

  // Verifica che getListFromDatabase sia stata chiamata
  expect(getListFromDatabase).toHaveBeenCalledWith("followers");

  // Verifica che dispatch non sia stata chiamata (a causa dell'errore)
  expect(mockDispatch).not.toHaveBeenCalled();

  // Verifica che sia stato loggato un messaggio di errore
  expect(consoleErrorSpy).toHaveBeenCalledWith(
    "Error retrieving followers from database",
    expect.any(Error)
  );

  // Ripristina lo spy dopo il test
  consoleErrorSpy.mockRestore();
});

test("gestisce correttamente un errore in getListFromDatabase", async () => {
  const mockDispatch = jest.fn();

  // Simula un errore in getListFromDatabase
  getListFromDatabase.mockImplementation(() => {
    throw new Error("Errore nel recupero degli utenti");
  });

  // Crea uno spy per console.error
  const consoleErrorSpy = jest.spyOn(console, "error");

  // Esegui la funzione fetchFollowers
  await fetchFollowers(mockDispatch);

  // Verifica che getListFromDatabase sia stata chiamata
  expect(getListFromDatabase).toHaveBeenCalledWith("followers");

  // Verifica che dispatch non sia stata chiamata (a causa dell'errore)
  expect(mockDispatch).not.toHaveBeenCalled();

  // Verifica che sia stato loggato un messaggio di errore
  expect(consoleErrorSpy).toHaveBeenCalledWith(
    "Error retrieving followers from database",
    expect.any(Error)
  );

  // Ripristina lo spy dopo il test
  consoleErrorSpy.mockRestore();
});
