import React, { useState } from 'react';
import './assets/application.scss';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import Layout from './components/Layout.jsx';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage.jsx';
import NotFoundPage from './pages/NotFoundPage';
import ChatPage from './pages/ChatPage';
import AuthContext from './contexts/index.jsx';
import useAuth from './hooks/index.jsx';

import store from './slices/index.js';

const rollbarConfig = {
  accessToken: '46e844f507f84a488eec74555e632cb2',
  environment: 'testenv',
};

const AuthProvider = ({ children }) => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  const [loggedIn, setLoggedIn] = useState(!!userId);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>{children}</AuthContext.Provider>
  );
};

const ChatRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />;
};

const App = () => {
  return (
    <RollbarProvider config={rollbarConfig}>
      <Provider store={store}>
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
                <Route path="signup" element={<SignupPage />} />
              </Routes>
            </Layout>
            <ToastContainer />
          </Router>
        </AuthProvider>
      </Provider>
      <ErrorBoundary />
    </RollbarProvider>
  );
};

export default App;
