import React from 'react';
import './App.css';
import MainNavigation from './navigation/MainNavigation';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import Buy from './pages/buy/Buy.js';
import Add from './pages/add/Add.js';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <MainNavigation />
        <div className="App">
          <Redirect from="/" to="/add" />
          <Switch>
            <Route path="/rent" component={Buy}/>
            <Route path="/add" component={Add} />
          </Switch>
          {/* <Buy /> */}
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
