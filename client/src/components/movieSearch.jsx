import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './MovieSearch.css'; // new CSS file

export default function MovieSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_API_URL;
  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const wrapperRef = useRef(null);

  // Fetch movies when user types
  useEffect(() => {
    if (!query) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        const data = await response.json();
        setResults(data.results || []);
        setShowDropdown(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300); // debounce 300ms

    return () => clearTimeout(delayDebounce);
  }, [query, BASE_URL, API_KEY]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  return (
    <div className="search-wrapper" ref={wrapperRef}>
      <input
        type="text"
        className="search-input"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <p className="loading-text">Loading...</p>}

      {showDropdown && results.length > 0 && (
        <ul className="dropdown">
          {results.map((movie) => (
            <li
              key={movie.id}
              className="dropdown-item"
              onClick={() => {
                navigate(`/movie/${movie.id}`);
                setShowDropdown(false);
                setQuery("");
              }}
            >
              <img
                className="movie-photo"
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : "https://via.placeholder.com/50x75"}
                alt={movie.title}
              />
              <span className="movie-t">{movie.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}



