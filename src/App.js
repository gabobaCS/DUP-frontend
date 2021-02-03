import React, { Component, useEffect, useState } from 'react';
import './App.css';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home  from './routes/Home.js';
import AnimalInfo from './routes/AnimalInfo.js';
import NoEncontrado from './routes/NoEncontrado.js';
import Publicar from './routes/Publicar.js';
import PublicarEncontrado from './routes/PublicarEncontrado.js';
import PublicarPerdido from './routes/PublicarPerdido.js';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3BD7FF',
    },
    secondary: {
      main: '#ff0000',
    },
  },
});

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://dupbackend.herokuapp.com/animales', {method: 'GET'})
    .then(res => res.json())
    .then((data) => {
      setData(data);
    })

  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Route exact path="/"> 
            <Home data={data}/>
          </Route>
          <Route exact path="/animales/:id">
            <AnimalInfo />
          </Route>
          <Route exact path="/publicar">
            <Publicar />
          </Route>
          <Route exact path="/publicar/encontrado">
            <PublicarEncontrado />
          </Route>
          <Route exact path="/publicar/perdido">
            <PublicarPerdido />
          </Route>
          <Route path="*">
            <NoEncontrado />
          </Route>
        </Switch>
      </ThemeProvider>
    </React.Fragment>

  );
}

export default App;
