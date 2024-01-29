import { getListFromDatabase } from "../../api/apiRequest";
import { setEvents } from "../../redux/slices/eventsSlice";
import { setBookings } from "../../redux/slices/bookingsSlice";
import { setFollowers } from "../../redux/slices/followersSlice";
import { setUsers } from "../../redux/slices/usersSlice";

export const fetchEvents = async (dispatch) => {
  try {
    const eventsFromDatabase = await getListFromDatabase("events");
    const transformArray = (eventsFromDatabase) =>
      eventsFromDatabase.map(
        ({ authorId, lastName, firstName, email, role, ...rest }) => ({
          ...rest,
          authorId: authorId[0],
          lastName: lastName[0],
          firstName: firstName[0],
          email: email[0],
          role: role[0],
        })
      );
    const transformedEventsArray = transformArray(eventsFromDatabase);
    dispatch(setEvents(transformedEventsArray));
  } catch (error) {
    console.error("Error retrieving users from database", error);
  }
};

export const fetchBookings = async (dispatch) => {
  try {
    const bookingsFromDatabase = await getListFromDatabase("bookings");
    dispatch(setBookings(bookingsFromDatabase));
  } catch (error) {
    console.error("Error retrieving reservations from database:", error);
  }
};

export const fetchFollowers = async (dispatch) => {
  try {
    const followersFromDatabase = await getListFromDatabase("followers");
    dispatch(setFollowers(followersFromDatabase));
  } catch (error) {
    console.error("Error retrieving followers from database", error);
  }
};

export const fetchUsers = async (dispatch) => {
  try {
    const usersFromDatabase = await getListFromDatabase("users");
    dispatch(setUsers(usersFromDatabase));
  } catch (error) {
    console.error("Error retrieving users from database", error);
  }
};
