import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';

function TVShows() {
  const [data, setData] = useState({ results: [], page: 1, total_pages: 1 });
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [modalMovie, setModalMovie] = useState(null); // State for modal
  const baseImageURL = 'https://image.tmdb.org/t/p/original/';
  const itemsPerChunk = 5;

  const baseAiringTodayURL = 'https://api.themoviedb.org/3/tv/airing_today?';
  const searchURL = `https://api.themoviedb.org/3/search/tv?query=${query}&api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`;

  const [url, setUrl] = useState(`${baseAiringTodayURL}api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`);
  const [visibility, setVisibility] = useState({});

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
        console.log('TV Show Results:', result.data.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  const handleVisibilityToggle = (index) => {
    setVisibility(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setUrl(`${searchURL}&page=${pageNumber}`);
  };

  useEffect(() => {
    if (query) {
      setUrl(`${searchURL}&page=${currentPage}`);
    } else {
      setUrl(`${baseAiringTodayURL}api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`);
    }
  }, [currentPage, query]);

  const handleModalOpen = (show) => {
    setModalMovie(show);
  };

  const handleModalClose = () => {
    setModalMovie(null);
  };

  return (
    <>
      <main aria-labelledby="tv shows search page with displayed results">
        <div className="columns mt-4">
          <div className="column is-3">
            <p className="title p-5">TV Shows</p>
          </div>
          <div className="column is-8 mt-2">
            <form onSubmit={event => {
              setCurrentPage(1);
              setCurrentChunk(0);
              event.preventDefault();
            }}>
              <div className="column is-8">
                <input
                  type="text"
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                  className="input is-primary mb-2 is-rounded"
                  placeholder="Enter a TV Show name"
                />
                <button className="button is-small is-rounded is-primary" type="submit" role="button" aria-pressed="false">Search</button>
              </div>
            </form>
          </div>
        </div>

        {isError && <div>Something went wrong ...</div>}

        {isLoading ? (
          <div>Loading TV Shows...</div>
        ) : (
          <div className="container scrolling-wrapper pb-4 pl-4">
            <h2 className="title is-4">TV Shows Airing Today</h2>
            <div className="columns p-2 is-mobile">
              {data.results.slice(currentChunk * itemsPerChunk, (currentChunk + 1) * itemsPerChunk).map((result, index) => (
                <div key={index} className="column is-6-mobile is-2-desktop box m-1">
                  <img alt="TV show poster" src={baseImageURL + result.poster_path} onError={e => e.target.style.display = 'none'} />
                  <p className='title is-size-6 is-primary has-text-primary m-0'>{result.name}</p>
                  <p className='title is-size-6 is-primary mt-2'>Release: {DateTime.fromISO(result.first_air_date).toFormat('LL/d/y')}</p>
                  <button onClick={() => handleModalOpen(result)} className="button is-small is-rounded is-primary">
                    View Overview
                  </button>
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
                <h2 className="title is-4">{modalMovie.name}</h2>
                <p>{modalMovie.overview}</p>
                <br/>
                <p><strong>Release Date: </strong>{DateTime.fromISO(modalMovie.first_air_date).toFormat('LL/d/y')}</p>
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

export default TVShows;
