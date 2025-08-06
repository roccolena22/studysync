import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Event} from "../../user/models"

const eventsSlice = createSlice({
  name: "events",
  initialState: [] as Event[],
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      return action.payload;
    },
    deleteEvent: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((event) => event.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { setEvents, deleteEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
