// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
//import and add reducers below
//import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    //counter: counterReducer,
  },
});
