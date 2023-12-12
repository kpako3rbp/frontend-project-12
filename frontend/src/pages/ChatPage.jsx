import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { selectors } from '../slices/channelsSlice.js';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import routes from '../routes.js';
import cn from 'classnames';

import Nav from '../components/Nav.jsx';
import Chat from '../components/Chat.jsx';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const ChatPage = () => {
  const dispatch = useDispatch();
  const [isDataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(routes.channelsPath(), { headers: getAuthHeader() });
        const { channels, currentChannelId, messages } = data;

        dispatch(channelsActions.setChannels({ channels, currentChannelId }));
        dispatch(messagesActions.setMessages({ messages }));

        setDataLoaded(true);
      } catch (err) {
        console.error('Error while fetching channels data', err);
      }
    };

    fetchContent();
  }, [dispatch]);

  return <div className="row h-100 bg-white flex-md-row">
    {isDataLoaded && <Nav />}
    {isDataLoaded && <Chat />}
  </div>;
};

export default ChatPage;
