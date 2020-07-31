import React, { Component, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './MainNavigation.css';
import cookieContext from '../context/cookie-context';

const MainNavigation = ({ loggedIn }) => {
  const { cookies, logOut } = useContext(cookieContext);
  const GOOGLE_SIGNIN_URL = `${
    process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_LOCAL_URL
  }/auth/google`;
  

  return (
    <header>
      <nav className="main-nav">
        <ul>
          <li>
            <NavLink to="/rent">Rent</NavLink>
          </li>
          <li>
            {loggedIn && <NavLink to="/add">Add</NavLink>}
          </li>
        </ul>
        <ul>
          {!loggedIn ? (
            <li>
              <a href={GOOGLE_SIGNIN_URL}>Sign in g+</a>
            </li>
          ) : (
            <li>
              <button
                onClick={() => {
                  logOut(cookies);
                }}
              >
                Log out
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
