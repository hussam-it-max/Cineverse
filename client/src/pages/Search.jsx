import NavBar from '../components/NavBar';
import MovieSearch from '../components/movieSearch.jsx';

import './search.css';

export default function Search() {

    
    return (
        <div className="search-page">
            <NavBar />
            <h1>Search Movies</h1>
            <MovieSearch />

        </div>
    );
}