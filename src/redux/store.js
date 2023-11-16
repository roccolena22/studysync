// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Altri reducer possono essere inclusi qui se necessario
  },
});

export default store;
