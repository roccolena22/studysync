import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
import authReducer from "./slices/authSlice";
import followersReducer from "./slices/followersSlice";
import eventsReducer from "./slices/eventsSlice";
import nextEventsReducer from "./slices/nextEventsSlice";
import bookingsReducer from "./slices/bookingsSlice";
import usersReducer from "./slices/usersSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    followers: followersReducer,
    users: usersReducer,
    events: eventsReducer,
    nextEvents: nextEventsReducer,
    bookings: bookingsReducer,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);

export default store;
