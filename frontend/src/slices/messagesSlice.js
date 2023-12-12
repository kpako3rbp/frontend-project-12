import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages: (state, { payload }) => {
      state.messages = payload.messages;
    },
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;           
