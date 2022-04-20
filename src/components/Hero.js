import React from "react";
import { DateTime } from 'luxon';
import {  Link } from 'react-router-dom';


const Hero= () => {
  return (
    <main aria-labelledby="landing page with hyperlink icons">
<section className="hero has-background-primary-dark is-small " >
  <div className="hero-body" >
    <h1 className="title has-text-white">Welcome to MyMovies!</h1>
    <h2 className="subtitle is-7 is-italic has-text-white">Your #1 movies and TV shows search!</h2>
    <p className="is-pulled-right has-text-white">{DateTime.now().toFormat('LLLL dd, yyyy h:m:s a')}</p>
    <br />
    <h3 className="is-pulled-right is-italic is-size-7 has-text-white">
powered by <a href='https://www.themoviedb.org/' className="has-text-white"> TMDB </a>
</h3>
  </div>

<div className="tabs is-boxed has-background-primary-light">
  <ul>
    <li ><Link to="/movies" >Movies</Link></li>
    <li><Link to="/tvshows" >TV Shows</Link></li>
    < li> <Link to="/people" >People</Link> </li>
    < li>  <Link to="/trending" >Trending</Link></li>
  </ul>
</div>
</section>
</main>
  );
};
export default Hero;