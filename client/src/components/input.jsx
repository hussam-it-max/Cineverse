import { useState, useEffect, useRef } from 'react';
import { fetchMovie } from '../hooks/fetchMovie.js';
import './input.css';
import { useNavigate } from 'react-router-dom';

export default function Input() {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  // Fetch movies when user clicks search or after query update
  useEffect(() => {
    if (!query) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    fetchMovie(query)
      .then(data => {
        if (!data || data.length === 0) {
          setResults([]);
          setShowDropdown(false);
        } else {
          setResults(data);
          setShowDropdown(true);
        }
      })
      .catch(err => {
        console.error("Error fetching movie", err);
        setResults([]);
        setShowDropdown(false);
      });
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="input-container" ref={wrapperRef}>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className='search-button' onClick={() => setQuery(inputValue)}>Search</button>

      {showDropdown && results.length > 0 && (
        <ul className="dropdown">
          {results.map((movie) => (
            <li
              key={movie.id}
              onClick={() => {
                setInputValue(movie.title);
                setShowDropdown(false);
                navigate(`/movie/${movie.id}`);
              }}
            >
              <img 
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : "https://via.placeholder.com/50x75"} 
                alt={movie.title} 
              />
              <span>{movie.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

