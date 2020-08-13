import React, { Component } from 'react';
import './App.css';
import MainNavigation from './navigation/MainNavigation';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import Rent from './pages/rent/Rent';
import Add from './pages/add/Add.js';
import Auth from './pages/auth/Auth';
import Register from './pages/auth/Register';

import CookieContext from './context/cookie-context';

import Cookies from 'universal-cookie';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      cookies: new Cookies(),
    };
  }

  logIn = () => {
    this.setState({ loggedIn: true });
  };

  logOut = (cookies) => {
    this.setState({ loggedIn: false });
    cookies.remove('token');
    // cookies.remove('userId');
  };

  componentDidMount() {
    const token = this.state.cookies.get('token');
    if (token) this.setState({ loggedIn: true });
  }

  render() {
    return (
      <BrowserRouter>
        <CookieContext.Provider
          value={{
            cookies: this.state.cookies,
            logIn: this.logIn,
            logOut: this.logOut,
          }}
        >
          <MainNavigation loggedIn={this.state.loggedIn} />
          <div className="App">
            {this.state.loggedIn && <Redirect to="/rent" />}
            {/* {!this.state.loggedIn && <Redirect to="/auth" />} */}

            {/* <Redirect from="/" to="/register" exact /> */}
            <Switch>
              <Route path="/rent" component={Rent} />
              <Route path="/add" component={Add} />
              <Route path="/auth" component={Auth} />
              <Route path="/register" component={Register} />
            </Switch>
          </div>
        </CookieContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
