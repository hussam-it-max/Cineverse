import { useState, useEffect } from "react";
const API_KEY = process.env.REACT_APP_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
export default function useFetchMovies(category) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = "";
        if (!category || category === "popular") {
          url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
        } else {
          url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${category}&page=${page}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setMovies((prevMovies) => {
          if (page === 1) return data.results;
          else {
            // filter duplicates using movie ID
            const newMovies = data.results.filter(
              (m) => !prevMovies.some((p) => p.id === m.id)
            );
            return [...prevMovies, ...newMovies];
          }
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [category, page]);
  const loadMore = () => setPage((prev) => prev + 1);
  return { movies, loading, error, loadMore };
}
