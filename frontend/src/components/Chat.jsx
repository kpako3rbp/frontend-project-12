import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import useSocket from '../hooks/useSocket';

const Chat = ({ username }) => {
  const { t } = useTranslation();
  const socket = useSocket();
  const inputRef = useRef();
  const messagesBoxRef = useRef();
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const getChannelData = (state) => {
    const { currentChannelId } = state.channelsInfo;
    const currentChannel = state.channelsInfo.channels.find(({ id }) => id === currentChannelId);
    const messages = state.messagesInfo.messages.filter(
      ({ channelId }) => channelId === currentChannelId,
    );

    return { currentChannel, messages };
  };

  const getChannelDataSelector = createSelector([getChannelData], (channelData) => channelData);
  const { currentChannel, messages } = useSelector(getChannelDataSelector);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: ({ body }, { resetForm }) => {
      // Отправляем сообщение на сервер, используя сокет
      socket.emit('newMessage', { body, channelId: currentChannel.id, username }, (response) => {
        if (response.status === 'ok') {
          setSubmitDisabled(true);
          resetForm();
        } else {
          setSubmitDisabled(false);
          toast.error(t('notifications.messageAddFail'));
        }
      });
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    setSubmitDisabled(!formik.values.body);
  }, [formik.values.body]);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              &nbsp;
              {currentChannel.name}
            </b>
          </p>
          <span className="text-muted">{t('chat.counter.count', { count: messages.length })}</span>
        </div>
        <div ref={messagesBoxRef} id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messages.map(({ body, username: login, id }) => (
            <div key={`message-${id}`} className="text-break mb-2">
              <b>{login}</b>
              :
              &nbsp;
              {filter.clean(body)}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
            <FormGroup className="input-group has-validation">
              <FormControl
                ref={inputRef}
                onChange={formik.handleChange}
                value={formik.values.body}
                name="body"
                aria-label={t('placeholders.newMessage')}
                placeholder={t('placeholders.message')}
                className="border-0 p-0 ps-2 form-control"
              />
              <Button
                type="submit"
                variant=""
                className="btn-group-vertical"
                disabled={submitDisabled}
              >
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
                  />
                </svg>
                <span className="visually-hidden">{t('buttons.send')}</span>
              </Button>
            </FormGroup>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
