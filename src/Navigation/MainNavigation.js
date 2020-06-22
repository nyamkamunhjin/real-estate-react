import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './MainNavigation.css'

class MainNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className='main-nav'>
        {/* <h1>Hello!</h1> */}
        <ul>
          <li><NavLink to=''>buy</NavLink></li>
        
          <li><NavLink to=''>rent</NavLink></li>

        </ul>
        

      </div>
    );
  }
}

export default MainNavigation;