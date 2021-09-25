import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Movies from './Movies';
import TvShows from './TvShows';
import People from './People';
import Trending from './Trending'
import Hero from './Hero';
import Overview from './Overview';

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
          <Route  path="/trending">
            <Trending/>
          </Route>

         <Route  path="/overview">
            <Overview/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;