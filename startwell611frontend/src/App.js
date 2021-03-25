import React from 'react'
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Homepage  from '../src/Pages/Login/Login'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
      <header className="App-header">
      <Route 
        exact 
        path = {"/Login"} 
        render = {props =>(
         <Homepage />
        )}
        />
      </header>
      </Router>
    </div>
  );
}

export default App;
