import './App.css';
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';
import Movies from './Movies';
import TVShows from './TVShows';
import People from './People';
import Trending from './Trending'
import Hero from './Hero';
import Overview from './Overview';
import {  Link } from 'react-router-dom';
import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Summary from './Summary';
import { result } from 'lodash';

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





  return (
    <div >
         <BrowserRouter>


<Hero />





        <Switch>

        <Route  exact path="/">
            <Movies />
          </Route>
          <Route  exact path="/movies">
            <Movies />
          </Route>
          <Route  path="/tvshows">
            <TVShows />
          </Route>
          <Route  path="/people">
            <People/>
          </Route>
          <Route  path="/trending">
            <Trending/>
          </Route>

{

data.results.map(result => (


    <Route  exact path="/overview">

    <Overview
      id={result.id}
     overview={result.overview}
      title={result.title}
      key={result.id}
      vote_average={result.vote_average}
      original_language={result.original_language.toUpperCase()}
      popularity={result.popularity}
      release_date={result.release_date}
      baseImageURL={baseImageURL}
      poster_path={result.poster_path}
      backdrop_path={result.backdrop_path}

    />

</Route>
  ))}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;