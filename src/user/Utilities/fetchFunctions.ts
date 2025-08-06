import { Dispatch } from "redux";
import { getListFromDatabase } from "../../api/apiRequest";
import { setEvents } from "../../redux/slices/eventsSlice";
import { setBookings } from "../../redux/slices/bookingsSlice";
import { setFollowers } from "../../redux/slices/followersSlice";
import { setUsers } from "../../redux/slices/usersSlice";
import { TabelName } from "../../shared/models";
import { Event } from "../models";

// Definisci tipi per gli oggetti ricevuti, se li conosci

export const fetchEvents = async (dispatch: Dispatch) => {
  try {
    const eventsFromDatabase: Event[] = await getListFromDatabase(
      TabelName.EVENTS
    );

    const transformArray = (events: any[]): Event[] =>
      events.map(({ authorId, lastName, firstName, email, role, ...rest }) => ({
        ...rest,
        authorId: authorId[0],
        lastName: lastName[0],
        firstName: firstName[0],
        email: email[0],
        role: role[0],
      }));

    const transformedEventsArray = transformArray(eventsFromDatabase);
    dispatch(setEvents(transformedEventsArray));
  } catch (error) {
    console.error("Error retrieving events from database", error);
  }
};

export const fetchBookings = async (dispatch: Dispatch) => {
  try {
    const bookingsFromDatabase = await getListFromDatabase(TabelName.BOOKINGS);
    dispatch(setBookings(bookingsFromDatabase));
  } catch (error) {
    console.error("Error retrieving bookings from database:", error);
  }
};

export const fetchFollowers = async (dispatch: Dispatch) => {
  try {
    const followersFromDatabase = await getListFromDatabase(TabelName.FOLLOWERS);
    dispatch(setFollowers(followersFromDatabase));
  } catch (error) {
    console.error("Error retrieving followers from database", error);
  }
};

export const fetchUsers = async (dispatch: Dispatch) => {
  try {
    const usersFromDatabase = await getListFromDatabase(TabelName.USERS);
    dispatch(setUsers(usersFromDatabase));
  } catch (error) {
    console.error("Error retrieving users from database", error);
  }
};
