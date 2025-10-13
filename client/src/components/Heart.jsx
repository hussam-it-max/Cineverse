import { Heart } from 'lucide-react';
import { useContext } from 'react';
import './heart.css';
import { toast } from 'react-toastify';
import { UserContext } from '../Context/UserContext';
export default function FavoriteButton({ id, movie }) {
  const {user, favorites = [], removeFavorite, addFavorite } = useContext(UserContext);
const isFavorite = Array.isArray(favorites) 
    ? favorites.some(fa => fa && fa.id === id) 
    : false;
  return (
    <button
      className="heart-btn"
      onClick={(e) => {
        e.stopPropagation();
        if (isFavorite) {
          removeFavorite(id);
          toast.info("Removed from favorites ❤️‍🔥");
        } else {
            if(!user){
                toast.warn("You need to login first 😅");
                return;
            }
          addFavorite(movie);
          toast.success("Added to favorites ❤️");
        }
      }}
    >
      <Heart color={isFavorite ? 'red' : 'black'}  />
    </button>
  );
}