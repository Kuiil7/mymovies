import React from "react";
import { DateTime } from 'luxon';
import {  Link } from 'react-router-dom';


const Hero= () => {
  return (
    <main aria-labelledby="landing page with hyperlink icons">
<section className="hero has-background-primary  is-small " >
  <div className="hero-body" >
    <h1 className="title has-text-white">Welcome!</h1>
    <h2 className="subtitle is-6 is-italic has-text-white">This site is powered by <a href="httP://themoviedb.org" className="has-text-white">themoviedb.org.</a></h2>
  </div>


</section>
</main>
  );
};
export default Hero;