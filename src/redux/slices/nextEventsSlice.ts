import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definisci il tipo Event in base alla tua struttura dati
export interface Event {
  id: string;
  title: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  authorId: string;
  bookingsRecordId?: string[];
  // Aggiungi altri campi se necessario
}

const nextEventsSlice = createSlice({
  name: "nextEvents",
  initialState: [] as Event[],
  reducers: {
    setNextEvents: (state, action: PayloadAction<Event[]>) => action.payload,
  },
});

export const { setNextEvents } = nextEventsSlice.actions;

export default nextEventsSlice.reducer;
