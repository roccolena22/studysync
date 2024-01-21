import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: [],
  reducers: {
    setBookings: (state, action) => action.payload,
    addBooking: (state, action) => {
      const existingBooking = state.find((booking) => booking.id === action.payload.id);
      if (!existingBooking) {
        return [...state, action.payload];
      }
      return state;
    },
    deleteBooking: (state, action) =>
      produce(state, (draftState) => {
        const index = draftState.findIndex((booking) => booking.id === action.payload.id);
        if (index !== -1) {
          draftState.splice(index, 1);
        }
      }),
  },
});

export const { setBookings, addBooking, deleteBooking } = bookingsSlice.actions;

export default bookingsSlice.reducer;
