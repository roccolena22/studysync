import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
  name: "events",
  initialState: [],
  reducers: {
    setEvents: (state, action) => {
      return action.payload;
    },
    deleteEvent: (state, action) => {
      const index = state.findIndex((event) => event.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { setEvents, deleteEvent } =
  eventsSlice.actions;

export default eventsSlice.reducer;
