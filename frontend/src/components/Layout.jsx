import React from 'react';
import cn from 'classnames';
import Header from './Header';
import useAuth from '../hooks/useAuth';

const Layout = ({ children }) => {
  const { loggedIn } = useAuth();

  const containerClassName = cn({
    'container-fluid': !loggedIn,
    'h-100': true,
    'container my-4 overflow-hidden rounded shadow': loggedIn,
  });

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className={containerClassName}>{children}</div>
    </div>
  );
};

export default Layout;
