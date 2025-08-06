import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definisci il tipo per un follower (puoi adattarlo alle tue necessità)
export interface Follower {
  id: string;
  name: string;
  email?: string;
  // Aggiungi altri campi se necessario
}

const followersSlice = createSlice({
  name: "followers",
  initialState: [] as Follower[],
  reducers: {
    setFollowers: (state, action: PayloadAction<Follower[]>) => {
      return action.payload;
    },
  },
});

export const { setFollowers } = followersSlice.actions;
export default followersSlice.reducer;
