import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Movies from './Movies';
import TvShows from './TvShows';
import People from './People';

import Hero from './Hero';

function App() {
  return (
    <div className="wrapper">
         <BrowserRouter>

       <Hero />



        <Switch>
          <Route exact path="/">
            <Movies />
          </Route>
          <Route  path="/movies">
            <Movies />
          </Route>
          <Route  path="/tvshows">
            <TvShows />
          </Route>
          <Route  path="/people">
            <People/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;