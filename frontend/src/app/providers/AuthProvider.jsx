import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [loggedIn, setlLoggedIn] = useState((user && user.token) || false);
  const navigate = useNavigate();

  const authProviderValue = useMemo(() => ({
    user,
    loggedIn,
    logIn: (data) => {
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/');
      setlLoggedIn(true);
    },
    logOut: () => {
      setUser(null);
      localStorage.removeItem('user');
      setlLoggedIn(false);
    },
  }), [user, loggedIn, navigate]);

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
