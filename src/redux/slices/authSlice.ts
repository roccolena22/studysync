import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../user/models";

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
