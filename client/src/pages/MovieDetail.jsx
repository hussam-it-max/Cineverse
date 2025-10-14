import { useNavigate,useParams } from "react-router-dom"
import { useEffect,useState } from "react"
 
import NavBar from "../components/NavBar.jsx";
import './Moviedetail.css';
import '../components/spinner.css';
const API_KEY = process.env.REACT_APP_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/original";


export default function MovieDetail(){
    const [movie,setMovie]=useState(null);
    const [credits,setCredits]=useState(null);
    const [trailer,setTrailer]=useState(null);
    const [castMessage,setCastMessage]=useState("");
    const [trailerMessage,setTrailerMessage]=useState("");
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(true);
    const navigate = useNavigate();
    const { id } = useParams();
    const stars = movie ? Math.round(movie.vote_average / 2) : 0;
    useEffect(()=>{
        (async function fetchExtraDetails(){
            try{
          const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
          if (!res.ok) throw new Error("Cannot fetch movie details");
          const data = await res.json();
          setMovie(data);
      
                const [creditsRes,videoRes]=await Promise.all([
                    fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`),
                    fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`)
                ]);
                if(!creditsRes.ok || !videoRes.ok) throw new Error("sorry the details are not available");
                const creditsData=await creditsRes.json();
                const videoData=await videoRes.json();
                if(creditsData.cast.length===0) {
                    setCastMessage("No cast information available");
                }
                setCredits(creditsData.cast.slice(0,5));
                const trailerVideo=videoData.results.find(v=>v.type==="Trailer");
                if(!trailerVideo) {
                    setTrailerMessage("No trailer available");
                }
                setTrailer(trailerVideo);
            } catch(err){
                setError(err.message);
            }
            finally{
                setLoading(false);
            }
        })();
    },[id]);
 



    const handleBack = () => {
        navigate(-1);
    };

        if( error) return(
            <div className="error-notification">
                <h2>Movie Details</h2>
                <p>{error || "Error loading movie details. Please try again later."}</p>
                <button onClick={handleBack}>Go Back</button>
            </div>
        )
        if(loading) return <div className="spinner"></div>;
  
  


   return  (
    <><NavBar />
        <div className="movie-detail">
            <div className="movie-poster">
            <img src={`${IMAGE_BASE}${movie.poster_path}`} alt={movie.title} />
            <div className="movie-overlay">
        <h1>{movie.title}</h1>
      </div>
      </div>
      
        <div className="movie-story">
            <h2 className="story-title">Overview</h2>
        <p>{movie.overview}</p>
            </div>
<div className="movie-info">
  <h2 className="info-title">Information</h2>
  <div className="info-content">
    <div className="info-item">
      <p className="info-label">Release Date</p>
      <p className="info-value">{movie.release_date}</p>
    </div>

    <div className="info-item">
      <p className="info-label">Rating</p>
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

    <div className="info-item">
      <p className="info-label">Original Language</p>
      <p className="info-value">{movie.original_language.toUpperCase()}</p>
    </div>

    <div className="info-item">
      <p className="info-label">Popularity</p>
      <p className="info-value">{movie.popularity.toFixed(1)}</p>
    </div>

    <div className="info-item">
      <p className="info-label">Votes</p>
      <p className="info-value">{movie.vote_count}</p>
    </div>
  </div>
</div>

            <h2 className="cast-title">Cast</h2>
            {castMessage && <p className="error-notification">{castMessage}</p>}
                <div className="cast-list">
      {!castMessage && credits.map((actor,index) => (
        <div className="actor-card" key={`${actor.id}-${index}`}>
          <img
            src={
              actor.profile_path
                ? `${IMAGE_BASE}${actor.profile_path}`
                : "https://via.placeholder.com/200x300?text=No+Image"
            }
            alt={actor.name}
            className="actor-photo"
          />
          <div className="actor-info">
            <h4>{actor.name}</h4>
            <p>{actor.character}</p>
          </div>
        </div>
      ))}
    </div>
    <h1>Trailer</h1>
    {trailerMessage && <p className="error-notification">{trailerMessage}</p>}
{!trailerMessage && (
  <div className="trailer">
        <iframe src={`https://www.youtube.com/embed/${trailer.key}`} frameBorder="0" allowFullScreen>
        </iframe>
        </div>
)}

       <button onClick={handleBack} className="back-button">Go Back</button>
        </div>
        </>
   )
}