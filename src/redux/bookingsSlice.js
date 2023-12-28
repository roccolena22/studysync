import { createSlice } from '@reduxjs/toolkit';

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: [],
  reducers: {
    setBookings: (state, action) => {
      return action.payload;
    },
    addBooking: (state, action) => {
      state.push(action.payload);
    },
    removeBooking: (state, action) => {
      const index = state.findIndex((follower) => follower.idTo === action.payload.idTo);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { setBookings, addBooking, removeBooking } = bookingsSlice.actions;

export default bookingsSlice.reducer;