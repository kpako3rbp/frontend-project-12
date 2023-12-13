import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagersReducer from './messagesSlice.js';

export default configureStore({
  reducer: {
    channelsInfo: channelsReducer,
    messagesInfo: messagersReducer,
  },
});
