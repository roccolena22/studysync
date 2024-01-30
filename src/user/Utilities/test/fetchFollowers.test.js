import { fetchFollowers } from "../fetchFunctions";
import { getListFromDatabase } from "../../../api/apiRequest";
import { setFollowers } from "../../../redux/slices/followersSlice";

jest.mock("../../../api/apiRequest.js", () => ({
  getListFromDatabase: jest.fn(),
}));

jest.mock("../../../redux/slices/followersSlice.js", () => ({
  setFollowers: jest.fn(),
}));

test("recover and set up users correctly", async () => {
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

  expect(getListFromDatabase).toHaveBeenCalledWith("followers");

  expect(setFollowers).toHaveBeenCalledWith(mockFollowersFromDatabase);

  expect(mockDispatch).toHaveBeenCalledWith(
    setFollowers(mockFollowersFromDatabase)
  );
});

test("calls dispatch even without users", async () => {
  const mockDispatch = jest.fn();

  getListFromDatabase.mockResolvedValue([]);

  await fetchFollowers(mockDispatch);
  expect(getListFromDatabase).toHaveBeenCalledWith("followers");

  expect(setFollowers).toHaveBeenCalledWith([]);
});

test("handles other types of errors in getListFromDatabase", async () => {
  const mockDispatch = jest.fn();

  getListFromDatabase.mockImplementation(() => {
    throw new Error("Other type of error when recovering users");
  });

  const consoleErrorSpy = jest.spyOn(console, "error");

  await fetchFollowers(mockDispatch);

  expect(getListFromDatabase).toHaveBeenCalledWith("followers");

  expect(mockDispatch).not.toHaveBeenCalled();

  expect(consoleErrorSpy).toHaveBeenCalledWith(
    "Error retrieving followers from database",
    expect.any(Error)
  );

  consoleErrorSpy.mockRestore();
});

test("correctly handles an error in getListFromDatabase", async () => {
  const mockDispatch = jest.fn();

  getListFromDatabase.mockImplementation(() => {
    throw new Error("Errore nel recupero degli utenti");
  });

  const consoleErrorSpy = jest.spyOn(console, "error");

  await fetchFollowers(mockDispatch);

  expect(getListFromDatabase).toHaveBeenCalledWith("followers");

  expect(mockDispatch).not.toHaveBeenCalled();

  expect(consoleErrorSpy).toHaveBeenCalledWith(
    "Error retrieving followers from database",
    expect.any(Error)
  );

  consoleErrorSpy.mockRestore();
});
