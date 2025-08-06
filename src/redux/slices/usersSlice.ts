import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definizione del tipo User. Puoi personalizzarlo in base alla struttura del tuo utente.
export interface User {
  id: string;
  name: string;
  email: string;
  // Aggiungi altri campi se necessario
}

const usersSlice = createSlice({
  name: "users",
  initialState: [] as User[],
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      return action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.push(action.payload);
    },
  },
});

export const { setUsers, addUser } = usersSlice.actions;
export default usersSlice.reducer;
