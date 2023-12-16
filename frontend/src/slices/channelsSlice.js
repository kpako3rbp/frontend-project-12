/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    setChannels: (state, { payload }) => {
      const { channels, currentChannelId } = payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
    },
    renameChannel: (state, { payload }) => {
      const channel = state.channels.find((i) => i.id === payload.id);
      channel.name = payload.name;
    },
    removeChannel: (state, { payload }) => {
      const { currentChannelId } = state;
      state.channels = state.channels.filter((i) => i.id !== payload.id);
      if (currentChannelId === payload.id) {
        state.currentChannelId = state.channels[0].id;
      }
    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
