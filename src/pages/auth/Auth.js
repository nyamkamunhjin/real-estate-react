import React, { useEffect, useContext } from 'react';
import queryString from 'query-string';
import AuthContext from '../../auth/AuthContext';
import Cookies from 'universal-cookie';

const Dashboard = ({ location }) => {
  const authContext = useContext(AuthContext);
  const cookies = new Cookies();
  const query = queryString.parse(location.search);
  useEffect(() => {
    const setAuth = async () => {
      // console.log(authContext);
      if (query) {
        // authContext.login(query.token, query.userId);
        cookies.set('token', query.token, {
          path: '/',
          expires: new Date(query.expires)
        });
      }
    };

    setAuth();
  }, [authContext, location, cookies, query]);

  return <div>Hello {cookies.get('token')}</div>;
};

export default Dashboard;
