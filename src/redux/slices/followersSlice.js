import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

const followersSlice = createSlice({
  name: "followers",
  initialState: [],
  reducers: {
    setFollowers: (state, action) => action.payload,
    addFollower: (state, action) => {
      const existingFollower = state.find((follower) => follower.id === action.payload.id);
      if (!existingFollower) {
        return [...state, action.payload];
      }
      return state;
    },
    deleteFollower: (state, action) =>
      produce(state, (draftState) => {
        const index = draftState.findIndex((follower) => follower.id === action.payload.id);
        if (index !== -1) {
          draftState.splice(index, 1);
        }
      }),
  },
});

export const { setFollowers, addFollower, deleteFollower } = followersSlice.actions;
export default followersSlice.reducer;
