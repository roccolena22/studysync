import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import followersReducer from './followersSlice';
import usersReducer from './usersSlice';
import eventsReducer from './eventsSlice';
import bookedsReducer from './bookedsSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    followers: followersReducer,
    users: usersReducer,
    events: eventsReducer,
    bookeds: bookedsReducer,
  },
});

export default store;
