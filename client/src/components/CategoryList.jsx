import{useState,useEffect} from 'react';
import './CategoryList.css';
import './spinner.css';
import {fetchCategories} from '../hooks/fetchCategories.js'
 export default function Categories({onSelectCategory}){
    const [categories,setCategories]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    useEffect(()=>{
        setLoading(true);
        setError(null);
        fetchCategories().then((data)=>{
            setCategories(data);
        }).catch((err)=>{
            setError(err.message);
        }).finally(()=>{
            setLoading(false);
        })
    },[])
    if(loading) return <div className="spinner"></div>;
    if(error) return <p>Error: {error}</p>;
    return(
        <div className="categories">
            {categories.map(category=>(
                <button className='category-button' key={category.id} onClick={()=>(onSelectCategory(category.id))}>{category.name}</button>
            ))}

        </div>
    )

 }