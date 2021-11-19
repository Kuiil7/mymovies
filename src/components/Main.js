import React, {useState, useEffect } from 'react';
import axios from 'axios';
import {  Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import Movies from "./movieapis/Movies";
import Trending from "./movieapis/Trending";
import People from "./movieapis/People";
import TVShows from "./movieapis/TVShows";
function Main() {



  return (
    <>

<Movies />
<TVShows />
<Trending />
<People />
</>
  );
}

export default Main;
