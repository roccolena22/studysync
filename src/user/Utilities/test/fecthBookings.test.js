import { fetchBookings } from "../fetchFunctions";
import { getListFromDatabase } from "../../../api/apiRequest";
import { setBookings } from "../../../redux/slices/bookingsSlice";

jest.mock(".../../../api/apiRequest.js", () => ({
  getListFromDatabase: jest.fn(),
}));

jest.mock("../../../redux/slices/bookingsSlice.js", () => ({
  setBookings: jest.fn(),
}));

test("fetchBookings successfully", async () => {
  const mockDispatch = jest.fn();
  const mockBookingsFromDatabase = [
    { id: "1", name: "Booking 1" },
    { id: "2", name: "Booking 2" },
  ];

  getListFromDatabase.mockResolvedValue(mockBookingsFromDatabase);

  await fetchBookings(mockDispatch);

  expect(getListFromDatabase).toHaveBeenCalledWith("bookings");

  expect(setBookings).toHaveBeenCalledWith(mockBookingsFromDatabase);

  expect(mockDispatch).toHaveBeenCalledWith(setBookings(mockBookingsFromDatabase));
});

test("fetchBookings with no reservations in the database", async () => {
  const mockDispatch = jest.fn();

  getListFromDatabase.mockResolvedValue([]);

  await fetchBookings(mockDispatch);

  expect(getListFromDatabase).toHaveBeenCalledWith("bookings");

  expect(setBookings).toHaveBeenCalledWith([]);

  expect(mockDispatch).toHaveBeenCalledWith(setBookings([]));
});

test("fetchBookings with error fetching bookings", async () => {
  const mockDispatch = jest.fn();

  const mockError = new Error("Error retrieving reservations");
  getListFromDatabase.mockRejectedValue(mockError);

  const consoleErrorSpy = jest.spyOn(console, "error");

  await fetchBookings(mockDispatch);

  expect(getListFromDatabase).toHaveBeenCalledWith("bookings");

  expect(mockDispatch).not.toHaveBeenCalled();

  expect(consoleErrorSpy).toHaveBeenCalledWith(
    "Error retrieving reservations from database:",
    mockError
  );

  consoleErrorSpy.mockRestore();
});
