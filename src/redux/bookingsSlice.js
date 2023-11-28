import { createSlice } from '@reduxjs/toolkit';

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: [],
  reducers: {
    setbookings: (state, action) => {
      return action.payload;
    },
  },
});

export const { setbookings, addUser } = bookingsSlice.actions;
export default bookingsSlice.reducer;
