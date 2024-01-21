import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

const eventsSlice = createSlice({
  name: "events",
  initialState: [],
  reducers: {
    setEvents: (state, action) => action.payload,
    addEvent: (state, action) => {
      const existingEvent = state.find((event) => event.id === action.payload.id);
      if (!existingEvent) {
        return [...state, action.payload];
      }
      return state;
    },
    deleteEvent: (state, action) =>
      produce(state, (draftState) => {
        const index = draftState.findIndex((event) => event.id === action.payload.id);
        if (index !== -1) {
          draftState.splice(index, 1);
        }
      }),
    editEvent: (state, action) =>
      produce(state, (draftState) => {
        const index = draftState.findIndex((event) => event.id === action.payload.id);
        if (index !== -1) {
          draftState[index] = action.payload;
        }
      }),
  },
});

export const { setEvents, deleteEvent, addEvent, editEvent } = eventsSlice.actions;

export default eventsSlice.reducer;
