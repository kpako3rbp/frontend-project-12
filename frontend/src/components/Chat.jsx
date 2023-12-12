import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

const Chat = () => {
  const { t } = useTranslation();

  const currentChannel = useSelector((state) => {
    const { currentChannelId } = state.channelsInfo;
    const currentChannel = state.channelsInfo.channels.find(({id}) => id === currentChannelId);
    console.log(currentChannel, 'currentChannel')
    return currentChannel;
  });

  const messages = useSelector((state) => {
    return state.messagesInfo.messages.filter(({ channelId }) => channelId === state.channelsInfo.currentChannelId);
  });

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># {currentChannel.name}</b>
          </p>
          <span className="text-muted">{t('chat.counter.count', { count: messages.length })}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messages.map(({ body, username, id }) => (
            <div key={id} className="text-break mb-2">
              <b>{username}</b>: {body}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <form className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <input name="body" aria-label="Новое сообщение" placeholder={t('placeholders.message')} className="border-0 p-0 ps-2 form-control" />
              <button type="submit" className="btn btn-group-vertical" disabled="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
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





       
       
