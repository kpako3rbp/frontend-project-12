import React, { useState } from 'react';
import './assets/application.scss';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation, Outlet } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ChatPage from './pages/ChatPage';
import AuthContext from './contexts/index.jsx';
import useAuth from './hooks/index.jsx';
import cn from 'classnames';

import Layout from './components/Layout.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>{children}</AuthContext.Provider>;
};

const ChatRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />;
};

const App = () => {
  const auth = useAuth();

  const containerClassName = cn({
    'container-fluid h-100': true,
    'my-4 overflow-hidden rounded shadow': auth.loggedIn,
  });

  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route
              path="/"
              element={
                <ChatRoute>
                  <ChatPage />
                </ChatRoute>
              }
            />
            <Route path="login" element={<LoginPage />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
