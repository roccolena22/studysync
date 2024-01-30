import { fetchUsers } from "../fetchFunctions";
import { getListFromDatabase } from "../../../api/apiRequest";
import { setUsers } from "../../../redux/slices/usersSlice";

jest.mock("../../../api/apiRequest.js", () => ({
  getListFromDatabase: jest.fn(),
}));

jest.mock("../../../redux/slices/usersSlice.js", () => ({
  setUsers: jest.fn(),
}));

test("recover and set up users correctly", async () => {
  const mockDispatch = jest.fn();
  const mockUsersFromDatabase = [
    { firstName: "Rocco", lastName: "Lena" },
    { firstName: "Manuela", lastName: "Blasi" },
  ];

  getListFromDatabase.mockResolvedValue(mockUsersFromDatabase);

  await fetchUsers(mockDispatch);

  // Verifica che getListFromDatabase sia stata chiamata
  expect(getListFromDatabase).toHaveBeenCalledWith("users");

  // Verifica che setUsers sia stata chiamata con i dati restituiti da getListFromDatabase
  expect(setUsers).toHaveBeenCalledWith(mockUsersFromDatabase);

  // Verifica che dispatch sia stata chiamata con l'azione giusta (setUsers)
  expect(mockDispatch).toHaveBeenCalledWith(setUsers(mockUsersFromDatabase));
});

test("calls dispatch even without users", async () => {
  const mockDispatch = jest.fn();

  // Simula il comportamento di getListFromDatabase senza utenti
  getListFromDatabase.mockResolvedValue([]);

  // Esegui la funzione fetchUsers
  await fetchUsers(mockDispatch);

  // Verifica che getListFromDatabase sia stata chiamata
  expect(getListFromDatabase).toHaveBeenCalledWith("users");

  // Verifica che setUsers sia stata chiamata con un array vuoto o un valore di default
  expect(setUsers).toHaveBeenCalledWith([]);
});

test("handles other types of errors in getListFromDatabase", async () => {
  const mockDispatch = jest.fn();

  // Simula un altro tipo di errore in getListFromDatabase
  getListFromDatabase.mockImplementation(() => {
    throw new Error("Other type of error when recovering users");
  });

  // Crea uno spy per console.error
  const consoleErrorSpy = jest.spyOn(console, "error");

  // Esegui la funzione fetchUsers
  await fetchUsers(mockDispatch);

  // Verifica che getListFromDatabase sia stata chiamata
  expect(getListFromDatabase).toHaveBeenCalledWith("users");

  // Verifica che dispatch non sia stata chiamata (a causa dell'errore)
  expect(mockDispatch).not.toHaveBeenCalled();

  // Verifica che sia stato loggato un messaggio di errore
  expect(consoleErrorSpy).toHaveBeenCalledWith(
    "Error retrieving users from database",
    expect.any(Error)
  );

  // Ripristina lo spy dopo il test
  consoleErrorSpy.mockRestore();
});

test("handles an error correctly in getListFromDatabase", async () => {
  const mockDispatch = jest.fn();

  // Simula un errore in getListFromDatabase
  getListFromDatabase.mockImplementation(() => {
    throw new Error("Errore nel recupero degli utenti");
  });

  // Crea uno spy per console.error
  const consoleErrorSpy = jest.spyOn(console, "error");

  // Esegui la funzione fetchUsers
  await fetchUsers(mockDispatch);

  // Verifica che getListFromDatabase sia stata chiamata
  expect(getListFromDatabase).toHaveBeenCalledWith("users");

  // Verifica che dispatch non sia stata chiamata (a causa dell'errore)
  expect(mockDispatch).not.toHaveBeenCalled();

  // Verifica che sia stato loggato un messaggio di errore
  expect(consoleErrorSpy).toHaveBeenCalledWith(
    "Error retrieving users from database",
    expect.any(Error)
  );

  // Ripristina lo spy dopo il test
  consoleErrorSpy.mockRestore();
});
