import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';


require('dotenv').config()

function App() {

  const [data, setData] = useState({ results: [] });

  const [isError, setIsError] = useState(false);

  const [query, setQuery] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [onLoadUrl, setUrl] = useState(
    `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_API_KEY}`
    );



  useEffect(() => {


    const fetchData = async () => {

      setIsLoading(true);
      setIsError(false);

     const resultPeoplAPI = await axios(onLoadUrl);

      setData(resultPeoplAPI.data);
      setIsLoading(false);
      console.log(resultPeoplAPI.data)

    };

    fetchData();

  }, [onLoadUrl]);







  return (
    <Fragment>
<form onSubmit={event => {
        setUrl(
           `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&query=${query}`
        );
        event.preventDefault();
      }}>


  <div className="column is-6  is-half is-offset-one-quarter">

  <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
          className="input is-primary mb-2 is-rounded"
          placeholder="enter a TV show"
        />
   <button className="button is-small is-primary" type="submit">Search</button>

  </div>




 </form>




      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading Most Popular TV Shows...</div>
      ) : (
        <div className="container ">

<div className="columns is-flex-wrap-wrap is-centered p-2">

{data.results  && data.results.map(result => (

  <div key={result} className="column is-one-quarter box m-1  " >
      <div className='reverse-columns is-link is-small is-size-7'>

<ul >
<img alt="tv show poster" src={'https://image.tmdb.org/t/p/original/' + result.poster_path} onError={e => e.target.style.display = 'none'}  />

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








<li><strong className='has-text-primary'>First Aired: </strong>{DateTime.fromISO(result.first_air_date).toFormat('LLLL dd, yyyy')}</li>





<li>

<strong className='has-text-primary'>
Language:
</strong> {result.original_language.toUpperCase()}
</li>
<li>
<strong className='has-text-primary'>Popularity:</strong> {result.popularity}

</li>
<li>

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


        </div>







    </Fragment>
  );
}

export default App;