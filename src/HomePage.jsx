import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard'; // Assuming you have a MovieCard component

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const moviesPerPage = 10; // Number of movies to display per page

  // Fetch movie data
  const fetchMovies = async (page = 1) => {
    if (searchTerm.trim() === '') {
      setError('Please enter a search term.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?s=${searchTerm}&page=${page}&apikey=13020bd9`);
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
        setTotalPages(Math.ceil(data.totalResults / moviesPerPage));
      } else {
        setError('No movies found!');
        setMovies([]);
      }
    } catch (error) {
      setError('An error occurred while fetching the data.');
    }
    setLoading(false);
  };

  // Handle search term change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Add to favorites
  const addToFavorites = (movie) => {
    if (!favorites.some(fav => fav.imdbID === movie.imdbID)) { // Prevent duplicates
      const updatedFavorites = [...favorites, movie];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  // Remove from favorites
  const removeFromFavorites = (imdbID) => {
    const updatedFavorites = favorites.filter((movie) => movie.imdbID !== imdbID);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Fetch movies when search term or page changes
  useEffect(() => {
    if (searchTerm.trim() !== '') {
      fetchMovies(currentPage);
    }
  }, [searchTerm, currentPage]); // Both dependencies ensure fetch is called when either changes

  return (
    
    <div className="home-page">
      <h1>movie search </h1>
      <div className="search-container">
  
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={() => fetchMovies(1)}>Search</button>
      </div>

      {error && <p className="error-message">{error}</p>}
      {loading && <p>Loading...</p>}

      <div className="movie-grid">
        {movies.length > 0 &&
          movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
            />
          ))}
      </div>

      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        )}
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        {currentPage < totalPages && (
          <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
