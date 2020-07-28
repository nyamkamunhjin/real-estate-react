import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './MainNavigation.css';

class MainNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogin() {
    
  }

  render() {
    return (
      <header>
        <nav className="main-nav">
          <ul>
            <li>
              <NavLink to="/rent">Rent</NavLink>
            </li>
            <li>
              <NavLink to="/add">Add</NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <a href={`${process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_LOCAL_URL}/auth/google`}>Sign in g+</a>
           </li>
            <li>
              <a href="">Log Out</a>
           </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default MainNavigation;
