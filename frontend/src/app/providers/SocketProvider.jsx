import React from 'react';
import { useDispatch } from 'react-redux';
import SocketContext from '../../contexts/socketContext';
import socket from '../../socket';
import { actions as messagesActions } from '../../slices/messagesSlice';
import { actions as channelsActions } from '../../slices/channelsSlice';

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  socket.on('newMessage', (message) => {
    dispatch(messagesActions.addMessage(message));
  });

  socket.on('newChannel', (channel) => {
    dispatch(channelsActions.addChannel(channel));
    dispatch(channelsActions.setCurrentChannel(channel.id));
  });

  socket.on('renameChannel', ({ id, name }) => {
    dispatch(channelsActions.renameChannel({ id, name }));
  });

  socket.on('removeChannel', ({ id }) => {
    dispatch(channelsActions.removeChannel({ id }));
  });

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
