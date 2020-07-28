import React, { Component } from 'react';
import './App.css';
import MainNavigation from './navigation/MainNavigation';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import Buy from './pages/buy/Buy.js';
import Add from './pages/add/Add.js';
import Auth from './pages/auth/Auth';
import AuthContext from './auth/AuthContext';

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      userId: null,
    };
  }

  login = (token, userId, tokenExpiration) => {
    this.setState({ token, userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout,
            }}
          >
            <MainNavigation />
            <div className="App">
              {/* <Redirect from="/" to="/rent" /> */}
              <Switch>
                <Route path="/rent" component={Buy} />
                <Route path="/add" component={Add} />
                <Route path="/auth" component={Auth} />
              </Switch>
              {/* <Buy /> */}
            </div>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
