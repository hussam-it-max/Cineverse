const API_KEY = process.env.REACT_APP_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
export async function fetchMovie(MOVIE_NAME) {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      MOVIE_NAME
    )}`
  );
  if (!res.ok) throw new Error("Failed to fetch movie");
  const data = await res.json();
  console.log(data.results);
  return data.results;
}
