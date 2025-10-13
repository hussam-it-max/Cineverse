import useFetchMovies from "../hooks/useFetchMovies";
import './movies.css';
import './spinner.css';
import MovieCard from "./MovieCard";
export default function MovieList({ selectedCategory }) {
        const { movies, loading, error, loadMore } = useFetchMovies(selectedCategory);
            if(loading) return <div className="spinner"></div>;
            if(error) return <p>Error: {error}</p>;
    return(
        <div className="movie-list">
            {movies.map(movie=>(
                <MovieCard key={movie.id} movie={movie}  />
            ))}
            <button className="load-more" onClick={loadMore}>Load More</button>
            
            

        </div>
    )
}