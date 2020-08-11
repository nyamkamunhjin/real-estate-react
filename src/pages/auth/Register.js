import React, { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';

import axios from 'axios';

const Register = ({ location }) => {
  const [redirectUrl, setRedirectUrl] = useState('');
  const [user, setUser] = useState(null);

  const usernameElRef = useRef('');
  const emailElRef = useRef('');
  const passwordElRef = useRef('');
  const confirmPasswordElRef = useRef('');
  const firstNameElRef = useRef('');
  const lastNameElRef = useRef('');
  const picUrlElRef = useRef('');

  const query = queryString.parse(location.search);
  useEffect(() => {
    if (Object.keys(query).length !== 0 && user === null) {
      setUser(query);
    }
  }, [query]);

  const GOOGLE_SIGNIN_URL = `${
    process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_LOCAL_URL
  }/auth/google`;
  const login_url = `${
    process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_LOCAL_URL
  }/auth/login`;

  const register_url = `${
    process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_LOCAL_URL
  }/auth/register`;

  const handleRegister = (e) => {
    e.preventDefault();

    axios
      .post(register_url, {
        username: usernameElRef.current.value,
        password: passwordElRef.current.value,
        email: emailElRef.current.value,
        lastName: lastNameElRef.current.value,
        firstName: firstNameElRef.current.value,
        picUrl: picUrlElRef.current.value,
      })
      .then((res) => {
        // history.push(res.url)
        const { url } = res.data;
        // console.log(url);
        setRedirectUrl(url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      {redirectUrl !== '' && <Redirect to={redirectUrl} />}

      <div className="login-form">
        <form onSubmit={handleRegister}>
          <h1>Register</h1>
          <br />
          <div className="form-control">
            <label htmlFor="username">Username: </label>
            <input
              ref={usernameElRef}
              type="text"
              id="username"
              onChange={(event) => setUser({...user, username: event.target.value})}
              value={user ? user.username : ''}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email: </label>
              
            <input ref={emailElRef} type="text" id="email" onChange={(event) => setUser({...user, email: event.target.value})} value={user ? user.email : ''} required />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password: </label>
            <input ref={passwordElRef} type="password" id="password" required />
          </div>
          <div className="form-control">
            <label htmlFor="confirmPassword">Confirm password: </label>
            <input
              ref={confirmPasswordElRef}
              type="password"
              id="confirmPassword"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="firstname">First Name: </label>
            <input ref={firstNameElRef} type="text" id="firstname" value={user ? user.firstName : ''} onChange={(event) => setUser({...user, firstName: event.target.value})} required />
          </div>
          <div className="form-control">
            <label htmlFor="lastname">Last Name: </label>
            <input ref={lastNameElRef} type="text" id="lastname" value={user ? user.lastName : ''} onChange={(event) => setUser({...user, lastName: event.target.value})} required />
          </div>
          <div className="form-control">
            <label htmlFor="picUrl">Picture url (optional): </label>
            <input ref={picUrlElRef} type="text" id="picUrl" value={user ? user.picURL : ''} onChange={(event) => setUser({...user, picURL: event.target.value})}/>
          </div>
          <div className="form-handler">
            <button className="btn" type="submit" value="Login">
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

export default Register;
