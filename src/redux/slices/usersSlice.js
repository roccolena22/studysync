import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers: (state, action) => action.payload,
    addUser: (state, action) => {
      const existingUser = state.find((user) => user.id === action.payload.id);
      if (!existingUser) {
        return [...state, action.payload];
      }
      return state;
    },
    deleteUser: (state, action) =>
      produce(state, (draftState) => {
        const index = draftState.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          draftState.splice(index, 1);
        }
      }),
  },
});

export const { setUsers, addUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
