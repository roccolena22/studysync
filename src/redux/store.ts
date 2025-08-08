import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";;

const persistConfig: PersistConfig<any> = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer<any>(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // necessario per redux-persist
    }),
});

export const persistor = persistStore(store);

// Tipi helper
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
