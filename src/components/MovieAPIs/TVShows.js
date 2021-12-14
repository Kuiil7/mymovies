
import React, {  useState, useEffect } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import {  Link } from 'react-router-dom';

require('dotenv').config()

function TVShows() {

  const [data, setData] = useState({ results: [] });
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const baseImageURL = 'https://image.tmdb.org/t/p/original/'
  const baseAiringTodayURL = 'https://api.themoviedb.org/3/tv/airing_today?'
  const baseTVSearchURL = 'https://api.themoviedb.org/3/search/tv?'
  const [url, setUrl] = useState(`${baseAiringTodayURL}api_key=${process.env.REACT_APP_MOVIE_API_KEY}`);

  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(true)

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
  <div className="columns mt-4">
  <div className="column is-3">
  <p className="title p-5">TV Shows</p>
  </div>
  <div className="column is-8 mt-2">
  <form onSubmit={event => {
        setUrl(`${baseTVSearchURL}api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${query}}`);
        event.preventDefault();
      }}>
  <div className="column is-8 ">
  <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
          className="input is-primary mb-2 is-rounded"
          placeholder="enter a TV Show name"
          onClick={() => setShow(!show)}

        />
   <button className="button is-small is-rounded is-primary" type="submit">Search</button>
  </div>
 </form>
  </div>
</div>

{isError && <div>Something went wrong ...</div>}

{isLoading ? (<div>Loading Most Popular Movies...</div>) :
(<div className="container  scrolling-wrapper pb-4 pl-4 ">
<p className="title is-4">TV Shows airing today</p>
<div className="columns p-2 is-mobile  ">
{data.results  && data.results.map((result, tvshowsIndex)=> (
<div key={tvshowsIndex} className="column is-6-mobile is-2-desktop box m-1  " >
<Link to={{pathname: '/overview', state: { result: data.results}}}>
<img alt="movie poster" src={ baseImageURL + result.poster_path} onError={e => e.target.style.display = 'none'}  /></Link>
<p className=' title is-size-6 is-primary  has-text-primary m-0 '>{result.name}</p>
<p className=' title is-size-6 is-primary mt-2 '>Release: {DateTime.fromISO(result.first_air_date).toFormat('LL/d/y')}</p>

<div>
<button onClick={() => setVisible(!visible)}>
{visible ? 'Hide' : 'Show'}
</button>
{visible && <div>{result.overview }</div>}
</div>
</div>
 ))}
</div>
 </div>
)}







    </>
  );
}

export default TVShows;