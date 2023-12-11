import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="h-100">
      <div className="h-100">
        <div className="d-flex flex-column h-100">
          <Header />
          <div className="container-fluid h-100">{children}</div> 
        </div>
      </div>
    </div>
  );
};

export default Layout;
