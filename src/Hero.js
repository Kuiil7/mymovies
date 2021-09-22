import React from "react";
import { DateTime } from 'luxon';
import {  Link } from 'react-router-dom';


const Hero= () => {
  return (<div>
<section className="hero is-success is-small has-text-white">
  <div className="hero-body">
    <p className="title">
    Welcome to MyMovies!
    </p>
    <p className="subtitle is-7 is-italic">
     Your #1 movie and TV show site search!
     <br/>
    </p>

    <p className="is-pulled-right">
     {DateTime.now().toFormat('LLLL dd, yyyy h:m:s a')}
    </p>
    <br />
    <p className="is-pulled-right is-italic is-size-7">
powered by <a href='https://www.themoviedb.org/'> TMDB </a>
</p>
  </div>

<div className="tabs ">
  <ul>
  <li ><Link to="/movies">Movies</Link></li>
    <li><Link to="/tvshows">TV Shows</Link></li>
    <li><Link to="/people">People</Link></li>

  </ul>
</div>
</section>
</div>

  );
};
export default Hero;