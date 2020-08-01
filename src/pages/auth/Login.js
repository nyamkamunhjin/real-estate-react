import React, { useRef, useState } from 'react';
import './Login.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

/**
 * @author
 * @function Login
 **/

const Login = ({}) => {
  const [redirectUrl, setRedirectUrl] = useState('');

  const usernameElRef = useRef('');
  const passwordElRef = useRef('');
  const GOOGLE_SIGNIN_URL = `${
    process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_LOCAL_URL
  }/auth/google`;
  const login_url = `${
    process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_LOCAL_URL
  }/auth/login`;
  const handeLogin = (e) => {
    e.preventDefault();

    axios
      .post(login_url, {
        username: usernameElRef.current.value,
        password: passwordElRef.current.value,
      })
      .then((res) => {
        // history.push(res.url)
        const { url } = res.data;
        // console.log(url);
        setRedirectUrl(url);
        console.log(redirectUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      {redirectUrl !== '' && <Redirect to={redirectUrl} />}
      <div className="login-form">
        <form onSubmit={handeLogin}>
          <h1>Login</h1>
          <br />
          <div className="form-control">
            <label htmlFor="priceRent">Username: </label>
            <input ref={usernameElRef} type="text" id="username" required />
          </div>
          <div className="form-control">
            <label htmlFor="imgLink">Password: </label>
            <input ref={passwordElRef} type="password" id="password" required />
          </div>
          <div className="form-handler">
            <button className="btn" type="submit" value="Login">
              Login
            </button>
            <button className="btn" onClick={null} formNoValidate>
              Register
            </button>
            <button className="btn" formNoValidate>
              <a href={GOOGLE_SIGNIN_URL}>Sign in with Google</a>
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
