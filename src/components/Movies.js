import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';

function Movies() {
  const [data, setData] = useState({ results: [], total_pages: 1 });
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page number
  const [currentChunk, setCurrentChunk] = useState(0); // Track the current chunk
  const [modalMovie, setModalMovie] = useState(null); // State to track the movie for modal
  const baseImageURL = 'https://image.tmdb.org/t/p/original/';
  const itemsPerChunk = 5; // Number of movies per chunk

  const baseSearchURL = 'https://api.themoviedb.org/3/search/movie?';
  const baseMovieURL = 'https://api.themoviedb.org/3/movie/popular?';

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const url = query 
          ? `${baseSearchURL}query=${query}&api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`
          : `${baseMovieURL}api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`;
          
        const result = await axios(url);
        setData({
          results: result.data.results,
          total_pages: result.data.total_pages // Update the total number of pages
        });
        setCurrentChunk(0); // Reset chunk when new data is fetched
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, currentPage]);

  const goToNextChunk = () => {
    if ((currentChunk + 1) * itemsPerChunk < data.results.length) {
      setCurrentChunk(prevChunk => prevChunk + 1);
    } else if (currentPage < data.total_pages) {
      setCurrentPage(prevPage => prevPage + 1);
      setCurrentChunk(0); // Reset chunk when moving to the next page
    }
  };

  const goToPreviousChunk = () => {
    if (currentChunk > 0) {
      setCurrentChunk(prevChunk => prevChunk - 1);
    } else if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
      setCurrentChunk(itemsPerChunk - 1); // Set chunk to the last one of the previous page
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setCurrentPage(1); // Reset to page 1 on new search
    setCurrentChunk(0); // Reset chunk when searching
    setQuery(event.target.query.value);
  };

  const handleModalOpen = (movie) => {
    setModalMovie(movie);
  };

  const handleModalClose = () => {
    setModalMovie(null);
  };

  return (
    <>
      <main aria-labelledby="movie search page with displayed results">
        <div className="columns">
          <div className="column is-3">
            <h1 className="title is-3 p-4">Search Movies</h1>
          </div>
          <div className="column">
            <form onSubmit={handleSearch}>
              <div className="column is-8">
                <input
                  type="text"
                  name="query"
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                  className="input is-primary mb-2 is-rounded"
                  placeholder="Enter a movie name"
                />
                <button className="button is-small is-rounded is-primary" type="submit" role="button" aria-pressed="false">Search</button>
              </div>
            </form>
          </div>
        </div>

        {isError && <div>Something went wrong ...</div>}
        {isLoading ? (
          <div>Loading Movies...</div>
        ) : (
          <div className="container scrolling-wrapper pb-4 pl-4">
            <h2 className="title is-4">Trending Movies</h2>
            <div className="columns p-2 is-mobile">
              {data.results.slice(currentChunk * itemsPerChunk, (currentChunk + 1) * itemsPerChunk).map((result, index) => (
                <div key={index} className="column is-2-desktop is-6-mobile box m-1">
                  <img alt="movie poster" className="card" src={baseImageURL + result.poster_path} onError={e => e.target.style.display = 'none'} />
                  <div>
                    <p className='title is-size-6 is-primary has-text-primary m-0'>{result.title}</p>
                    <p className='title is-size-6 is-primary mt-2'>Release: {DateTime.fromISO(result.release_date).toFormat('LL/d/y')}</p>
                    <button onClick={() => handleModalOpen(result)} className="button is-small is-rounded is-primary">
                      View Overview
                    </button>
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
                disabled={currentPage >= data.total_pages && (currentChunk + 1) * itemsPerChunk >= data.results.length}
                className="button is-small is-rounded is-primary"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {modalMovie && (
          <div className="modal is-active">
            <div className="modal-background" onClick={handleModalClose}></div>
            <div className="modal-content">
              <div className="box">
                <h2 className="title is-4">{modalMovie.title}</h2>
                <p>{modalMovie.overview}</p>
                <br/>
                <p><strong>Release Date: </strong>{DateTime.fromISO(modalMovie.release_date).toFormat('LL/d/y')}</p>
                <p><strong>Vote: </strong>{modalMovie.vote_average}</p>
                <p><strong>Popularity: </strong>{modalMovie.popularity}</p>
                <button className="button is-small is-rounded is-primary" onClick={handleModalClose}>Close</button>
              </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={handleModalClose}></button>
          </div>
        )}
      </main>
    </>
  );
}

export default Movies;
