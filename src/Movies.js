import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import People from './People'
import { CircularProgressbar, buildStyles,  CircularProgressbarWithChildren } from 'react-circular-progressbar';

require('dotenv').config()




function Movies() {

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
        <div className="container scrolling-wrapper pb-4 pl-4 ">






<div className="columns p-2 is-mobile  ">

{data.results  && data.results.map((result, moviesIndex)=> (

  <div key={moviesIndex} className="column is-12 box m-1  " >

<ul >
<img alt="movie poster" src={ baseImageURL + result.poster_path} onError={e => e.target.style.display = 'none'}  />

<li className=' is-size-4 is-primary mb-2  '>
 <strong> {result.title}</strong>
  </li>



<div class="columns ">
  <div class="column is-5">
  <CircularProgressbarWithChildren value={result.vote_average}

styles={buildStyles({
  // Rotation of path and trail, in number of turns (0-1)
  rotation: 0.25,

  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
  strokeLinecap: 'butt',

  // Text size
  textSize: '16px',

  // How long animation takes to go from one percentage to another, in seconds
  pathTransitionDuration: 0.5,

  // Can specify path transition in more detail, or remove it entirely
  // pathTransition: 'none',

  // Colors
  //pathColor: `rgba(62, 152, 199, ${result.vote_average/ 1})`,
  //textColor: '#00d1b2',
  trailColor: '#00d1b2',
  backgroundColor: '#3e98c7',
})}
>
{/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */
}

<div className="is-size-4 mb-5 ">
  <strong>{result.vote_average * 10}%</strong>

</div>
</CircularProgressbarWithChildren>


  </div>

</div>



<li>


<p className="title is-size-6 has-text-bold pb-2">
<strong className='has-text-primary'>Release: </strong>{DateTime.fromISO(result.release_date).toFormat('LLLL dd, yyyy')}
</p>

</li>



<li>


<p className="title is-size-6 has-text-bold pb-2">
<strong className='has-text-primary'>
Language:
</strong> {result.original_language.toUpperCase()}
</p>


</li>
<li>
<p className="title is-size-6 has-text-bold pb-3">
  <strong className='has-text-primary mb-4'>Popularity: </strong>
  {result.popularity}</p>
</li>

</ul>
<div class="dropdown is-up is-hoverable">
  <div class="dropdown-trigger">
    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu7">
      <span>Overview</span>
      <span class="icon is-small">
        <i class="fas fa-angle-up" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu7" role="menu">
    <div class="dropdown-content">
      <div class="dropdown-item">
      <p><strong className='has-text-primary pr-1'> Overview:</strong>{result.overview}</p>

      </div>
    </div>
  </div>
</div>
<div>

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