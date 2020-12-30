import React, { Component, useEffect, useState } from 'react';
import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";
import Home  from './routes/Home.js';
import CssBaseline from '@material-ui/core/CssBaseline';


function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://dupbackend.herokuapp.com/animales', {method: 'GET'})
    .then(res => res.json())
    .then((data) => {
      setData(data);
    })

  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Route path="/"> 
        <Home data={data}/>
      </Route>
    </React.Fragment>

  );
}

export default App;
