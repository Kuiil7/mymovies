import './App.css';
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';
import Movies from './Movies';
import TvShows from './TvShows';
import People from './People';
import Trending from './Trending'
import Hero from './Hero';
import Overview from './Overview';
import {  Link } from 'react-router-dom';
import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Summary from './Summary';

function App() {

  const [data, setData] = useState({ results: [] });

  const [isError, setIsError] = useState(false);

  const [query, setQuery] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const baseImageURL = 'https://image.tmdb.org/t/p/original/'

  const baseMovieUrl = 'https://api.themoviedb.org/3/search/movie?'

  const baseTrendingUrl = 'https://api.themoviedb.org/3/trending/movie/day?'

  const [url, setUrl] = useState(
  `${baseTrendingUrl}api_key=${process.env.REACT_APP_API_KEY}`
  );



  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
     const result = await axios(url);
      setData(result.data);
      setIsLoading(false);
      console.log(result.data)
    };

    fetchData();

  }, [url]);



  const taskList = data.results.map(result => (
    <Overview
      id={result.id}
     overview={result.overview}
      title={result.title}
      key={result.id}

    />
  ));


  return (
    <div >
         <BrowserRouter>


<Hero />





        <Switch>


          <Route  exact path="/movies">
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

          <Route  path="/summary">
            <Summary />
          </Route>



        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;