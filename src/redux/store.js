// store.js
import { configureStore } from '@reduxjs/toolkit';
import uploadReducer from './image-upload';  // Adjust the import according to your file structure

export const store = configureStore({
  reducer: {
    upload: uploadReducer,
  },
});

export default store;
