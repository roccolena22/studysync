import { createSlice } from '@reduxjs/toolkit';

// Definisci le azioni del tuo slice
const eventsSlice = createSlice({
  name: 'events',
  initialState: [],
  reducers: {
    setEvent: (state, action) => {
      return action.payload;
    },
    // Puoi aggiungere altre azioni qui se necessario
  },
});

// Esporta le azioni del tuo slice
export const { setEvent } = eventsSlice.actions;

// Esporta il tuo reducer
export default eventsSlice.reducer;
