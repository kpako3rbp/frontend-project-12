import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Layout from '../components/Layout.jsx';
import loginImg from '../assets/avatar.jpg';
import routes from '../routes.js';
import cn from 'classnames';

const ChatPage = () => {
  return (<div>Тут будет чат</div>);
};

export default ChatPage;
