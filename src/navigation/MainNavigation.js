import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './MainNavigation.css';

class MainNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <header>
        <nav className='main-nav'>
          <ul>
            <li><NavLink to='/rent'>Rent</NavLink></li>
            <li><NavLink to='/add'>Add</NavLink></li>
          </ul>
        </nav>
      </header>

    );
  }
}

export default MainNavigation;