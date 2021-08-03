import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import { Badge} from '@material-ui/core';

import { makeStyles } from "@material-ui/core/styles";




import './App.css'

require('dotenv').config()

function App() {

  const [data, setData] = useState({ results: [] });

  const [isError, setIsError] = useState(false);

  const [query, setQuery] = useState('');

  const [isLoading, setIsLoading] = useState(false);


  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleAddClick = () => {
    setAddModalOpen(true);
  };
  const handleClose = () => {
    setAddModalOpen(false);
  };

  const [url, setUrl] = useState(

    `
    https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}
    `

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



  const useStyles = makeStyles((theme) => ({
    badge: {
      fontSize: 30
    }
  }));




  const classes = useStyles();
  return (
    <Fragment>

<section className="hero is-success is-small">
  <div className="hero-body">
    <p className="title">
    Welcome to MyMovies!
    </p>
    <p className="subtitle is-7 is-italic">
     Your #1 movie site search!
     <br/>
 powered by <a href='https://www.themoviedb.org/'> TMDB </a>
    </p>

    <p className="is-pulled-right">
    Today's date: {DateTime.now().toFormat('LLLL dd yyyy')}

    </p>


  </div>
</section>



<form onSubmit={event => {
        setUrl(
           ` https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${query}



          }`
        );
        handleClose();
        event.preventDefault();
      }}>


  <div className="column is-6  is-half is-offset-one-quarter">

  <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
          className="input is-primary mb-2"
          placeholder="enter a keyword"

        />
   <button className="button is-small is-primary" type="submit">Search</button>

  </div>




 </form>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading Most Popular Movies...</div>
      ) : (
        <div className="container ">
<div className="columns is-flex-wrap-wrap is-centered p-2">

{data.results && data.results.map(result => (

  <div key={result.id} className="column is-one-quarter box m-1  " >


<div >
      <div className='reverse-columns is-link is-small is-size-7'>



<ul >
<img alt="movie poster" src={'https://image.tmdb.org/t/p/original/' + result.poster_path} onError={e => e.target.style.display = 'none'}  />

<li className=' is-size-6 is-primary mb-2'>

 <strong> {result.title}</strong>
  </li>

<li>
<strong>Release: </strong>{DateTime.fromISO(result.release_date).toFormat('LLLL dd, yyyy')}

</li>

<li>

<strong>
Language:
</strong> {result.original_language}


</li>


<li>
<strong>Popularity:</strong> {result.popularity}

</li>
<p className="has-text-centered mt-2">
<i  className="far fa-star fa-3x has-text-warning ">

</i>
</p>
<p className="has-text-centered mt-4 has-text-primary">

<Badge badgeContent={  "10/" + result.vote_average} classes={{ badge: classes.badge }}></Badge>


</p>





<li className="is-pulled-right mt-4">

 Total Votes: {result.vote_count}
</li>

<div className="dropdown is-hoverable mt-2" >
  <div className="dropdown-trigger">
    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu2"    onClick={handleAddClick}>
      <span>Movie Overview</span>

      <span className="icon is-small">
        <i className="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div className="dropdown-menu" id="dropdown-menu2" role="menu"    isVisible={addModalOpen}>
    <div className="dropdown-content" >


      <div className="dropdown-item">
      <img alt="movie poster" src={'https://image.tmdb.org/t/p/original/' + result.backdrop_path} onError={e => e.target.style.display = 'none'}  />
     {result.overview}


      </div>

    </div>
  </div>
</div>

</ul>
        </div>
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

export default App;