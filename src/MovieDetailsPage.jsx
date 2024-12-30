import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch detailed movie data from OMDb API using the movie ID
  const fetchMovieDetails = async () => {
    if (!id) {
      setError('Invalid movie ID');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://cors-anywhere.herokuapp.com/https://www.omdbapi.com/?i=${id}&apikey=13020bd9`);
      const data = await response.json();
      
      if (data.Response === 'True') {
        setMovie(data);
        setError('');
      } else {
        setError('Movie not found');
      }
    } catch (error) {
      setError('An error occurred while fetching movie details');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  if (loading) return <p>Loading movie details...</p>;

  return (
    <div className="movie-details">
      {error && <p className="error-message">{error}</p>}
      {movie && (
        <div className="movie-detail-container">
          <img src={movie.Poster} alt={movie.Title} className="movie-detail-poster" />
          <div className="movie-detail-info">
            <h1>{movie.Title}</h1>
            <p><strong>Year:</strong> {movie.Year}</p>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
