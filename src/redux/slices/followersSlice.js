import { createSlice } from "@reduxjs/toolkit";

const followersSlice = createSlice({
  name: "followers",
  initialState: [],
  reducers: {
    setFollowers: (state, action) => {
      return action.payload;
    },
    addFollower: (state, action) => {
      state.push(action.payload);
    },
    deleteFollower: (state, action) => {
      const index = state.findIndex(
        (follower) => follower.id === action.payload.id
      );
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { setFollowers, addFollower, deleteFollower } =
  followersSlice.actions;
export default followersSlice.reducer;
