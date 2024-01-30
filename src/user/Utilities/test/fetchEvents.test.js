import { fetchEvents } from "../fetchFunctions";
import { getListFromDatabase } from "../../../api/apiRequest";
import { setEvents } from "../../../redux/slices/eventsSlice";

jest.mock(".../../../api/apiRequest.js", () => ({
  getListFromDatabase: jest.fn(),
}));

jest.mock("../../../redux/slices/eventsSlice.js", () => ({
  setEvents: jest.fn(),
}));

test("fetchEvents successfully", async () => {
  const mockDispatch = jest.fn();
  const mockEventsFromDatabase = [
    {
      authorId: ["authorId1"],
      lastName: ["LastName1"],
      firstName: ["FirstName1"],
      email: ["email1@example.com"],
      role: ["Role1"],
    },
    {
      authorId: ["authorId2"],
      lastName: ["LastName2"],
      firstName: ["FirstName2"],
      email: ["email2@example.com"],
      role: ["Role2"],
    },
  ];

  getListFromDatabase.mockResolvedValue(mockEventsFromDatabase);

  await fetchEvents(mockDispatch);

  expect(getListFromDatabase).toHaveBeenCalledWith("events");

  expect(setEvents).toHaveBeenCalledWith([
    {
      authorId: "authorId1",
      lastName: "LastName1",
      firstName: "FirstName1",
      email: "email1@example.com",
      role: "Role1",
    },
    {
      authorId: "authorId2",
      lastName: "LastName2",
      firstName: "FirstName2",
      email: "email2@example.com",
      role: "Role2",
    },
  ]);

  expect(mockDispatch).toHaveBeenCalledWith(setEvents(expect.any(Array)));
});

test("fetchEvents with no events in the database", async () => {
  const mockDispatch = jest.fn();

  getListFromDatabase.mockResolvedValue([]);

  await fetchEvents(mockDispatch);

  expect(getListFromDatabase).toHaveBeenCalledWith("events");

  expect(setEvents).toHaveBeenCalledWith([]);

  expect(mockDispatch).toHaveBeenCalledWith(setEvents(expect.any(Array)));
});

test("fetchEvents with error fetching events", async () => {
  const mockDispatch = jest.fn();

  const mockError = new Error("Error retrieving events");
  getListFromDatabase.mockRejectedValue(mockError);

  const consoleErrorSpy = jest.spyOn(console, "error");

  await fetchEvents(mockDispatch);

  expect(getListFromDatabase).toHaveBeenCalledWith("events");

  expect(mockDispatch).not.toHaveBeenCalled();

  expect(consoleErrorSpy).toHaveBeenCalledWith(
    "Error retrieving users from database",
    mockError
  );

  consoleErrorSpy.mockRestore();
});
