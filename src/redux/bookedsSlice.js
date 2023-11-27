import { createSlice } from '@reduxjs/toolkit';

const bookedsSlice = createSlice({
  name: 'bookeds',
  initialState: [],
  reducers: {
    setBookeds: (state, action) => {
      return action.payload;
    },
  },
});

export const { setBookeds, addUser } = bookedsSlice.actions;
export default bookedsSlice.reducer;
