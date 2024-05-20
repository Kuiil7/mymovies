import React, {useState, useEffect } from 'react';
import axios from 'axios';


function People() {

  const [data, setData] = useState({ results: [] });
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const baseImageURL = 'https://image.tmdb.org/t/p/original/'
  const baseMovieURL = 'https://api.themoviedb.org/3/trending/person/week?'
  const [url, setUrl] = useState(`${baseMovieURL}api_key=${process.env.REACT_APP_API_KEY}`);
  const [show, setShow] = useState(true)

  const baseTVSearchURL =`https://api.themoviedb.org/3/search/person?query=${query}&api_key=${process.env.REACT_APP_API_KEY}`

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

  <>
<main aria-labelledby="movie search page with displayed results">

<div className="columns">
  <div className="column is-3">
  <h1 className="title is-3  p-4 ">Search People</h1>
  </div>
  <div className="column">
  <form onSubmit={event => {
        setUrl(`${baseTVSearchURL}`);
        event.preventDefault();
      }}>
  <div className="column is-8 ">
  <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
          className="input is-primary mb-2  is-rounded"
          placeholder="enter a movie name"
          onClick={() => setShow(!show)}


        />
   <button className="button is-small is-rounded is-primary" type="submit" role="button" aria-pressed="false">Search</button>
  </div>
 </form>
  </div>
</div>

{isError && <div>Something went wrong ...</div>}
{isLoading ? (<div>Loading Trending People...</div>) : (
<div className="container scrolling-wrapper pb-4 pl-4 ">
  <h2 className="title is-4">Trending People</h2>
<div className="columns p-2 is-mobile  ">
{data.results && data.results.map((result, peopleIndex)=> (
<div key={peopleIndex} className="column is-2-desktop is-6-mobile  box m-1  " >
<figure className="image ">
<img alt="movie poster" src={'https://image.tmdb.org/t/p/original/' + result.profile_path} onError={e => e.target.style.display = 'none'}  />
</figure>
<div >
<p className="title is-4 has-text-primary mb-1">{result.name}</p>
<p className="subtitle is-7 m-1">{result.known_for_department}
</p>
<i className="fas fa-star has-text-warning fa-1x  mr-1"></i>
{result.popularity}
<ol className="ml-3 is-italic">
  <li >{result.known_for[0]?.title}({result.known_for[0]?.media_type})</li>
  <li>{result.known_for[1]?.title}({result.known_for[0]?.media_type}</li>
  <li>{result.known_for[2]?.title}({result.known_for[0]?.media_type})</li>
</ol>
<div>
</div>
</div>
  </div>
 ))}
</div>
</div>

      )}
      </main>
    </>
  );
}


export default People;