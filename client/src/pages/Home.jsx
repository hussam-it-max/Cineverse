import {useState} from 'react';
import Categories from '../components/CategoryList';
import NavBar from '../components/NavBar';
import MovieList from '../components/MovieList';
import HeroSection from '../components/HeroSection';
export default function Home() {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);


    return(
        <div className="home">
            <NavBar />
            <HeroSection />
            <Categories onSelectCategory={setSelectedCategoryId} />
            <MovieList selectedCategory={selectedCategoryId}  />
        </div>
    )
}