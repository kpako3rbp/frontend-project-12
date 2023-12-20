import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import NotFoundPage from './404';
import LoginPage from './login';
import SignupPage from './signup';
import useAuth from '../hooks/useAuth';
import ChatPage from './chat';

const ChatRoute = () => {
  const { loggedIn } = useAuth();
  const location = useLocation();

  return loggedIn ? <ChatPage /> : <Navigate to="/login" state={{ from: location }} />;
};

const Routing = () => (
  <Routes>
    <Route path="*" element={<NotFoundPage />} />
    <Route path="/" element={<ChatRoute />} />
    <Route path="login" element={<LoginPage />} />
    <Route path="signup" element={<SignupPage />} />
  </Routes>
);

export default Routing;
