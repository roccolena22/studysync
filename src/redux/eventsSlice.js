import { createSlice } from '@reduxjs/toolkit';

const eventsSlice = createSlice({
  name: 'events',
  initialState: [],
  reducers: {
    setEvent: (state, action) => {
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
  },
});

export const { setEvent, deleteEvent, addEvent } = eventsSlice.actions;

export default eventsSlice.reducer;
