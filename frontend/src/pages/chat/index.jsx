import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { actions as channelsActions } from '../../slices/channelsSlice.js';
import { actions as messagesActions } from '../../slices/messagesSlice.js';
import routes from '../../routes.js';

import Nav from '../../components/Nav.jsx';
import Chat from '../../components/Chat.jsx';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }

  return {};
};

const ChatPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isDataLoaded, setDataLoaded] = useState(false);
  const { username } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(routes.channelsPath(), { headers: getAuthHeader() });
        const { channels, currentChannelId, messages } = data;

        dispatch(channelsActions.setChannels({ channels, currentChannelId }));
        dispatch(messagesActions.setMessages({ messages }));

        setDataLoaded(true);
      } catch (err) {
        toast.error(t('notifications.fetchFail'));
      }
    };

    fetchContent();
  });

  return (
    <div className="row h-100 bg-white flex-md-row">
      {isDataLoaded && <Nav />}
      {isDataLoaded && <Chat username={username} />}
    </div>
  );
};

export default ChatPage;
