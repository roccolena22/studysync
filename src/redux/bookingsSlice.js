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
    deleteBooking: (state, action) => {
      const index = state.findIndex((booking) => booking.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },    
  },
});

export const { setBookings, addBooking, deleteBooking } = bookingsSlice.actions;

export default bookingsSlice.reducer;