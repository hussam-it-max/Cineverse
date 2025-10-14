import './movies.css';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from './Heart';
const IMAGE_BASE = "https://image.tmdb.org/t/p/original";
export default function MovieCard({movie}){
    const stars = Math.round(movie.vote_average / 2);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie/${movie.id}`);
    };

    return(
        <div className="movie-card" onClick={handleClick}>
            <img  src={`${IMAGE_BASE}${movie.poster_path}`} alt={movie.title} />
            <FavoriteButton id={movie.id} movie={movie} />
            <h4 >{movie.title}</h4>
      <div className="rating">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <span key={i} className={i < stars ? "star filled" : "star"}>
              ★
            </span>
          ))}
      </div>
        </div>
    )
}