import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const { loggedIn, logOut } = useAuth();
  const { t } = useTranslation();

  return (
    <>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Hexlet Chat
          </Link>
          {loggedIn ? (
            <button onClick={logOut} type="button" className="btn btn-primary">
              {t('buttons.logout')}
            </button>
          ) : null}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Header;
