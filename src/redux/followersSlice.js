import { createSlice } from '@reduxjs/toolkit';

const followersSlice = createSlice({
  name: 'followers',
  initialState: [],
  reducers: {
    setFollowers: (state, action) => {
      return action.payload;
    },
    addFollower: (state, action) => {
      state.push(action.payload);
    },
    removeFollower: (state, action) => {
      const index = state.findIndex((follower) => follower.idTo === action.payload.idTo);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { setFollowers, addFollower, removeFollower } = followersSlice.actions;
export default followersSlice.reducer;
