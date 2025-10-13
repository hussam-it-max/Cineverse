import { useContext } from 'react';
import { UserContext } from '../Context/UserContext.js';
import NavBar from '../components/NavBar';
import MovieCard from '../components/MovieCard'; // use this instead of MovieList
import './favorite.css';

export default function Favorites() {
  const { favorites } = useContext(UserContext);

  if (favorites.length === 0) {
    return (
      <div>
        <NavBar />
        <div className="empty-favorites">
          <h1>Your Favorites</h1>
          <p>No favorite movies found.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <h1>Your Favorites</h1>
      <div className="movie-list">
        {favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
