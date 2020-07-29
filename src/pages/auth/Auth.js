import React, { useEffect, useContext } from 'react';
import queryString from 'query-string';
import CookieContext from '../../context/cookie-context';
// import Cookies from 'universal-cookie';

// const cookies = new Cookies();

const Auth = ({ location }) => {
  const { cookies } = useContext(CookieContext);
  const query = queryString.parse(location.search);

  useEffect(() => {
    const setAuth = async () => {
      console.log(Object.keys(query).length === 0);
      if (Object.keys(query).length !== 0) {
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
      }
    };

    setAuth();
  }, [location, query, cookies]);

  return <div>Hello {cookies.get('token')}</div>;
};

export default Auth;
