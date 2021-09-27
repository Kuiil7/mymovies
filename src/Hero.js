import React from "react";
import { DateTime } from 'luxon';
import {  Link } from 'react-router-dom';


const Hero= () => {
  return (  <div >
<section className="hero has-background-primary-dark is-small " >
  <div className="hero-body" >
    <p className="title has-text-white">
    Welcome to MyMovies!
    </p>
    <p className="subtitle is-7 is-italic has-text-white">
     Your #1 movies and TV shows search!
     <br/>
    </p>

    <p className="is-pulled-right has-text-white">
     {DateTime.now().toFormat('LLLL dd, yyyy h:m:s a')}
    </p>
    <br />
    <p className="is-pulled-right is-italic is-size-7 has-text-white">
powered by <a href='https://www.themoviedb.org/' className="has-text-white"> TMDB </a>
</p>
  </div>

<div className="tabs is-boxed has-background-primary-light">
  <ul>
  <li ><Link to="/movies" >Movies</Link></li>
    <li>

<Link to="/tvshows" >TV Shows</Link>

      </li>

     < li>  <Link to="/people" >People</Link>
    </li>
    < li>  <Link to="/trending" >Trending</Link>
    </li>
    < li>  <Link to="/overview" >Overview</Link>
    </li>
  </ul>
</div>
</section>
</div>

  );
};
export default Hero;