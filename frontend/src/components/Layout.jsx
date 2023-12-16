import React from 'react';
import cn from 'classnames';
import Header from './Header';
import useAuth from '../hooks';

const Layout = ({ children }) => {
  const auth = useAuth();

  const containerClassName = cn({
    'container-fluid': !auth.loggedIn,
    'h-100': true,
    'container my-4 overflow-hidden rounded shadow': auth.loggedIn,
  });

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className={containerClassName}>{children}</div>
    </div>
  );
};

export default Layout;
