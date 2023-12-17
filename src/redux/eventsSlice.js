import { createSlice } from '@reduxjs/toolkit';

const eventsSlice = createSlice({
  name: 'events',
  initialState: [],
  reducers: {
    setEvent: (state, action) => {
      return action.payload;
    },
  },
});

export const { setEvent } = eventsSlice.actions;

export default eventsSlice.reducer;
