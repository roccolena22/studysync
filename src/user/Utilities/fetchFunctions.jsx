import { useDispatch } from "react-redux";
import { getListFromDatabase } from "../../api/apiRequest";
import { setEvents } from "../../redux/slices/eventsSlice";
import { setBookings } from "../../redux/slices/bookingsSlice";
import { setFollowers } from "../../redux/slices/followersSlice";
import { setUsers } from "../../redux/slices/usersSlice";

const dispatch = useDispatch();

export const fetchEvents = async () => {
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
  };

  export const fetchBookings = async () => {
    try {
      const bookings = await getListFromDatabase("bookings");
      dispatch(setBookings(bookings));
    } catch (error) {
      console.error("Error handling reservations:", error);
    }
  };

  export  const fetchFollowers = async () => {
    try {
      const followersFromDatabase = await getListFromDatabase("followers");
      dispatch(setFollowers(followersFromDatabase));
    } catch (error) {
      console.error("Error retrieving followers from database", error);
    }
  };

  export const fetchUsers = async () => {
    try {
      const usersFromDatabase = await getListFromDatabase("users");
      dispatch(setUsers(usersFromDatabase));
    } catch (error) {
      console.error("Error retrieving users from database", error);
    }
  };