import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
//import { DateTime } from 'luxon';

require('dotenv').config()

function People() {

  const [data, setData] = useState({ results: [] });

  const [isError, setIsError] = useState(false);

  const [query, setQuery] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/trending/person/week?api_key=${process.env.REACT_APP_API_KEY}`
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
           `https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`
        );
        event.preventDefault();
      }}>


  <div className="column is-6  is-half is-offset-one-quarter">
  <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
          className="input is-primary mb-2 is-rounded"
          placeholder="enter a person name"
        />
   <button className="button is-small is-rounded is-primary" type="submit">Search</button>

  </div>

 </form>



      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading People...</div>
      ) : (
        <div className="container ">
<div className="columns is-flex-wrap-wrap is-centered p-2">

{data.results  && data.results.map(result => (

  <div key={result} className="column is-one-quarter m-1  " >
      <div className='reverse-columns is-link is-small is-size-7'>


<section>
<div className="card">
  <div className="card-image">
    <figure className="image ">
    <img alt="movie poster" src={'https://image.tmdb.org/t/p/original/' + result.profile_path} onError={e => e.target.style.display = 'none'}  />

</figure>
  </div>

  <div className="card-content" >
    <div className="media">

      <div className="media-content">
        <p className="title is-4 has-text-primary">{result.name}</p>
        <p className="subtitle is-6">{result.known_for_department}</p>
      </div>
      <i className="fas fa-star has-text-warning fa-1x mt-1 mr-1"></i>
      <p>{result.popularity}</p>

    </div>

    <div className="is-mobile has-text-primary" >
  <p   >
    {result.known_for[0].title }
  </p>
  <p >
    {result.known_for[1].title}
  </p>
  <p >
    {result.known_for[2].title}
  </p>

</div>


  </div>
</div>




  </section>





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

export default People;