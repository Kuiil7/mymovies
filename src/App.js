import React, {useState, useEffect } from 'react';
import { Routes, Route} from "react-router-dom";
import Movies from "./components/movieapis/Movies";
import Trending from "./components/movieapis/Trending";
import People from "./components/movieapis/People";
import TVShows from "./components/movieapis/TVShows";
//import Main from "./components/Main";
import Header from "./Header";
//import TestOverview from "./components/TestOverview";
import axios from 'axios';
import Main from "./components/Main";
import Overview from "./components/movieapis/Overview";

require('dotenv').config()

function App() {
  const [data, setData] = useState({ results: [] });

  const [isError, setIsError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const baseImageURL = 'https://image.tmdb.org/t/p/original/'

  const baseMovieUrl = 'https://api.themoviedb.org/3/search/movie?'

  const baseTrendingUrl = 'https://api.themoviedb.org/3/trending/movie/day?'

  const url =`${baseTrendingUrl}api_key=${process.env.REACT_APP_MOVIE_API_KEY}`



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





  return (
    <div className="container">
<Header />
{isError && <div>Something went wrong ...</div>}
{

data.results.map((result, movieIndex) => (


      <Routes>
      <Route path="/" element={<Main />}  />
        <Route path="movies" element={<Movies
        vote_average={result.vote_average}
        original_language={result.original_language.toUpperCase()}
        popularity={result.popularity}
        release_date={result.release_date}
        overview={result.overview}
        overview2={data.results[1].overview}
        baseImageURL={baseImageURL}
        poster_path={result.poster_path}
        backdrop_path={result.backdrop_path}


        />} />
        <Route path="trending" element={<Trending />} />
        <Route path="people" element={<People />} />
        <Route path="tvshows" element={<TVShows />} />

  <Route path="overview" element={<Overview

    overview={result.overview}




  />} />




      </Routes>
        ))}

          </div>
  );
}
export default App;