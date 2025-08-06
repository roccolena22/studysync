import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Booking {
  id: string;
  eventId: string;
  bookedId: string;
}

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: [] as Booking[],
  reducers: {
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      return action.payload;
    },
  },
});

export const { setBookings } = bookingsSlice.actions;
export default bookingsSlice.reducer;
