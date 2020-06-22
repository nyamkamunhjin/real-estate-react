import React from 'react';
import './App.css';
import MainNavigation from './Navigation/MainNavigation';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainNavigation />
      </BrowserRouter>
    </div>
  );
}

export default App;
