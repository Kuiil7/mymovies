import React, {useState, useEffect } from 'react';
import axios from 'axios';


require('dotenv').config()

function People () {

  const [data, setData] = useState({ results: [] });
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState(`https://api.themoviedb.org/3/trending/person/week?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`);


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




  return (<>

<form onSubmit={event => {setUrl(`https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`);
        event.preventDefault();
      }}>

  <div className="column is-6  is-half is-offset-one-quarter ">
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
<div className="container scrolling-wrapper  ">
<div className="columns   p-2 is-mobile ">
{data.results  && data.results.map((result, peopleIndex) => (
<div key={peopleIndex} className="column  is-6-mobile is-2-desktop m-1 box " >
<section>
<figure className="image ">
<img alt="movie poster" src={'https://image.tmdb.org/t/p/original/' + result.profile_path} onError={e => e.target.style.display = 'none'}  />
</figure>
<p className="title is-4 has-text-primary mb-1">{result.name}</p>
<p className="subtitle is-7 m-1">{result.known_for_department}
</p>
<i className="fas fa-star has-text-warning fa-1x  mr-1"></i>
{result.popularity}
<div className="is-mobile has-text-primary mt-2" >
<p   >{result.known_for[0].title }</p>
<p >{result.known_for[1].title}</p>
<p >{result.known_for[2].title}</p>
</div>


</section>
</div>
 ))}
</div>
</div>
      )}
    </>
  );
}

export default People;