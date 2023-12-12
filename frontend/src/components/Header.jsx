import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAuth from '../hooks';

const Header = () => {
  const auth = useAuth();

  return (
    <>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Hexlet Chat
          </Link>
          {auth.loggedIn ? (
            <button onClick={auth.logOut} type="button" className="btn btn-primary">
              Выйти
            </button>
          ) : null}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Header;
