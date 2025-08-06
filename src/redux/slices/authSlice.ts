import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definisci il tipo utente (puoi estenderlo con le proprietà reali)
export interface User {
  id: string;
  name: string;
  email: string;
  // Aggiungi altri campi se necessari
}

// Stato del reducer
export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setLoggedUser, logout } = authSlice.actions;
export default authSlice.reducer;
