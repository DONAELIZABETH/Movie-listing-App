import { Link } from 'react-router-dom';

const MovieCard = ({ movie, addToFavorites, removeFromFavorites, isFavorite }) => {
  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(movie.imdbID);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} className="movie-card-poster" />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      <button onClick={handleFavoriteToggle}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      <Link to={`/movie/${movie.imdbID}`} className="view-details-link">
        View Details
      </Link>
    </div>
  );
};

export default MovieCard;
