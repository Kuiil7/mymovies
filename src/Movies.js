import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';

require('dotenv').config()

function Movies() {

  const [data, setData] = useState({ results: [] });

  const [isError, setIsError] = useState(false);

  const [query, setQuery] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [url, setUrl] = useState(
  `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}`
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
           ` https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${query}
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
        <div className="container ">
<div className="columns is-flex-wrap-wrap is-centered p-2">

{data.results  && data.results.map((result, index)=> (

  <div key={index} className="column is-one-quarter box m-1  " >
      <div className='reverse-columns is-link is-small is-size-7'>

<ul >
<img alt="movie poster" src={'https://image.tmdb.org/t/p/original/' + result.poster_path} onError={e => e.target.style.display = 'none'}  />

<li className=' is-size-6 is-primary mb-2'>
 <strong> {result.title}</strong>
  </li>
  <li className=' is-size-6 is-primary mb-2'>
 <strong> {result.name}</strong>
  </li>

  <div className="columns is-mobile p-2">
  <div className="column has-text-centered">
  <p className="title has-text-primary ">
   <i className="fas fa-star has-text-warning fa-1x"></i>
{result.vote_average}({result.vote_count})
</p>

  </div>

</div>








<li><strong className='has-text-primary'>Release: </strong>{DateTime.fromISO(result.release_date).toFormat('LLLL dd, yyyy')}</li>





<li>

<strong className='has-text-primary'>
Language:
</strong> {result.original_language.toUpperCase()}
</li>
<li>
<strong className='has-text-primary'>Popularity:</strong> {result.popularity}
</li>

<p className='mt-3'>
<strong className='has-text-primary'>Overview:</strong> {result.overview}
</p>

<br />


</ul>
        </div>




  </div>




 ))}



</div>

        </div>

      )}






<div >

  <div className="content has-text-centered mt-6" style={{height:"60px"}}>
    <p>
      <strong>MyMovies</strong> by <a href="https://jgamworks.com">jgamworks.com</a>.
    </p>
  </div>

</div>


    </Fragment>
  );
}

export default Movies;