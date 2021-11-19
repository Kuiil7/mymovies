import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';

import People from './People'
//import ProgCircle from '../ProgCircle'
import {  Link } from 'react-router-dom';
import Overview from '../movieapis/Overview'

require('dotenv').config()

function Movies() {

  const [data, setData] = useState({ results: [] });
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const baseImageURL = 'https://image.tmdb.org/t/p/original/'
  const baseSearchURL = 'https://api.themoviedb.org/3/search/movie?'
  const baseMovieURL = `https://api.themoviedb.org/3/movie/popular?`
  const [url, setUrl] = useState(`${baseMovieURL}api_key=${process.env.REACT_APP_MOVIE_API_KEY}`);

  const [visible, setVisible] = useState(false);


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

  <>
<form onSubmit={event => {
        setUrl(`${baseSearchURL}api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${query}}`);
        event.preventDefault();
      }}>
  <div className="column is-6  is-half is-offset-one-quarter">
  <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
          className="input is-primary mb-2 is-rounded"
          placeholder="enter a movie name"
        />
   <button className="button is-small is-rounded is-primary" type="submit">Search</button>
  </div>

 </form>

{isError && <div>Something went wrong ...</div>}
{isLoading ? (<div>Loading Most Popular Movies...</div>) : (

<div className="container scrolling-wrapper pb-4 pl-4 ">
<div className="columns p-2 is-mobile  ">
{data.results  && data.results.map((result, moviesIndex2)=> (
<div key={moviesIndex2} className="column is-2-desktop is-6-mobile  box m-1  " >
<Link to='/overview'><img alt="movie poster" className="card" src={ baseImageURL + result.poster_path} onError={e => e.target.style.display = 'none'}  /></Link>
<div>

<p className=' title is-size-6 is-primary  has-text-primary m-0 '>{result.title}</p>
<p className=' title is-size-6 is-primary mt-2 '>Release: {DateTime.fromISO(result.release_date).toFormat('LL/d/y')}</p>

<div>
    <button onClick={() => setVisible(!visible)}>
        {visible ? 'Hide' : 'Show'}
      </button>
      {visible && <div>{result.overview }</div>}
    </div>

</div>
  </div>
 ))}
</div>
        </div>

      )}


    </>
  );
}


export default Movies;