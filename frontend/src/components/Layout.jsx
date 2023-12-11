import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="container-fluid h-100">{children}</div>
    </div>
  );
};

export default Layout;
