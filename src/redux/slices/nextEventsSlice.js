import { createSlice } from "@reduxjs/toolkit";

const nextEventsSlice = createSlice({
  name: "nextEvents",
  initialState: [],
  reducers: {
    setNextEvents: (state, action) => action.payload,
  },
});

export const { setNextEvents } = nextEventsSlice.actions;

export default nextEventsSlice.reducer;
