import { createSlice } from '@reduxjs/toolkit';

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: [],
  reducers: {
    setBookings: (state, action) => {
      return action.payload;
    },
  },
});

export const { setBookings } = bookingsSlice.actions;

export default bookingsSlice.reducer;