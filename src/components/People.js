import React, { useState, useEffect } from 'react';
import axios from 'axios';

function People() {
  const [data, setData] = useState({ results: [], page: 1, total_pages: 1 });
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentChunk, setCurrentChunk] = useState(0); // Track the current chunk
  const itemsPerChunk = 5; // Number of people per chunk
  const baseImageURL = 'https://image.tmdb.org/t/p/original/';
  const baseMovieURL = 'https://api.themoviedb.org/3/trending/person/week?';
  const baseTVSearchURL = `https://api.themoviedb.org/3/search/person?query=${query}&api_key=${process.env.REACT_APP_API_KEY}&page=`;

  const [url, setUrl] = useState(`${baseMovieURL}api_key=${process.env.REACT_APP_API_KEY}`);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const result = await axios(url);
        setData({
          results: result.data.results,
          page: result.data.page,
          total_pages: result.data.total_pages
        });
        setCurrentChunk(0); // Reset chunk when data is fetched
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  const handleSearch = (event) => {
    event.preventDefault();
    setCurrentPage(1); // Reset to page 1 on new search
    setCurrentChunk(0); // Reset chunk when searching
    setUrl(`${baseTVSearchURL}1&api_key=${process.env.REACT_APP_API_KEY}`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setUrl(`${baseTVSearchURL}${pageNumber}&api_key=${process.env.REACT_APP_API_KEY}`);
  };

  const goToNextChunk = () => {
    if ((currentChunk + 1) * itemsPerChunk < data.results.length) {
      setCurrentChunk(prevChunk => prevChunk + 1);
    } else {
      if (currentPage < data.total_pages) {
        handlePageChange(currentPage + 1);
        setCurrentChunk(0); // Reset chunk when moving to the next page
      }
    }
  };

  const goToPreviousChunk = () => {
    if (currentChunk > 0) {
      setCurrentChunk(prevChunk => prevChunk - 1);
    } else if (currentPage > 1) {
      handlePageChange(currentPage - 1);
      setCurrentChunk(itemsPerChunk - 1); // Set chunk to the last one of the previous page
    }
  };

  return (
    <>
      <main aria-labelledby="people search page with displayed results">
        <div className="columns">
          <div className="column is-3">
            <h1 className="title is-3 p-4">Search People</h1>
          </div>
          <div className="column">
            <form onSubmit={handleSearch}>
              <div className="column is-8">
                <input
                  type="text"
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                  className="input is-primary mb-2 is-rounded"
                  placeholder="Enter a person name"
                />
                <button className="button is-small is-rounded is-primary" type="submit" role="button" aria-pressed="false">Search</button>
              </div>
            </form>
          </div>
        </div>

        {isError && <div>Something went wrong ...</div>}
        {isLoading ? (
          <div>Loading Trending People...</div>
        ) : (
          <div className="container scrolling-wrapper pb-4 pl-4">
            <h2 className="title is-4">Trending People</h2>
            <div className="columns p-2 is-mobile">
              {data.results.slice(currentChunk * itemsPerChunk, (currentChunk + 1) * itemsPerChunk).map((result, peopleIndex) => (
                <div key={peopleIndex} className="column is-2-desktop is-6-mobile box m-1">
                  <figure className="image">
                    <img alt="person profile" src={baseImageURL + result.profile_path} onError={e => e.target.style.display = 'none'} />
                  </figure>
                  <div>
                    <p className="title is-4 has-text-primary mb-1">{result.name}</p>
                    <p className="subtitle is-7 m-1">{result.known_for_department}</p>
                    <i className="fas fa-star has-text-warning fa-1x mr-1"></i>
                    {result.popularity}
                    <ol className="ml-3 is-italic">
                      <li>{result.known_for[0]?.title} ({result.known_for[0]?.media_type})</li>
                      <li>{result.known_for[1]?.title} ({result.known_for[1]?.media_type})</li>
                      <li>{result.known_for[2]?.title} ({result.known_for[2]?.media_type})</li>
                    </ol>
                  </div>
                </div>
              ))}
            </div>
            <div className="buttons">
              <button
                onClick={goToPreviousChunk}
                disabled={currentPage === 1 && currentChunk === 0}
                className="button is-small is-rounded is-primary"
              >
                ← Previous
              </button>
              <button
                onClick={goToNextChunk}
                disabled={(currentPage >= data.total_pages && (currentChunk + 1) * itemsPerChunk >= data.results.length) || isLoading}
                className="button is-small is-rounded is-primary"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default People;
