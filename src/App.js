import React, { Component } from 'react';
import './App.css';
import MainNavigation from './navigation/MainNavigation';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import Buy from './pages/buy/Buy.js';
import Add from './pages/add/Add.js';
import Auth from './pages/auth/Auth';
import CookieContext from './context/cookie-context';

import Cookies from 'universal-cookie';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
    };
  }

  logIn = () => {
    this.setState({ loggedIn: true });
  };

  logOut = (cookies) => {
    this.setState({ loggedIn: false });
    cookies.remove('token');
    cookies.remove('userId');
  };
  render() {
    const cookies = new Cookies();
    return (
      <BrowserRouter>
        <CookieContext.Provider
          value={{
            cookies,
            logIn: this.logIn,
            logOut: this.logOut,
          }}
        >
          <MainNavigation loggedIn={this.state.loggedIn} />
          <div className="App">
            {this.state.loggedIn ? (
              <Redirect from="/" to="/rent" exact />
            ) : (
              <Redirect from="/" to="/auth" exact />
            )}
            <Switch>
              <Route path="/rent" component={Buy} />
              <Route path="/add" component={Add} />
              <Route path="/auth" component={Auth} />
            </Switch>
          </div>
        </CookieContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
