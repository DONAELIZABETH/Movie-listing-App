import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favorites')) || []);
  }, []);

  return (
    <div className="favorites-page">
      <h1>Your Favorite Movies</h1>
      {favorites.length === 0 ? (
        <p>No movies in favorites. Go back to the Home Page and add some!</p>
      ) : (
        <div className="movie-grid">
          {favorites.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img src={movie.Poster} alt={movie.Title} />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <Link to={`/movie/${movie.imdbID}`} className="view-details-link">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
};

export default FavoritesPage;
