import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import People from './People'
import ProgCircle from './ProgCircle'
import { PinDropSharp } from '@material-ui/icons';
import {  Link } from 'react-router-dom';

import Overview from './Overview'



require('dotenv').config()




function Movies() {


  const [data, setData] = useState({ results: [] });

  const [isError, setIsError] = useState(false);

  const [query, setQuery] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const baseImageURL = 'https://image.tmdb.org/t/p/original/'

  const baseMovieUrl = 'https://api.themoviedb.org/3/search/movie?'

  const baseTrendingUrl = 'https://api.themoviedb.org/3/trending/movie/day?'

  const [show, toggleShow] = useState(false);

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





  return (<Fragment>

<form onSubmit={event => {
        setUrl(
           `${baseMovieUrl}api_key=${process.env.REACT_APP_API_KEY}&query=${query}
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
          placeholder="enter a movie name"
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








{data.results  && data.results.map((result, moviesIndex)=> (

  <div key={moviesIndex} className="column is-6 box m-1  " >

<Link to={{
  pathname: '/overview',
  state: { result: data.results}
}}>


<img alt="movie poster" src={ baseImageURL + result.poster_path} onError={e => e.target.style.display = 'none'}  />


  </Link>

<div class="columns ">


  <div class="column  has-text-right ">
  <ProgCircle
vote_average={result.vote_average}
original_language={result.original_language.toUpperCase()}
popularity={result.popularity}
release_date={result.release_date}
overview={result.overview}
baseImageURL={baseImageURL}
poster_path={result.poster_path}
backdrop_path={result.backdrop_path}

 />

  </div>
  <div class="column has-text-centered is-8
">
  <p className=' title is-size-4 is-primary mb-2 has-text-primary '>
 {result.title}
  </p>
  <p className=' title is-size-4 is-primary mb-2  '>
  {DateTime.fromISO(result.release_date).toFormat('LL/d/y')}
  </p>


  </div>

</div>
<div   className="has-text-centered" >


      <button
      className="button is-primary"
        onClick={() => toggleShow(!show)}
      >
        Overview {show}
      </button>
      {show && <div>
<div   className="
     has-text-left mt-2" >
     <Overview
      overview={result.overview}
      />
</div>
        </div>}
    </div>




  </div>
 ))}


</div>

        </div>

      )}



<People />




    </Fragment>
  );
}

export default Movies;