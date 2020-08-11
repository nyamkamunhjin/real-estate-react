import React, { useEffect, useContext } from 'react';
import queryString from 'query-string';
import CookieContext from '../../context/cookie-context';
import Login from './Login';
// import Cookies from 'universal-cookie';

// const cookies = new Cookies();

const Auth = ({ location }) => {
  const { cookies, logIn } = useContext(CookieContext);
  const query = queryString.parse(location.search);

  useEffect(() => {
    const setAuth = async () => {
      // console.log('cookie check: ', cookies.get('token'));
      // console.log(Object.keys(query).length === 0);

      // set token cookie
      cookies.set('token', query.token, {
        path: '/',
        expires: new Date(query.expires),
      });

      // set userId cookie
      cookies.set('userId', query.userId, {
        path: '/',
        expires: new Date(query.expires),
      });
      logIn();
    };

    if (Object.keys(query).length !== 0) {
      setAuth();
    }
    
  }, [location, query, cookies, logIn]);

  return (
    <div>
      <Login />
    </div>
  );
};

export default Auth;
