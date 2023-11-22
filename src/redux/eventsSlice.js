import { createSlice } from '@reduxjs/toolkit';

// Definisci le azioni del tuo slice
const eventsSlice = createSlice({
  name: 'events',
  initialState: [],
  reducers: {
    addEvent: (state, action) => {
      return action.payload;
    },
    // Puoi aggiungere altre azioni qui se necessario
  },
});

// Esporta le azioni del tuo slice
export const { addEvent } = eventsSlice.actions;

// Esporta il tuo reducer
export default eventsSlice.reducer;
