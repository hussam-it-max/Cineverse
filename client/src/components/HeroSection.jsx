import { useState, useEffect } from "react";
import "./HeroSection.css";
const API_KEY = process.env.REACT_APP_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

export default function HeroSection() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchHeroMovie() {
      try {
        const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
        const data = await res.json();
        const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
        setMovie(randomMovie);
      } catch (error) {
        console.error("Error fetching hero movie:", error);
      }
    }
    fetchHeroMovie();
  }, []);

  if (!movie) return null;

  return (
    <div className="hero-section">
      <img
        src={`${IMAGE_BASE}${movie.backdrop_path}`}
        alt="Cinematic background"
      />
      <div className="hero-overlay">
        <h1>Welcome to Cineverse</h1>
        <p>
          Step into a world of stories, emotions, and inspiration.  
          Discover movies that move you — one scene at a time.
        </p>
      </div>
    </div>
  );
}

