import React from "react";
import "./App.css";
import MainNavigation from "./navigation/MainNavigation";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import Buy from "./pages/buy/Buy.js";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <MainNavigation />
        <div className="App">
          <Redirect from="/" to="/buy" />
          <Switch>
            <Route path="/buy" component={Buy} />
            <Route path="/rent" />
          </Switch>
          {/* <Buy /> */}
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
