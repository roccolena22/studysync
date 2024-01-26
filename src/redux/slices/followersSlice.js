import { createSlice } from "@reduxjs/toolkit";

const followersSlice = createSlice({
  name: "followers",
  initialState: [],
  reducers: {
    setFollowers: (state, action) => {
      return action.payload;
    },
  },
});

export const { setFollowers } =
  followersSlice.actions;
export default followersSlice.reducer;
