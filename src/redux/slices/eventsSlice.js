import { createSlice } from '@reduxjs/toolkit';

const eventsSlice = createSlice({
  name: 'events',
  initialState: [],
  reducers: {
    setEvents: (state, action) => {
      return action.payload;
    },
    addEvent: (state, action) => {
      state.push(action.payload);
    },
    deleteEvent: (state, action) => {
      const index = state.findIndex((event) => event.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    editEvent: (state, action) => {
      const index = state.findIndex((event) => event.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { setEvents, deleteEvent, addEvent, editEvent } = eventsSlice.actions;

export default eventsSlice.reducer;
