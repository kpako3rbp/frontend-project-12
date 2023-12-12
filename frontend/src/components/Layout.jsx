import React from 'react';
import Header from './Header';
import useAuth from '../hooks';
import cn from 'classnames';

const Layout = ({ children }) => {
  const auth = useAuth();
  
  const containerClassName = cn({
    'container-fluid h-100': true,
    'my-4 overflow-hidden rounded shadow': auth.loggedIn,
  })

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className={containerClassName}>{children}</div>
    </div>
  );
};

export default Layout;
