import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import {  Link } from 'react-router-dom';




require('dotenv').config()




function Trending() {


  const [data, setData] = useState({ results: [] });
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const baseImageURL = 'https://image.tmdb.org/t/p/original/'
  const baseMovieUrl = 'https://api.themoviedb.org/3/trending/all/day?'
  const baseTrendingUrl = 'https://api.themoviedb.org/3/trending/movie/day?'
  const [show, toggleShow] = useState(false);

  const [url, setUrl] = useState(
  `${baseTrendingUrl}api_key=${process.env.REACT_APP_MOVIE_API_KEY}`
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





  return (<>

<form onSubmit={event => {
        setUrl(
           `${baseMovieUrl}api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${query}
          }`
        );
        event.preventDefault();
      }}>


  <div className="column is-6  is-half is-offset-one-quarter">
  <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
          className="input is-primary mb-2 is-rounded"
          placeholder="enter a  name"
        />
   <button className="button is-small is-rounded is-primary" type="submit">Search</button>

  </div>

 </form>



      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading Most Popular Movies...</div>
      ) : (




        <div className="container  scrolling-wrapper pb-4 pl-4 ">


<div className="columns p-2 is-mobile  ">








{data.results  && data.results.map((result, trendingIndex)=> (

  <div key={trendingIndex} className="column is-6-mobile is-2-desktop box m-1  " >


<button className="button is-primary is-small is-inverted is-rounded" onClick={() => toggleShow(!show)}> Overview {show}</button>
{show && <div>

</div>}
</div>
 ))}
</div>
</div>
)}
</>
  );
}

export default Trending;