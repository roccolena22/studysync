import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import followersReducer from './followersSlice';
import usersReducer from './usersSlice';
import eventsReducer from './eventsSlice';
import bookingsReducer from './bookingsSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    followers: followersReducer,
    users: usersReducer,
    events: eventsReducer,
    bookings: bookingsReducer,
  },
});

export default store;
