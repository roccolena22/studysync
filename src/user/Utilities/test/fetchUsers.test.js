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

  expect(getListFromDatabase).toHaveBeenCalledWith("users");

  expect(setUsers).toHaveBeenCalledWith(mockUsersFromDatabase);

  expect(mockDispatch).toHaveBeenCalledWith(setUsers(mockUsersFromDatabase));
});

test("calls dispatch even without users", async () => {
  const mockDispatch = jest.fn();

  getListFromDatabase.mockResolvedValue([]);

  await fetchUsers(mockDispatch);

  expect(getListFromDatabase).toHaveBeenCalledWith("users");

  expect(setUsers).toHaveBeenCalledWith([]);
});

test("handles other types of errors in getListFromDatabase", async () => {
  const mockDispatch = jest.fn();

  getListFromDatabase.mockImplementation(() => {
    throw new Error("Other type of error when recovering users");
  });

  const consoleErrorSpy = jest.spyOn(console, "error");

  await fetchUsers(mockDispatch);

  expect(getListFromDatabase).toHaveBeenCalledWith("users");
  expect(mockDispatch).not.toHaveBeenCalled();

  expect(consoleErrorSpy).toHaveBeenCalledWith(
    "Error retrieving users from database",
    expect.any(Error)
  );

  consoleErrorSpy.mockRestore();
});

test("handles an error correctly in getListFromDatabase", async () => {
  const mockDispatch = jest.fn();

  getListFromDatabase.mockImplementation(() => {
    throw new Error("Errore nel recupero degli utenti");
  });

  const consoleErrorSpy = jest.spyOn(console, "error");

  await fetchUsers(mockDispatch);

  expect(getListFromDatabase).toHaveBeenCalledWith("users");

  expect(mockDispatch).not.toHaveBeenCalled();

  expect(consoleErrorSpy).toHaveBeenCalledWith(
    "Error retrieving users from database",
    expect.any(Error)
  );

  consoleErrorSpy.mockRestore();
});
