import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import socket from '../socket.js';

const Chat = ({ username }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputRef = useRef();
  const messagesBoxRef = useRef();
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const getChannelData = (state) => {
    const { currentChannelId } = state.channelsInfo;
    const currentChannel = state.channelsInfo.channels.find(({ id }) => id === currentChannelId);
    const messages = state.messagesInfo.messages.filter(
      ({ channelId }) => channelId === currentChannelId
    );

    return { currentChannel, messages };
  };

  const getChannelDataSelector = createSelector([getChannelData], (channelData) => channelData);
  const { currentChannel, messages } = useSelector(getChannelDataSelector);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = inputRef.current.value;

    socket.emit('newMessage', { body, channelId: currentChannel.id, username }, (response) => {
      if (response.status === 'ok') {
        e.target.reset();
        setSubmitDisabled(true);
      } else {
        setSubmitDisabled(false);
        console.error('Something went wrong');
      }
    });
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(messagesActions.addMessage(payload));
    });
  }, []);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># {currentChannel.name}</b>
          </p>
          <span className="text-muted">{t('chat.counter.count', { count: messages.length })}</span>
        </div>
        <div ref={messagesBoxRef} id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messages.map(({ body, username, id }) => (
            <div key={`message-${id}`} className="text-break mb-2">
              <b>{username}</b>: {body}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <form onSubmit={handleSubmit} className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <input
                ref={inputRef}
                onChange={(e) => setSubmitDisabled(!e.target.value)}
                name="body"
                aria-label="Новое сообщение"
                placeholder={t('placeholders.message')}
                className="border-0 p-0 ps-2 form-control"
              />
              <button type="submit" className="btn btn-group-vertical" disabled={submitDisabled}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                  ></path>
                </svg>
                <span className="visually-hidden">{t('buttons.send')}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
