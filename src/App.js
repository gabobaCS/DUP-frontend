import React, { Component } from 'react';
import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";
import Home  from './routes/Home.js';
import CssBaseline from '@material-ui/core/CssBaseline';


function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Route path="/"> 
        <Home/>
      </Route>
    </React.Fragment>

  );
}

export default App;
